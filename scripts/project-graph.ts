/* ╔══════════════════════════════════════════════════════════════════╗
 * ║  PROJECT GRAPH — Structure Scanner + Interactive Visualizer    ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║                                                                ║
 * ║  Scans any local project, extracts file hierarchy and import   ║
 * ║  dependencies, and generates:                                  ║
 * ║                                                                ║
 * ║    1. project_graph.json  — for AI agents / programmatic use   ║
 * ║    2. project_viz.html    — interactive Cytoscape.js map       ║
 * ║                                                                ║
 * ║  Features:                                                     ║
 * ║    • Incremental cache — only re-parses changed files          ║
 * ║    • Regex-based import extraction (JS/TS/Python/Java/Go)      ║
 * ║    • Compound node visualization (folders contain files)       ║
 * ║    • Click-to-open in VS Code / Cursor / editor               ║
 * ║    • Zero external dependencies (Node.js built-ins only)       ║
 * ║                                                                ║
 * ║  Usage:                                                        ║
 * ║    npx tsx project-graph.ts                                    ║
 * ║    npx tsx project-graph.ts --root ./my-project                ║
 * ║    npx tsx project-graph.ts --no-cache --print                 ║
 * ║                                                                ║
 * ╚══════════════════════════════════════════════════════════════════╝ */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import os from "node:os";

// ─────────────────────────────────────────────────────────────────────
//  CONFIGURATION
// ─────────────────────────────────────────────────────────────────────

/** Directories to always skip — build artifacts, deps, caches, VCS */
const EXCLUDE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next", ".nuxt", ".turbo",
  ".cache", ".idea", ".vscode", "__pycache__", ".pytest_cache", "coverage",
  ".angular", ".svelte-kit", ".output", ".parcel-cache", "target",       // Rust/Maven
  ".gradle", ".mvn", "vendor", "venv", ".venv", "env", ".env",
  ".terraform", ".serverless", ".firebase", ".vercel",
  "docs",  // avoid self-including our own output
]);

/** Files to always skip — locks, OS junk, binaries */
const EXCLUDE_FILES = new Set([
  "package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb",
  "uv.lock", "poetry.lock", "Pipfile.lock", "composer.lock",
  "Gemfile.lock", "Cargo.lock", "go.sum",
  ".DS_Store", "Thumbs.db", "desktop.ini",
]);

/** Extensions to always skip — binaries, media, secrets */
const EXCLUDE_EXTENSIONS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".svg", ".bmp",
  ".mp4", ".mp3", ".wav", ".ogg", ".webm", ".avi", ".mov",
  ".zip", ".tar", ".gz", ".7z", ".rar", ".bz2",
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".pptx",
  ".exe", ".dll", ".so", ".dylib", ".bin", ".o", ".obj",
  ".sqlite", ".db", ".sqlite3",
  ".woff", ".woff2", ".ttf", ".otf", ".eot",
  ".map",  // source maps — large and useless for graph
  ".pem", ".key", ".crt", ".cer", ".p12", ".pfx",
]);

/** Extensions we know are source code / config and safe to parse */
const TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".py", ".pyi",
  ".java", ".kt", ".kts",
  ".go",
  ".rs",
  ".c", ".cpp", ".h", ".hpp", ".cc",
  ".cs",
  ".rb",
  ".php",
  ".swift",
  ".vue", ".svelte", ".astro",
  ".json", ".jsonc",
  ".yaml", ".yml", ".toml", ".ini", ".cfg",
  ".html", ".htm", ".css", ".scss", ".less", ".sass",
  ".sql",
  ".sh", ".bash", ".zsh", ".ps1", ".bat", ".cmd",
  ".md", ".mdx", ".txt", ".csv",
  ".xml", ".graphql", ".gql", ".proto",
  ".env", ".env.local", ".env.development", ".env.production",
  ".dockerfile",
]);

/** Max file size to read content from (256 KB) */
const MAX_FILE_BYTES = 256_000;

/** Default output directory name */
const OUTPUT_DIR = "docs";

/** Cache filename */
const CACHE_FILE = ".project-graph.cache.json";

// ─────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────

interface CacheEntry {
  mtimeMs: number;
  size: number;
  imports: string[];       // raw import specifiers as found in the file
  resolved: string[];      // resolved relative paths within the project
}

interface CacheStore {
  version: number;
  rootDir: string;
  entries: Record<string, CacheEntry>;
}

interface GraphNode {
  id: string;             // relative posix path from root
  type: "directory" | "file";
  parent: string | null;  // parent directory id, null for root-level
  label: string;          // display name (just the filename or dirname)
  ext?: string;           // file extension
  size?: number;          // file size in bytes
  fullPath: string;       // absolute path for editor links
}

interface GraphEdge {
  source: string;         // relative path of the importing file
  target: string;         // relative path of the imported file
  type: "import";
}

