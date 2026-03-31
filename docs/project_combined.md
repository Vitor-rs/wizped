# Project Structure

```txt
.
├── .firebaserc
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── .turbo/
│   └── cache/
├── README.md
├── apps/
│   └── web/
│       ├── components.json
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── src/
│       │   ├── App.tsx
│       │   ├── components/
│       │   │   ├── .gitkeep
│       │   │   └── theme-provider.tsx
│       │   └── main.tsx
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── docs/
├── package-lock.json
├── package.json
├── packages/
│   └── ui/
│       ├── components.json
│       ├── eslint.config.js
│       ├── package.json
│       ├── src/
│       │   ├── components/
│       │   │   ├── .gitkeep
│       │   │   └── button.tsx
│       │   ├── hooks/
│       │   │   └── .gitkeep
│       │   ├── lib/
│       │   │   ├── .gitkeep
│       │   │   └── utils.ts
│       │   └── styles/
│       │       └── globals.css
│       ├── tsconfig.json
│       └── tsconfig.lint.json
├── scripts/
│   ├── generate_tree.js
│   └── generate_tree.py
├── tsconfig.json
└── turbo.json
```

# Project Paths

```txt
C:\Users\Vitor\Documents\Wizped\wizped\.firebaserc
C:\Users\Vitor\Documents\Wizped\wizped\.gitignore
C:\Users\Vitor\Documents\Wizped\wizped\.npmrc
C:\Users\Vitor\Documents\Wizped\wizped\.prettierignore
C:\Users\Vitor\Documents\Wizped\wizped\.prettierrc
C:\Users\Vitor\Documents\Wizped\wizped\.turbo\
C:\Users\Vitor\Documents\Wizped\wizped\.turbo\cache\
C:\Users\Vitor\Documents\Wizped\wizped\README.md
C:\Users\Vitor\Documents\Wizped\wizped\apps\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\components.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\eslint.config.js
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\index.html
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\package.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\App.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\.gitkeep
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\theme-provider.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\main.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.app.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.node.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\vite.config.ts
C:\Users\Vitor\Documents\Wizped\wizped\docs\
C:\Users\Vitor\Documents\Wizped\wizped\package-lock.json
C:\Users\Vitor\Documents\Wizped\wizped\package.json
C:\Users\Vitor\Documents\Wizped\wizped\packages\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\components.json
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\eslint.config.js
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\package.json
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\.gitkeep
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\button.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\hooks\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\hooks\.gitkeep
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\lib\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\lib\.gitkeep
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\lib\utils.ts
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\styles\
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\styles\globals.css
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\tsconfig.json
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\tsconfig.lint.json
C:\Users\Vitor\Documents\Wizped\wizped\scripts\
C:\Users\Vitor\Documents\Wizped\wizped\scripts\generate_tree.js
C:\Users\Vitor\Documents\Wizped\wizped\scripts\generate_tree.py
C:\Users\Vitor\Documents\Wizped\wizped\tsconfig.json
C:\Users\Vitor\Documents\Wizped\wizped\turbo.json
```

# File Contents

## File: C:\Users\Vitor\Documents\Wizped\wizped\.firebaserc

```txt
{
  "projects": {
    "default": "wizped275"
  },
  "targets": {},
  "etags": {}
}
```

## File: C:\Users\Vitor\Documents\Wizped\wizped\.gitignore

```txt
# Dependencies
node_modules
.pnp
.pnp.js

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Testing
coverage

# Turbo
.turbo

# Vercel
.vercel

# Build Outputs
dist

# Debug
npm-debug.log*

# Misc
.DS_Store
*.pem

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\.npmrc

```txt

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\.prettierignore

```txt
dist/
node_modules/
.turbo/
coverage/
pnpm-lock.yaml
.pnpm-store/
```

## File: C:\Users\Vitor\Documents\Wizped\wizped\.prettierrc

