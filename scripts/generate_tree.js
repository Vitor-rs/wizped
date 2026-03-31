const fs = require('fs');
const path = require('path');

const excludeDirs = ["node_modules", ".git", "build", "gist", "__pycache__", "dist", ".DS_Store", "Thumbs.db", "resource_docs"];

function generateTree(dirPath, prefix = "") {
    let treeStr = "";
    let entries;
    try {
        entries = fs.readdirSync(dirPath);
    } catch (err) {
        return "";
    }

    entries = entries.filter(e => !excludeDirs.includes(e)).sort();

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const fullPath = path.join(dirPath, entry);
        const isLast = i === entries.length - 1;
        const connector = isLast ? "└── " : "├── ";
        
        let displayName = entry;
        const isDir = fs.statSync(fullPath).isDirectory();
        if (isDir) {
            displayName += "/";
        }
        
        treeStr += `${prefix}${connector}${displayName}\n`;
        
        if (isDir) {
            const extension = isLast ? "    " : "│   ";
            treeStr += generateTree(fullPath, prefix + extension);
        }
    }
    return treeStr;
}

function generatePathsList(startPath) {
    let pathsList = [];
    
    function walk(dir) {
        let entries = fs.readdirSync(dir);
        entries = entries.filter(e => !excludeDirs.includes(e)).sort();
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            const isDir = fs.statSync(fullPath).isDirectory();
            
            if (isDir) {
                pathsList.push(fullPath + path.sep);
                walk(fullPath);
            } else {
                pathsList.push(fullPath);
            }
        }
    }
    
    walk(startPath);
    return "# Project Paths\n\n```txt\n" + pathsList.join('\n') + "\n```\n";
}

function generateFileContents(startPath) {
    let contentStr = "# File Contents\n\n";
    
    function walk(dir) {
        let entries = fs.readdirSync(dir);
        entries = entries.filter(e => !excludeDirs.includes(e)).sort();
        
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            const isDir = fs.statSync(fullPath).isDirectory();
            
            if (isDir) {
                walk(fullPath);
            } else {
                if (["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb"].includes(entry)) {
                    continue;
                }
                
                contentStr += `## File: ${fullPath}\n\n`;
                try {
                    const content = fs.readFileSync(fullPath, 'utf-8');
                    const ext = path.extname(entry).replace('.', '') || 'txt';
                    contentStr += `\`\`\`${ext}\n${content}\n\`\`\`\n\n`;
                } catch (err) {
                    contentStr += "> [Binary or Non-UTF-8 file content not shown]\n\n";
                }
            }
        }
    }
    
    walk(startPath);
    return contentStr;
}

const rootDir = process.cwd();
const docsDir = path.join(rootDir, "docs");

if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
}

const tree = "# Project Structure\n\n```txt\n.\n" + generateTree(rootDir) + "```\n";
const paths = generatePathsList(rootDir);
const contents = generateFileContents(rootDir);

const combined = tree + "\n" + paths + "\n" + contents;

fs.writeFileSync(path.join(docsDir, "project_combined.md"), combined);

console.log("\n========================================\nCOMBINED OUTPUT PREVIEW\n========================================\n" + combined.substring(0, 1500) + "\n...[truncated]...");