interface ProjectGraph {
  meta: {
    rootDir: string;
    rootLabel: string;
    generatedAt: string;
    totalFiles: number;
    totalDirs: number;
    totalEdges: number;
    scanDurationMs: number;
  };
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// ─────────────────────────────────────────────────────────────────────
//  UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────

function toPosix(p: string): string {
  return p.split(path.sep).join("/");
}

function statSafe(p: string): fs.Stats | null {
  try { return fs.statSync(p); } catch { return null; }
}

function readSafe(p: string): string | null {
  try { return fs.readFileSync(p, "utf-8"); } catch { return null; }
}

function isHidden(name: string): boolean {
  // Allow dotfiles like .env, .eslintrc but exclude .git, .cache etc (handled by EXCLUDE_DIRS)
  return false;
}

function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function fileLanguage(ext: string): string {
  const map: Record<string, string> = {
    ".ts": "typescript", ".tsx": "tsx", ".js": "javascript", ".jsx": "jsx",
    ".py": "python", ".java": "java", ".kt": "kotlin", ".go": "go",
    ".rs": "rust", ".c": "c", ".cpp": "cpp", ".cs": "csharp",
    ".rb": "ruby", ".php": "php", ".swift": "swift",
    ".vue": "vue", ".svelte": "svelte", ".astro": "astro",
    ".css": "css", ".scss": "scss", ".less": "less",
    ".html": "html", ".json": "json", ".yaml": "yaml", ".yml": "yaml",
    ".toml": "toml", ".md": "markdown", ".sql": "sql",
    ".sh": "bash", ".graphql": "graphql",
  };
  return map[ext] ?? ext.replace(".", "") ?? "txt";
}

// ─────────────────────────────────────────────────────────────────────
//  CACHE LAYER — The "diff detector" that avoids re-scanning everything
// ─────────────────────────────────────────────────────────────────────
//
//  Think of this like a security camera's motion sensor:
//  it only triggers recording when something actually moves.
//  The cache stores each file's mtime+size as a "fingerprint".
//  If neither changed, the file's imports haven't changed either.

function readCache(cacheDir: string): CacheStore | null {
  const cachePath = path.join(cacheDir, CACHE_FILE);
  const raw = readSafe(cachePath);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1) return null;
    return parsed as CacheStore;
  } catch { return null; }
}

function writeCache(cacheDir: string, cache: CacheStore): void {
  ensureDir(cacheDir);
  const cachePath = path.join(cacheDir, CACHE_FILE);
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), "utf-8");
}

function isCacheHit(entry: CacheEntry, stat: fs.Stats): boolean {
  return entry.mtimeMs === stat.mtimeMs && entry.size === stat.size;
}

// ─────────────────────────────────────────────────────────────────────
//  FILE WALKER — Recursive traversal with smart exclusions
// ─────────────────────────────────────────────────────────────────────

interface WalkResult {
  files: string[];     // absolute paths
  dirs: string[];      // absolute paths (only those containing files)
}

function walkProject(rootDir: string): WalkResult {
  const files: string[] = [];
  const dirs = new Set<string>();

  function walk(dirPath: string): void {
    let entries: string[];
    try { entries = fs.readdirSync(dirPath); } catch { return; }
    entries.sort();

    for (const entry of entries) {
      const full = path.join(dirPath, entry);
      const stat = statSafe(full);
      if (!stat) continue;

      if (stat.isDirectory()) {
        if (EXCLUDE_DIRS.has(entry)) continue;
        walk(full);
      } else if (stat.isFile()) {
        const ext = path.extname(entry).toLowerCase();

        // Skip by name
        if (EXCLUDE_FILES.has(entry)) continue;
        // Skip by extension
        if (EXCLUDE_EXTENSIONS.has(ext)) continue;

        files.push(full);
        // Register all ancestor dirs up to root
        let parent = dirPath;
        while (parent.length >= rootDir.length) {
          dirs.add(parent);
          const next = path.dirname(parent);
          if (next === parent) break;
          parent = next;
        }
      }
    }
  }

  walk(rootDir);
  return { files, dirs: [...dirs] };
}

// ─────────────────────────────────────────────────────────────────────
//  IMPORT EXTRACTOR — Regex-based, language-aware
// ─────────────────────────────────────────────────────────────────────
//
//  Regex catches ~90% of real-world imports.
//  The remaining 10% (dynamic imports, conditional requires,
//  aliased barrel exports) would need tree-sitter — overkill for now.

