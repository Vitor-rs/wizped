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
├── .vscode/
│   └── settings.json
├── README.md
├── apps/
│   └── web/
│       ├── .env.local
│       ├── components.json
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── src/
│       │   ├── App.tsx
│       │   ├── components/
│       │   │   ├── .gitkeep
│       │   │   ├── auth/
│       │   │   │   └── LoginForm.tsx
│       │   │   └── theme-provider.tsx
│       │   ├── hooks/
│       │   │   └── use-mobile.ts
│       │   ├── lib/
│       │   │   └── firebase.ts
│       │   ├── main.tsx
│       │   └── stores/
│       │       └── useAuthStore.ts
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── docs/
│   └── project_combined.md
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
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── input.tsx
│       │   │   ├── separator.tsx
│       │   │   ├── sheet.tsx
│       │   │   ├── sidebar.tsx
│       │   │   ├── skeleton.tsx
│       │   │   ├── table.tsx
│       │   │   └── tooltip.tsx
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
C:\Users\Vitor\Documents\Wizped\wizped\.vscode\
C:\Users\Vitor\Documents\Wizped\wizped\.vscode\settings.json
C:\Users\Vitor\Documents\Wizped\wizped\README.md
C:\Users\Vitor\Documents\Wizped\wizped\apps\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\.env.local
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\components.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\eslint.config.js
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\index.html
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\package.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\App.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\.gitkeep
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\auth\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\auth\LoginForm.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\theme-provider.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\hooks\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\hooks\use-mobile.ts
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\lib\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\lib\firebase.ts
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\main.tsx
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\stores\
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\stores\useAuthStore.ts
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.app.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.node.json
C:\Users\Vitor\Documents\Wizped\wizped\apps\web\vite.config.ts
C:\Users\Vitor\Documents\Wizped\wizped\docs\
C:\Users\Vitor\Documents\Wizped\wizped\docs\project_combined.md
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
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\card.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\dialog.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\input.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\separator.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\sheet.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\sidebar.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\skeleton.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\table.tsx
C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\tooltip.tsx
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

## File: C:\Users\Vitor\Documents\Wizped\wizped\.vscode\settings.json

```json
{
    "typescript.tsdk": "node_modules\\typescript\\lib"
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

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\.env.local

```local
VITE_FIREBASE_API_KEY=AIzaSyD-VF07KPkTo2U9QQKsyH-sWBmbQEw0pKE
VITE_FIREBASE_AUTH_DOMAIN=wizped275.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=wizped275
VITE_FIREBASE_STORAGE_BUCKET=wizped275.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=208839411895
VITE_FIREBASE_APP_ID=1:208839411895:web:42015733917a55baa92532

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
// apps/web/eslint.config.js
import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // Aqui está a correção: diz ao parser "sua raiz é ESTA pasta"
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
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
    <title>Wizped</title>
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
    "@tanstack/react-table": "^8.21.3",
    "@workspace/ui": "*",
    "firebase": "^12.11.0",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "zustand": "^5.0.12"
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
import { useAuthStore } from "@/stores/useAuthStore"
import { LoginForm } from "@/components/auth/LoginForm"
import { Button } from "@workspace/ui/components/button"

export function App() {
  const { user, isLoading, logout } = useAuthStore()

  // Enquanto o Firebase verifica se há sessão ativa, mostra loading
  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </div>
    )
  }

  // Sem usuário logado → mostra tela de login
  if (!user) {
    return <LoginForm />
  }

  // Usuário logado → mostra o conteúdo do app (placeholder por enquanto)
  return (
    <div className="flex min-h-svh flex-col p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium">Wizped</h1>
          <p className="text-muted-foreground text-sm">
            Bem-vindo, {user.displayName || user.email}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          Sair
        </Button>
      </div>
    </div>
  )
}
```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\.gitkeep

```txt

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\components\auth\LoginForm.tsx