```txt
{
  "endOfLine": "lf",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "packages/ui/src/styles/globals.css",
  "tailwindFunctions": ["cn", "cva"]
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\README.md

```md
# shadcn/ui monorepo template

This is a Vite monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-mira",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "hugeicons",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@workspace/ui/lib/utils",
    "ui": "@workspace/ui/components"
  },
  "rtl": false,
  "menuColor": "default",
  "menuAccent": "subtle"
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vite-monorepo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\package.json

```json
{
  "name": "web",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint",
    "format": "prettier --write \"**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hugeicons/core-free-icons": "^4.1.1",
    "@hugeicons/react": "^1.1.6",
    "@workspace/ui": "*",
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.2",
    "@tailwindcss/vite": "^4.1.18",
    "@types/node": "^25.1.0",
    "@types/react": "^19.2.10",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.2",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^17.2.0",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.54.0",
    "vite": "^7.2.4"
  }
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\App.tsx

```tsx
import { Button } from "@workspace/ui/components/button"

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="text-muted-foreground font-mono text-xs">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\.gitkeep

```txt

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\theme-provider.tsx

```tsx
/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"
const THEME_VALUES: Theme[] = ["dark", "light", "system"]

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }

  return THEME_VALUES.includes(value as Theme)
}

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (isTheme(storedTheme)) {
      return storedTheme
    }

    return defaultTheme
  })

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
    [storageKey]
  )

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement
      const resolvedTheme =
        nextTheme === "system" ? getSystemTheme() : nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove("light", "dark")
      root.classList.add(resolvedTheme)

      if (restoreTransitions) {
        restoreTransitions()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    applyTheme(theme)

    if (theme !== "system") {
      return undefined
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, applyTheme])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      setThemeState((currentTheme) => {
        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : currentTheme === "light"
              ? "dark"
              : getSystemTheme() === "dark"
                ? "light"
                : "dark"

        localStorage.setItem(storageKey, nextTheme)
        return nextTheme
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [storageKey])

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return
      }

      if (event.key !== storageKey) {
        return
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue)
        return
      }

      setThemeState(defaultTheme)
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [defaultTheme, storageKey])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\main.tsx

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["src"]
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@workspace/ui/*": ["../../packages/ui/src/*"]
    }
  }
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\vite.config.ts

```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\package.json

```json
{
  "name": "wizped",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "turbo format",
    "typecheck": "turbo typecheck"
  },
  "devDependencies": {
    "prettier": "^3.8.1",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "turbo": "^2.8.17",
    "typescript": "5.9.3"
  },
  "packageManager": "npm@11.12.1",
  "engines": {
    "node": ">=20"
  },
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-mira",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "hugeicons",
  "aliases": {
    "components": "@workspace/ui/components",
    "utils": "@workspace/ui/lib/utils",
    "hooks": "@workspace/ui/hooks",
    "lib": "@workspace/ui/lib",
    "ui": "@workspace/ui/components"
  },
  "rtl": false,
  "menuColor": "default",
  "menuAccent": "subtle"
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\package.json

```json
{
  "name": "@workspace/ui",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "lint": "eslint",
    "format": "prettier --write \"**/*.{ts,tsx}\"",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@fontsource-variable/inter": "^5.2.8",
    "@hugeicons/core-free-icons": "^4.1.1",
    "@hugeicons/react": "^1.1.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "radix-ui": "^1.4.3",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "shadcn": "^4.1.1",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.2",
    "@tailwindcss/vite": "^4.1.18",
    "@turbo/gen": "^2.8.1",
    "@types/node": "^25.1.0",
    "@types/react": "^19.2.10",
    "@types/react-dom": "^19.2.3",
    "eslint": "^9.39.2",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^17.2.0",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.54.0"
  },
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./lib/*": "./src/lib/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts"
  }
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\.gitkeep

```txt

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\button.tsx

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-input/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-7 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        xs: "h-5 gap-1 rounded-sm px-2 text-[0.625rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-6 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        lg: "h-8 gap-1 px-2.5 text-xs/relaxed has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-xs": "size-5 rounded-sm [&_svg:not([class*='size-'])]:size-2.5",
        "icon-sm": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-lg": "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\hooks\.gitkeep

```txt

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\lib\.gitkeep

```txt

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\lib\utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\styles\globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/inter";

@custom-variant dark (&:is(.dark *));
@source "../../../apps/**/*.{ts,tsx}";
@source "../../../components/**/*.{ts,tsx}";
@source "../**/*.{ts,tsx}";