/** Extract raw import specifiers from file content based on its extension */
function extractImports(content: string, ext: string): string[] {
  const imports: string[] = [];
  const seen = new Set<string>();

  function add(specifier: string): void {
    const clean = specifier.trim().replace(/['"`;]/g, "");
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      imports.push(clean);
    }
  }

  if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".vue", ".svelte", ".astro"].includes(ext)) {
    // ES imports:  import X from 'path'  /  import { X } from 'path'  /  import 'path'
    const esImport = /import\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]/g;
    for (const m of content.matchAll(esImport)) add(m[1]);

    // Re-exports:  export { X } from 'path'  /  export * from 'path'
    const reExport = /export\s+(?:[\s\S]*?from\s+)['"]([^'"]+)['"]/g;
    for (const m of content.matchAll(reExport)) add(m[1]);

    // CommonJS:  require('path')
    const cjsRequire = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
    for (const m of content.matchAll(cjsRequire)) add(m[1]);

    // Dynamic import:  import('path')  — bonus, catches lazy-loaded routes
    const dynamicImport = /import\(\s*['"]([^'"]+)['"]\s*\)/g;
    for (const m of content.matchAll(dynamicImport)) add(m[1]);

  } else if ([".py", ".pyi"].includes(ext)) {
    // from package.module import X
    const fromImport = /^from\s+([\w.]+)\s+import/gm;
    for (const m of content.matchAll(fromImport)) add(m[1]);

    // import package.module
    const plainImport = /^import\s+([\w.]+)/gm;
    for (const m of content.matchAll(plainImport)) add(m[1]);

  } else if ([".java", ".kt", ".kts"].includes(ext)) {
    // import com.example.Class;
    const javaImport = /^import\s+(?:static\s+)?([\w.]+);?/gm;
    for (const m of content.matchAll(javaImport)) add(m[1]);

  } else if (ext === ".go") {
    // import "package"  or grouped imports
    const goImport = /(?:import\s+["']([^"']+)["']|["']([^"']+)["'])/g;
    for (const m of content.matchAll(goImport)) add(m[1] || m[2]);

  } else if ([".rs"].includes(ext)) {
    // use crate::module::item;  /  mod module;
    const useStmt = /^use\s+([\w:]+)/gm;
    for (const m of content.matchAll(useStmt)) add(m[1]);
    const modStmt = /^mod\s+(\w+)\s*;/gm;
    for (const m of content.matchAll(modStmt)) add(m[1]);

  } else if ([".css", ".scss", ".less", ".sass"].includes(ext)) {
    // @import 'path';  /  @use 'path';  /  @forward 'path';
    const cssImport = /@(?:import|use|forward)\s+['"]([^'"]+)['"]/g;
    for (const m of content.matchAll(cssImport)) add(m[1]);
  }

  return imports;
}

// ─────────────────────────────────────────────────────────────────────
//  IMPORT RESOLVER — Maps specifiers to actual project files
// ─────────────────────────────────────────────────────────────────────
//
//  The key insight: we only care about INTERNAL dependencies.
//  'react', 'firebase/auth', 'lodash' → skip (external packages)
//  './components/Header' → resolve to 'src/components/Header.tsx'

/** Check if a specifier is a relative/internal path */
function isRelativeImport(specifier: string): boolean {
  return specifier.startsWith("./") || specifier.startsWith("../");
}

/** Check if it's an alias like @/ or ~/  (common in Vite/Next/Nuxt) */
function isAliasImport(specifier: string): boolean {
  return specifier.startsWith("@/") || specifier.startsWith("~/");
}