```tsx
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { useAuthStore } from "@/stores/useAuthStore"

export function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loginWithEmail, loginWithGoogle, isLoading, error, clearError } =
        useAuthStore()

    async function handleEmailLogin(e: React.FormEvent) {
        e.preventDefault()
        await loginWithEmail(email, password)
    }

    return (
        <div className="flex min-h-svh items-center justify-center p-4">
            <Card className="w-full max-w-sm p-6">
                <div className="mb-6 text-center">
                    <h1 className="text-lg font-semibold">Wizped</h1>
                    <p className="text-muted-foreground text-sm">
                        Faça login para continuar
                    </p>
                </div>

                <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            clearError()
                        }}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            clearError()
                        }}
                        required
                    />

                    {error && (
                        <p className="text-destructive text-xs">{error}</p>
                    )}

                    <Button type="submit" disabled={isLoading} className="mt-1">
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                {/* Separador visual entre os dois métodos de login */}
                <div className="my-4 flex items-center gap-3">
                    <div className="bg-border h-px flex-1" />
                    <span className="text-muted-foreground text-xs">ou</span>
                    <div className="bg-border h-px flex-1" />
                </div>

                <Button
                    variant="outline"
                    className="w-full"
                    onClick={loginWithGoogle}
                    disabled={isLoading}
                >
                    Entrar com Google
                </Button>
            </Card>
        </div>
    )
}
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

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\hooks\use-mobile.ts

```ts
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\lib\firebase.ts

```ts
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// As variáveis VITE_ ficam acessíveis via import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Inicializa o app Firebase — isso só roda uma vez graças ao module caching do ES
export const app = initializeApp(firebaseConfig)

// Auth já configurado com os providers que você habilitou no Console
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Firestore na região southamerica-east1 (já configurado no Console)
export const db = getFirestore(app)

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\main.tsx

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { App } from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\src\stores\useAuthStore.ts

```ts
import { create } from "zustand"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

// Tipagem do estado e das ações do store
type AuthState = {
  user: User | null
  isLoading: boolean
  error: string | null
}

type AuthActions = {
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  // Estado inicial: carregando até o Firebase confirmar se há sessão ativa
  user: null,
  isLoading: true,
  error: null,

  loginWithEmail: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Não precisa fazer set({ user }) aqui — o onAuthStateChanged cuida disso
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login"
      set({ error: message, isLoading: false })
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null })
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao fazer login com Google"
      set({ error: message, isLoading: false })
    }
  },

  logout: async () => {
    try {
      await signOut(auth)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao sair"
      set({ error: message })
    }
  },

  clearError: () => set({ error: null }),
}))

// Listener global — roda uma vez quando o módulo é importado.
// Funciona como um "vigia" que fica na portaria: toda vez que alguém
// entra ou sai (login/logout), ele atualiza o estado do Zustand.
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, isLoading: false })
})

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\apps\web\tsconfig.app.json

```json
// apps/web/tsconfig.app.json
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
// apps/web/tsconfig.node.json
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

## File: C:\Users\Vitor\Documents\Wizped\wizped\docs\project_combined.md

```md
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

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\card.tsx

```tsx
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-lg bg-card py-4 text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs/relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-lg px-4 group-data-[size=sm]/card:px-3 [.border-t]:pt-4 group-data-[size=sm]/card:[.border-t]:pt-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\dialog.tsx

```tsx
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-xs/relaxed text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-xs/relaxed text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\input.tsx

```tsx
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\separator.tsx

```tsx
"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@workspace/ui/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\sheet.tsx

```tsx
import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col bg-popover bg-clip-padding text-xs/relaxed text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon-sm"
            >
              <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-sm font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-xs/relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\sidebar.tsx

```tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import { SidebarLeftIcon } from "@hugeicons/core-free-icons"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <HugeiconsIcon icon={SidebarLeftIcon} strokeWidth={2} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(
        "h-8 w-full border-input bg-muted/20 dark:bg-muted/30",
        className
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        "relative flex w-full min-w-0 flex-col px-2 py-1",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-xs", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-px", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-[calc(var(--radius-sm)+2px)] p-2 text-left text-xs ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-xs",
        sm: "h-7 text-xs",
        lg: "h-12 text-xs group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-[calc(var(--radius-sm)-2px)] px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-xs data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\skeleton.tsx

```tsx
import { cn } from "@workspace/ui/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\table.tsx

```tsx
import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-xs", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## File: C:\Users\Vitor\Documents\Wizped\wizped\packages\ui\src\components\tooltip.tsx

```tsx
import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@workspace/ui/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

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