@theme inline {
    --font-heading: var(--font-sans);
    --color-sidebar-ring: var(--sidebar-ring);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar: var(--sidebar);
    --color-chart-5: var(--chart-5);
    --color-chart-4: var(--chart-4);
    --color-chart-3: var(--chart-3);
    --color-chart-2: var(--chart-2);
    --color-chart-1: var(--chart-1);
    --color-ring: var(--ring);
    --color-input: var(--input);
    --color-border: var(--border);
    --color-destructive: var(--destructive);
    --color-accent-foreground: var(--accent-foreground);
    --color-accent: var(--accent);
    --color-muted-foreground: var(--muted-foreground);
    --color-muted: var(--muted);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-secondary: var(--secondary);
    --color-primary-foreground: var(--primary-foreground);
    --color-primary: var(--primary);
    --color-popover-foreground: var(--popover-foreground);
    --color-popover: var(--popover);
    --color-card-foreground: var(--card-foreground);
    --color-card: var(--card);
    --color-foreground: var(--foreground);
    --color-background: var(--background);
    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
    --radius-2xl: calc(var(--radius) * 1.8);
    --radius-3xl: calc(var(--radius) * 2.2);
    --radius-4xl: calc(var(--radius) * 2.6);
    --font-sans: 'Inter Variable', sans-serif;
}

:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --radius: 0.625rem;
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
}

.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
    }
  body {
    @apply bg-background text-foreground;
    }
}
```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@workspace/ui/*": ["./src/*"]
    }
  },
  "include": ["."],
  "exclude": ["node_modules", "dist"]
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\tsconfig.lint.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "strict": true,
    "outDir": "dist"
  },
  "include": ["src", "turbo"],
  "exclude": ["node_modules", "dist"]
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\scripts\generate_tree.js

```js
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

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\scripts\generate_tree.py