/** Try to resolve a specifier to an actual file on disk */
function resolveImport(
  specifier: string,
  fromFile: string,
  rootDir: string,
  allFilePaths: Set<string>
): string | null {

  let basePath: string;

  if (isRelativeImport(specifier)) {
    basePath = path.resolve(path.dirname(fromFile), specifier);
  } else if (isAliasImport(specifier)) {
    // Common convention: @/ maps to src/  or root/
    const stripped = specifier.slice(2); // remove @/ or ~/
    const srcDir = path.join(rootDir, "src");
    basePath = fs.existsSync(srcDir)
      ? path.join(srcDir, stripped)
      : path.join(rootDir, stripped);
  } else {
    // External package — skip
    return null;
  }

  // Extension resolution order — try each until we find a match
  const extensions = [
    "",          // exact match (e.g., './data.json')
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".vue", ".svelte", ".astro",
    ".py", ".java", ".go", ".rs",
    ".css", ".scss", ".less",
    "/index.ts", "/index.tsx", "/index.js", "/index.jsx",
    "/index.mjs", "/index.cjs",
    "/mod.rs",   // Rust module convention
    "/__init__.py",  // Python package convention
  ];

  for (const ext of extensions) {
    const candidate = basePath + ext;
    if (allFilePaths.has(candidate)) return candidate;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────
//  GRAPH BUILDER — Assembles nodes + edges into a coherent graph
// ─────────────────────────────────────────────────────────────────────

function buildGraph(
  rootDir: string,
  walkResult: WalkResult,
  cache: CacheStore,
  useCache: boolean
): { graph: ProjectGraph; updatedCache: CacheStore } {

  const startTime = Date.now();
  const allFilePaths = new Set(walkResult.files);
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Build set of directory nodes
  const dirSet = new Set<string>();
  for (const d of walkResult.dirs) {
    const rel = toPosix(path.relative(rootDir, d));
    if (rel === "") continue; // root itself, skip as compound node
    dirSet.add(rel);
  }

  // Add directory nodes (these become compound/parent nodes in Cytoscape)
  for (const rel of [...dirSet].sort()) {
    const parentRel = toPosix(path.relative(rootDir, path.dirname(path.join(rootDir, rel))));
    nodes.push({
      id: rel,
      type: "directory",
      parent: parentRel === "" || parentRel === "." ? null : parentRel,
      label: path.basename(rel),
      fullPath: path.resolve(rootDir, rel),
    });
  }

  // Process each file: check cache, extract imports, resolve paths
  let cacheHits = 0;
  let cacheMisses = 0;

  for (const absPath of walkResult.files) {
    const rel = toPosix(path.relative(rootDir, absPath));
    const ext = path.extname(absPath).toLowerCase();
    const stat = statSafe(absPath);
    if (!stat) continue;

    const parentRel = toPosix(path.relative(rootDir, path.dirname(absPath)));

    // Add file node
    nodes.push({
      id: rel,
      type: "file",
      parent: parentRel === "" || parentRel === "." ? null : parentRel,
      label: path.basename(absPath),
      ext,
      size: stat.size,
      fullPath: path.resolve(absPath),
    });

    // Check cache for this file's imports
    let rawImports: string[];
    const cached = cache.entries[rel];

    if (useCache && cached && isCacheHit(cached, stat)) {
      // Cache hit — file hasn't changed, reuse parsed imports
      rawImports = cached.imports;
      cacheHits++;
    } else {
      // Cache miss — need to read and parse the file
      if (stat.size > MAX_FILE_BYTES || !TEXT_EXTENSIONS.has(ext)) {
        rawImports = [];
      } else {
        const content = readSafe(absPath);
        rawImports = content ? extractImports(content, ext) : [];
      }
      cacheMisses++;
    }

    // Resolve imports to actual project files
    const resolved: string[] = [];
    for (const specifier of rawImports) {
      const target = resolveImport(specifier, absPath, rootDir, allFilePaths);
      if (target) {
        const targetRel = toPosix(path.relative(rootDir, target));
        resolved.push(targetRel);
        edges.push({ source: rel, target: targetRel, type: "import" });
      }
    }

    // Update cache entry
    cache.entries[rel] = {
      mtimeMs: stat.mtimeMs,
      size: stat.size,
      imports: rawImports,
      resolved,
    };
  }

  // Prune cache: remove entries for files that no longer exist
  const currentFiles = new Set(walkResult.files.map(f => toPosix(path.relative(rootDir, f))));
  for (const key of Object.keys(cache.entries)) {
    if (!currentFiles.has(key)) delete cache.entries[key];
  }

  const duration = Date.now() - startTime;
  const fileNodes = nodes.filter(n => n.type === "file");
  const dirNodes = nodes.filter(n => n.type === "directory");

  console.log(`  Files scanned:  ${fileNodes.length}`);
  console.log(`  Directories:    ${dirNodes.length}`);
  console.log(`  Dependencies:   ${edges.length}`);
  console.log(`  Cache hits:     ${cacheHits} | misses: ${cacheMisses}`);
  console.log(`  Duration:       ${duration}ms`);

  return {
    graph: {
      meta: {
        rootDir: toPosix(rootDir),
        rootLabel: path.basename(rootDir),
        generatedAt: new Date().toISOString(),
        totalFiles: fileNodes.length,
        totalDirs: dirNodes.length,
        totalEdges: edges.length,
        scanDurationMs: duration,
      },
      nodes,
      edges,
    },
    updatedCache: cache,
  };
}

// ─────────────────────────────────────────────────────────────────────
//  HTML GENERATOR — Self-contained interactive visualization
// ─────────────────────────────────────────────────────────────────────
//
//  Generates a single HTML file with embedded CSS + JavaScript.
//  Uses Cytoscape.js from CDN for the graph rendering with
//  compound nodes (folders contain files visually).
//
//  The graph data is injected as a JSON literal inside a <script> tag,
//  making the HTML 100% portable — just open it in any browser.

function generateHTML(graph: ProjectGraph): string {
  const graphJSON = JSON.stringify(graph);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${graph.meta.rootLabel} — Project Graph</title>

<!-- Cytoscape.js core + compound-aware layout -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.30.4/cytoscape.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/cytoscape-cose-bilkent@4.1.0/cytoscape-cose-bilkent.min.js"><\/script>

<style>
  /* ── Reset & Base ────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-tertiary: #21262d;
    --border: #30363d;
    --text-primary: #e6edf3;
    --text-secondary: #8b949e;
    --text-muted: #6e7681;
    --accent: #58a6ff;
    --accent-dim: #1f6feb33;
    --green: #3fb950;
    --orange: #d29922;
    --purple: #bc8cff;
    --pink: #f778ba;
    --red: #f85149;
    --cyan: #76e3ea;
    --yellow: #e3b341;
  }

  body {
    font-family: 'SF Mono', 'Cascadia Code', 'JetBrains Mono', 'Fira Code', monospace;
    background: var(--bg-primary);
    color: var(--text-primary);
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── Top Bar ─────────────────────────────────────── */
  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    z-index: 10;
  }

  .topbar h1 {
    font-size: 13px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .topbar .sep { color: var(--text-muted); }

  .topbar .stats {
    font-size: 11px;
    color: var(--text-secondary);
    display: flex;
    gap: 14px;
  }
  .topbar .stats span { white-space: nowrap; }
  .stat-val { color: var(--text-primary); font-weight: 600; }

  .search-box {
    margin-left: auto;
    background: var(--bg-tertiary);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 10px;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 12px;
    width: 220px;
    outline: none;
    transition: border-color 0.2s;
  }
  .search-box:focus { border-color: var(--accent); }
  .search-box::placeholder { color: var(--text-muted); }

  /* ── Main Layout ─────────────────────────────────── */
  .main {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  #cy {
    flex: 1;
    background: var(--bg-primary);
  }

  /* ── Side Panel (shows on node click) ────────────── */
  .panel {
    width: 0;
    overflow: hidden;
    background: var(--bg-secondary);
    border-left: 1px solid var(--border);
    transition: width 0.25s ease;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }
  .panel.open { width: 320px; }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
  }
  .panel-header h2 {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .panel-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 16px;
    padding: 2px 6px;
    border-radius: 4px;
  }
  .panel-close:hover { background: var(--bg-tertiary); color: var(--text-primary); }

  .panel-body {
    padding: 14px;
    overflow-y: auto;
    flex: 1;
    font-size: 12px;
    line-height: 1.6;
  }

  .panel-body .file-icon { font-size: 28px; margin-bottom: 8px; }
  .panel-body .file-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-primary);
    word-break: break-all;
    margin-bottom: 4px;
  }
  .panel-body .file-path {
    font-size: 11px;
    color: var(--text-muted);
    word-break: break-all;
    margin-bottom: 14px;
  }

  .panel-section {
    margin-bottom: 16px;
  }
  .panel-section h3 {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .dep-list {
    list-style: none;
  }
  .dep-list li {
    padding: 3px 0;
    color: var(--accent);
    cursor: pointer;
    font-size: 11px;
    word-break: break-all;
  }
  .dep-list li:hover { text-decoration: underline; }

  .btn-open {
    display: block;
    width: 100%;
    padding: 8px 12px;
    margin-top: 10px;
    background: var(--accent-dim);
    border: 1px solid var(--accent);
    border-radius: 6px;
    color: var(--accent);
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s;
  }
  .btn-open:hover { background: #1f6feb55; }

  /* ── Legend (bottom-left overlay) ─────────────────── */
  .legend {
    position: absolute;
    bottom: 14px;
    left: 14px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 10px;
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 14px;
    max-width: 500px;
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }
  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── Controls overlay (bottom-right) ─────────────── */
  .controls {
    position: absolute;
    bottom: 14px;
    right: 14px;
    display: flex;
    gap: 6px;
    z-index: 5;
  }
  .ctrl-btn {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-secondary);
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .ctrl-btn:hover { background: var(--bg-tertiary); color: var(--text-primary); }
</style>
</head>

<body>
  <!-- ── Top Bar ──────────────────────────────────── -->
  <div class="topbar">
    <h1>⬡ PROJECT GRAPH</h1>
    <span class="sep">│</span>
    <div class="stats">
      <span><span class="stat-val" id="stat-files">0</span> files</span>
      <span><span class="stat-val" id="stat-dirs">0</span> dirs</span>
      <span><span class="stat-val" id="stat-edges">0</span> deps</span>
    </div>
    <input type="text" class="search-box" id="search" placeholder="Search files…  (Ctrl+K)" />
  </div>

  <!-- ── Main Area ────────────────────────────────── -->
  <div class="main">
    <div id="cy"></div>

    <!-- Side Panel -->
    <div class="panel" id="panel">
      <div class="panel-header">
        <h2>Inspector</h2>
        <button class="panel-close" id="panel-close" title="Close">✕</button>
      </div>
      <div class="panel-body" id="panel-body"></div>
    </div>
  </div>

  <!-- ── Legend ────────────────────────────────────── -->
  <div class="legend" id="legend"></div>

  <!-- ── Controls ─────────────────────────────────── -->
  <div class="controls">
    <button class="ctrl-btn" id="btn-fit" title="Fit to screen">⊞</button>
    <button class="ctrl-btn" id="btn-zoom-in" title="Zoom in">+</button>
    <button class="ctrl-btn" id="btn-zoom-out" title="Zoom out">−</button>
  </div>

<script>
// ═══════════════════════════════════════════════════════════════════
//  Embedded Graph Data (injected by the scanner at build time)
// ═══════════════════════════════════════════════════════════════════
const GRAPH = ${graphJSON};

// Guard: if Cytoscape.js failed to load (CDN blocked, offline, sandbox), show a helpful message
if (typeof cytoscape === 'undefined') {
  document.getElementById('cy').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:12px;color:#8b949e;font-size:13px;padding:40px;text-align:center">'
    + '<div style="font-size:36px">⬡</div>'
    + '<div><strong style="color:#e6edf3">Cytoscape.js could not load</strong></div>'
    + '<div>This HTML needs internet access to load the graph library from CDN.<br>Open this file directly in your browser (Chrome, Firefox, Edge) instead of in a sandboxed viewer.</div>'
    + '<div style="margin-top:8px;color:#58a6ff;font-size:11px">The JSON data is embedded — you can also use project_graph.json with any graph viewer.</div>'
    + '</div>';
  throw new Error('Cytoscape.js not available — open this HTML in a browser with internet access');
}

// ═══════════════════════════════════════════════════════════════════
//  Color Palette — maps file extensions to node colors
// ═══════════════════════════════════════════════════════════════════
const EXT_COLORS = {
  '.ts':     '#3178c6', '.tsx':    '#3178c6',
  '.js':     '#f0db4f', '.jsx':    '#f0db4f', '.mjs': '#f0db4f', '.cjs': '#f0db4f',
  '.py':     '#3776ab', '.pyi':    '#3776ab',
  '.java':   '#f89820', '.kt':     '#7f52ff',
  '.go':     '#00add8',
  '.rs':     '#dea584',
  '.vue':    '#42b883', '.svelte': '#ff3e00', '.astro': '#ff5d01',
  '.css':    '#bc8cff', '.scss':   '#cc6699', '.less': '#1d365d',
  '.html':   '#e44d26', '.htm':    '#e44d26',
  '.json':   '#3fb950', '.yaml':   '#cb171e', '.yml': '#cb171e', '.toml': '#9c4221',
  '.md':     '#8b949e', '.mdx':    '#8b949e',
  '.sql':    '#e38c00',
  '.sh':     '#4eaa25', '.bash':   '#4eaa25',
  '.graphql':'#e535ab',
  '.env':    '#ecd53f',
};
const DIR_COLOR = '#30363d';
const DEFAULT_FILE_COLOR = '#6e7681';

function getNodeColor(node) {
  if (node.type === 'directory') return DIR_COLOR;
  return EXT_COLORS[node.ext] || DEFAULT_FILE_COLOR;
}

// ═══════════════════════════════════════════════════════════════════
//  Build Cytoscape Elements
// ═══════════════════════════════════════════════════════════════════
const elements = [];

// Nodes
for (const n of GRAPH.nodes) {
  elements.push({
    group: 'nodes',
    data: {
      id: n.id,
      label: n.label,
      parent: n.parent || undefined,
      nodeType: n.type,
      ext: n.ext || '',
      size: n.size || 0,
      fullPath: n.fullPath,
      color: getNodeColor(n),
    },
  });
}

// Edges
for (let i = 0; i < GRAPH.edges.length; i++) {
  const e = GRAPH.edges[i];
  elements.push({
    group: 'edges',
    data: {
      id: 'e' + i,
      source: e.source,
      target: e.target,
    },
  });
}

// ═══════════════════════════════════════════════════════════════════
//  Initialize Cytoscape
// ═══════════════════════════════════════════════════════════════════

// Register the layout plugin (may fail if CDN blocked — falls back to built-in 'cose')
let HAS_BILKENT = false;
try {
  if (typeof cytoscapeCoseBilkent === 'function') {
    cytoscape.use(cytoscapeCoseBilkent);
    HAS_BILKENT = true;
  }
} catch(e) { console.warn('cose-bilkent plugin not available, using built-in cose layout'); }

const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: elements,
  minZoom: 0.05,
  maxZoom: 4,

  style: [
    // ── Directory (compound) nodes ──
    {
      selector: 'node[nodeType="directory"]',
      style: {
        'shape': 'roundrectangle',
        'background-color': 'data(color)',
        'background-opacity': 0.25,
        'border-width': 1.5,
        'border-color': '#484f58',
        'border-style': 'dashed',
        'label': 'data(label)',
        'font-size': '10px',
        'font-weight': '600',
        'color': '#8b949e',
        'text-valign': 'top',
        'text-halign': 'center',
        'text-margin-y': 8,
        'padding': '24px',
        'text-background-color': '#161b22',
        'text-background-opacity': 0.85,
        'text-background-padding': '3px',
        'text-background-shape': 'roundrectangle',
      }
    },

    // ── File nodes ──
    {
      selector: 'node[nodeType="file"]',
      style: {
        'shape': 'ellipse',
        'background-color': 'data(color)',
        'width': 28,
        'height': 28,
        'label': 'data(label)',
        'font-size': '8px',
        'font-weight': '500',
        'color': '#c9d1d9',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 5,
        'border-width': 1,
        'border-color': '#0d1117',
        'text-max-width': '100px',
        'text-wrap': 'ellipsis',
      }
    },

    // ── Edges ──
    {
      selector: 'edge',
      style: {
        'width': 1.2,
        'line-color': '#30363d',
        'target-arrow-color': '#484f58',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 0.7,
        'curve-style': 'bezier',
        'opacity': 0.5,
      }
    },

    // ── Highlighted states ──
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 2.5,
        'border-color': '#58a6ff',
        'z-index': 100,
      }
    },
    {
      selector: 'node[nodeType="file"].highlighted',
      style: {
        'width': 36,
        'height': 36,
      }
    },
    {
      selector: 'edge.highlighted',
      style: {
        'width': 2.5,
        'line-color': '#58a6ff',
        'target-arrow-color': '#58a6ff',
        'opacity': 1,
        'z-index': 99,
      }
    },
    {
      selector: 'node.faded',
      style: { 'opacity': 0.15 }
    },
    {
      selector: 'edge.faded',
      style: { 'opacity': 0.06 }
    },
    {
      selector: 'node.search-match',
      style: {
        'border-width': 2.5,
        'border-color': '#f0db4f',
        'z-index': 100,
      }
    },
  ],

  // Layout: cose-bilkent is ideal for compound (nested) graphs.
  // Falls back to cose if plugin didn't load.
  layout: {
    name: HAS_BILKENT ? 'cose-bilkent' : 'cose',
    animate: false,
    quality: 'proof',              // best quality, slightly slower
    nodeDimensionsIncludeLabels: true,
    idealEdgeLength: 120,
    nodeRepulsion: 8000,
    nestingFactor: 0.15,           // tighter nesting within compound nodes
    gravity: 0.2,
    gravityRange: 3.8,
    numIter: 2500,
    tile: true,
    tilingPaddingVertical: 20,
    tilingPaddingHorizontal: 20,
  },
});

// ═══════════════════════════════════════════════════════════════════
//  Stats
// ═══════════════════════════════════════════════════════════════════
document.getElementById('stat-files').textContent = GRAPH.meta.totalFiles;
document.getElementById('stat-dirs').textContent = GRAPH.meta.totalDirs;
document.getElementById('stat-edges').textContent = GRAPH.meta.totalEdges;

// ═══════════════════════════════════════════════════════════════════
//  Legend — auto-built from the extensions actually present
// ═══════════════════════════════════════════════════════════════════
(function buildLegend() {
  const legendEl = document.getElementById('legend');
  const extsSeen = new Set();
  GRAPH.nodes.forEach(n => { if (n.ext) extsSeen.add(n.ext); });

  // Add directory entry
  legendEl.innerHTML = '<div class="legend-item"><div class="legend-dot" style="background:' + DIR_COLOR + ';border:1px dashed #484f58"></div><span>directory</span></div>';

  const sorted = [...extsSeen].sort();
  for (const ext of sorted) {
    const c = EXT_COLORS[ext] || DEFAULT_FILE_COLOR;
    legendEl.innerHTML += '<div class="legend-item"><div class="legend-dot" style="background:' + c + '"></div><span>' + ext + '</span></div>';
  }
})();

// ═══════════════════════════════════════════════════════════════════
//  Node Click → Highlight Neighbors + Show Panel
// ═══════════════════════════════════════════════════════════════════
const panel = document.getElementById('panel');
const panelBody = document.getElementById('panel-body');