```py
import os
import argparse

def generate_tree(dir_path, prefix="", exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = []

    tree_str = ""
    
    try:
        entries = os.listdir(dir_path)
    except PermissionError:
        return ""

    entries = sorted([e for e in entries if e not in exclude_dirs])
    
    for i, entry in enumerate(entries):
        path = os.path.join(dir_path, entry)
        is_last = i == len(entries) - 1
        
        connector = "└── " if is_last else "├── "
        
        display_name = entry
        if os.path.isdir(path):
            display_name += "/"
        tree_str += f"{prefix}{connector}{display_name}\n"
        
        if os.path.isdir(path):
            extension = "    " if is_last else "│   "
            tree_str += generate_tree(path, prefix + extension, exclude_dirs)
            
    return tree_str

def generate_paths_list(startpath, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = []
    
    paths_list = []
    
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        dirs.sort()
        
        if root != startpath:
            paths_list.append(os.path.abspath(root) + os.sep)

        for f in files:
            paths_list.append(os.path.abspath(os.path.join(root, f)))
            
    paths_list.sort()
    return "# Project Paths\n\n```txt\n" + "\n".join(paths_list) + "\n```\n"

def generate_file_contents(startpath, exclude_dirs=None):
    if exclude_dirs is None:
        exclude_dirs = []
    
    content_str = "# File Contents\n\n"
    
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        dirs.sort()
        files.sort()

        for f in files:
            if f in ["package-lock.json", "yarn.lock", "pnpm-lock.yaml", "bun.lockb"]:
                continue

            file_path = os.path.join(root, f)
            abs_path = os.path.abspath(file_path)
            
            content_str += f"## File: {abs_path}\n\n"
            
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    file_content = file.read()
                
                _, ext = os.path.splitext(f)
                lang = ext.lstrip(".") if ext else "txt"
                if not lang: lang = "txt"
                
                content_str += f"```{lang}\n{file_content}\n```\n\n"
            except (UnicodeDecodeError, PermissionError):
                content_str += "> [Binary or Non-UTF-8 file content not shown]\n\n"
            except Exception as e:
                content_str += f"> [Error reading file: {str(e)}]\n\n"
                
    return content_str

def main():
    parser = argparse.ArgumentParser(description="Generate project structure.")
    parser.add_argument("-p", action="store_true", help="Generate list of absolute paths only.")
    parser.add_argument("-tp", action="store_true", help="Generate both tree structure and list of absolute paths.")
    parser.add_argument("-c", action="store_true", help="Generate combined output in a single file.")
    parser.add_argument("--content", action="store_true", help="Include file contents in the output.")
    parser.add_argument("--print", action="store_true", help="Print output to terminal.")
    args = parser.parse_args()

    root_dir = os.getcwd()
    docs_dir = os.path.join(root_dir, "docs")
    # When running transiently, still save to docs? Yes, user might want artifacts.
    tree_output_file = os.path.join(docs_dir, "project_structure.md")
    paths_output_file = os.path.join(docs_dir, "project_paths.md")
    combined_output_file = os.path.join(docs_dir, "project_combined.md")
    contents_output_file = os.path.join(docs_dir, "project_contents.md")
    
    exclude_dirs = ["node_modules", ".git", "build", "gist", "__pycache__", "dist", ".DS_Store", "Thumbs.db", "resource_docs"]

    if not os.path.exists(docs_dir):
        os.makedirs(docs_dir)
        
    generate_tree_structure = True
    generate_paths = False

    if args.tp:
        generate_tree_structure = True
        generate_paths = True
    elif args.p:
        generate_tree_structure = False
        generate_paths = True
    elif args.c:
        generate_tree_structure = False
        generate_paths = False

    if args.c:
        tree = "# Project Structure\n\n```txt\n.\n" + generate_tree(root_dir, "", exclude_dirs) + "```\n"
        paths = generate_paths_list(root_dir, exclude_dirs)
        combined = tree + "\n" + paths
        if args.content:
            combined += "\n" + generate_file_contents(root_dir, exclude_dirs)
        
        with open(combined_output_file, "w", encoding="utf-8") as f:
            f.write(combined)
        if args.print:
            print("\n" + "="*40 + "\nCOMBINED OUTPUT PREVIEW\n" + "="*40 + "\n" + combined)
            
    elif args.content:
        content = generate_file_contents(root_dir, exclude_dirs)
        with open(contents_output_file, "w", encoding="utf-8") as f:
            f.write(content)
        if args.print:
            print("\n" + "="*40 + "\nCONTENTS PREVIEW\n" + "="*40 + "\n" + content)
            
    if generate_tree_structure:
        tree = "# Project Structure\n\n```txt\n.\n" + generate_tree(root_dir, "", exclude_dirs) + "```\n"
        with open(tree_output_file, "w", encoding="utf-8") as f:
            f.write(tree)
        if args.print:
            print("\n" + "="*40 + "\nTREE STRUCTURE PREVIEW\n" + "="*40 + "\n" + tree)
            
    if generate_paths:
        paths = generate_paths_list(root_dir, exclude_dirs)
        with open(paths_output_file, "w", encoding="utf-8") as f:
            f.write(paths)
        if args.print:
            print("\n" + "="*40 + "\nPATHS LIST PREVIEW\n" + "="*40 + "\n" + paths)

if __name__ == "__main__":
    main()

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "strict": true
  }
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "format": {
      "dependsOn": ["^format"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

```