cy.on('tap', 'node[nodeType="file"]', function(evt) {
  const node = evt.target;
  const data = node.data();

  // Clear previous highlights
  cy.elements().removeClass('highlighted faded');

  // Highlight this node + its neighbors + connecting edges
  const neighborhood = node.neighborhood().add(node);
  cy.elements().not(neighborhood).addClass('faded');
  neighborhood.addClass('highlighted');

  // Build panel content
  const sizeKB = data.size ? (data.size / 1024).toFixed(1) + ' KB' : '—';

  // Find imports from and imports to
  const importsFrom = GRAPH.edges.filter(e => e.source === data.id).map(e => e.target);
  const importedBy  = GRAPH.edges.filter(e => e.target === data.id).map(e => e.source);

  let html = '';
  html += '<div class="file-icon">' + getFileEmoji(data.ext) + '</div>';
  html += '<div class="file-name">' + escapeHtml(data.label) + '</div>';
  html += '<div class="file-path">' + escapeHtml(data.id) + '</div>';

  html += '<div class="panel-section"><h3>Size</h3>' + sizeKB + '</div>';

  if (importsFrom.length > 0) {
    html += '<div class="panel-section"><h3>Imports (' + importsFrom.length + ')</h3><ul class="dep-list">';
    for (const dep of importsFrom) {
      html += '<li data-target="' + escapeHtml(dep) + '">→ ' + escapeHtml(dep) + '</li>';
    }
    html += '</ul></div>';
  }

  if (importedBy.length > 0) {
    html += '<div class="panel-section"><h3>Imported by (' + importedBy.length + ')</h3><ul class="dep-list">';
    for (const dep of importedBy) {
      html += '<li data-target="' + escapeHtml(dep) + '">← ' + escapeHtml(dep) + '</li>';
    }
    html += '</ul></div>';
  }

  // VS Code / Cursor "Open in Editor" button — uses data attribute to avoid escaping hell
  html += '<button class="btn-open" data-filepath="' + escapeHtml(data.fullPath) + '">Open in Editor</button>';

  panelBody.innerHTML = html;
  panel.classList.add('open');

  // Bind the editor button safely via addEventListener
  const openBtn = panelBody.querySelector('.btn-open');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openInEditor(openBtn.getAttribute('data-filepath'));
    });
  }

  // Clicking a dependency in the list navigates to that node
  panelBody.querySelectorAll('.dep-list li').forEach(li => {
    li.addEventListener('click', () => {
      const targetId = li.getAttribute('data-target');
      const targetNode = cy.getElementById(targetId);
      if (targetNode.length) {
        cy.animate({ center: { eles: targetNode }, zoom: 1.5 }, { duration: 400 });
        targetNode.emit('tap');
      }
    });
  });
});

// Click on background → clear highlights + close panel
cy.on('tap', function(evt) {
  if (evt.target === cy) {
    cy.elements().removeClass('highlighted faded search-match');
    panel.classList.remove('open');
  }
});

// Close panel button
document.getElementById('panel-close').addEventListener('click', () => {
  panel.classList.remove('open');
  cy.elements().removeClass('highlighted faded');
});

// ═══════════════════════════════════════════════════════════════════
//  Search — filters nodes by name as you type
// ═══════════════════════════════════════════════════════════════════
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  cy.elements().removeClass('search-match faded highlighted');
  panel.classList.remove('open');

  if (!q) return;

  const matched = cy.nodes().filter(n => n.data('label').toLowerCase().includes(q) || n.data('id').toLowerCase().includes(q));
  if (matched.length > 0) {
    cy.elements().not(matched).addClass('faded');
    matched.addClass('search-match');
  }
});

// Ctrl+K / Cmd+K → focus search
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.blur();
  }
});

// ═══════════════════════════════════════════════════════════════════
//  Controls
// ═══════════════════════════════════════════════════════════════════
document.getElementById('btn-fit').addEventListener('click', () => {
  cy.animate({ fit: { padding: 40 } }, { duration: 400 });
});
document.getElementById('btn-zoom-in').addEventListener('click', () => {
  cy.animate({ zoom: cy.zoom() * 1.4, center: { eles: cy.elements() } }, { duration: 200 });
});
document.getElementById('btn-zoom-out').addEventListener('click', () => {
  cy.animate({ zoom: cy.zoom() * 0.7, center: { eles: cy.elements() } }, { duration: 200 });
});

// ═══════════════════════════════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════════════════════════════

function openInEditor(filePath) {
  // Try VS Code first, then Cursor, then fallback to clipboard
  const editors = [
    { scheme: 'vscode://file/' + filePath, name: 'VS Code' },
    { scheme: 'cursor://file/' + filePath, name: 'Cursor' },
  ];

  // Attempt to open — browser will show "Open app?" dialog
  window.open(editors[0].scheme, '_blank');
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getFileEmoji(ext) {
  const map = {
    '.ts': '🔷', '.tsx': '⚛️', '.js': '🟡', '.jsx': '⚛️',
    '.py': '🐍', '.java': '☕', '.go': '🐹', '.rs': '🦀',
    '.vue': '💚', '.svelte': '🧡', '.astro': '🚀',
    '.css': '🎨', '.scss': '🎨', '.html': '🌐',
    '.json': '📋', '.yaml': '⚙️', '.yml': '⚙️', '.toml': '⚙️',
    '.md': '📝', '.sql': '🗃️', '.sh': '🐚',
    '.env': '🔐', '.graphql': '◈',
  };
  return map[ext] || '📄';
}

// ═══════════════════════════════════════════════════════════════════
//  Auto-fit on load
// ═══════════════════════════════════════════════════════════════════
cy.ready(() => {
  cy.fit(40);
});
<\/script>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────
//  CLI ENTRY POINT
// ─────────────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      out[arg] = next;
      i++;
    } else {
      out[arg] = true;
    }
  }
  return out;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));

  const rootDir = path.resolve(
    typeof args["--root"] === "string" ? args["--root"] : process.cwd()
  );
  const outputDirName = typeof args["--output"] === "string" ? args["--output"] : OUTPUT_DIR;
  const outputDir = path.join(rootDir, outputDirName);
  const useCache = args["--no-cache"] !== true;
  const shouldPrint = args["--print"] === true;

  console.log("");
  console.log("╔══════════════════════════════════════════════╗");
  console.log("║         ⬡  PROJECT GRAPH SCANNER            ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log("");
  console.log(`  Root:    ${rootDir}`);
  console.log(`  Output:  ${outputDir}`);
  console.log(`  Cache:   ${useCache ? "enabled" : "disabled"}`);
  console.log("");

  // Validate root exists
  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    console.error(`ERROR: Root directory not found: ${rootDir}`);
    process.exit(1);
  }

  // Load or initialize cache
  let cache: CacheStore = useCache
    ? readCache(outputDir) ?? { version: 1, rootDir: toPosix(rootDir), entries: {} }
    : { version: 1, rootDir: toPosix(rootDir), entries: {} };

  // If root changed, invalidate cache
  if (cache.rootDir !== toPosix(rootDir)) {
    console.log("  Cache invalidated (root changed)");
    cache = { version: 1, rootDir: toPosix(rootDir), entries: {} };
  }

  // Walk the project tree
  console.log("  Scanning project structure...");
  const walkResult = walkProject(rootDir);

  // Build the dependency graph
  console.log("  Building dependency graph...");
  const { graph, updatedCache } = buildGraph(rootDir, walkResult, cache, useCache);

  // Ensure output directory exists
  ensureDir(outputDir);

  // Write the JSON graph
  const jsonPath = path.join(outputDir, "project_graph.json");
  fs.writeFileSync(jsonPath, JSON.stringify(graph, null, 2), "utf-8");
  console.log(`\n  ✓ JSON:  ${jsonPath}`);

  // Write the HTML visualization
  const htmlPath = path.join(outputDir, "project_viz.html");
  const html = generateHTML(graph);
  fs.writeFileSync(htmlPath, html, "utf-8");
  console.log(`  ✓ HTML:  ${htmlPath}`);

  // Write cache
  if (useCache) {
    writeCache(outputDir, updatedCache);
    console.log(`  ✓ Cache: ${path.join(outputDir, CACHE_FILE)}`);
  }

  // Summary
  console.log("");
  console.log("  ══════════════════════════════════════════════");
  console.log(`  Open the visualization:`);
  console.log(`  ${os.platform() === "win32" ? "start" : os.platform() === "darwin" ? "open" : "xdg-open"} ${htmlPath}`);
  console.log("  ══════════════════════════════════════════════");
  console.log("");

  // Optional: print the tree to stdout
  if (shouldPrint) {
    console.log(JSON.stringify(graph, null, 2));
  }
}

main();
