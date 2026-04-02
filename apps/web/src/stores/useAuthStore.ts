// apps/web/src/stores/useAuthStore.ts — VERSÃO ATUALIZADA
import { create } from "zustand"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  type User,
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

type AuthState = {
  user: User | null
  accessToken: string | null // NOVO — token para as Google APIs
  isLoading: boolean
  error: string | null
}

type AuthActions = {
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
  refreshGoogleToken: () => Promise<string | null> // NOVO — re-auth silenciosa
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,

  loginWithEmail: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Login por email NÃO produz access token do Google — só Firebase Auth
      // As páginas de APIs do Google só funcionam com login Google
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login"
      set({ error: message, isLoading: false })
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null })
    try {
      const result = await signInWithPopup(auth, googleProvider)
      // Extrair o access token do Google OAuth
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const accessToken = credential?.accessToken ?? null
      set({ accessToken })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao fazer login com Google"
      set({ error: message, isLoading: false })
    }
  },

  logout: async () => {
    try {
      await signOut(auth)
      set({ accessToken: null })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao sair"
      set({ error: message })
    }
  },

  clearError: () => set({ error: null }),

  // Quando o access token expirar (401), chama isso para re-autenticar
  // O popup geralmente resolve instantaneamente se o usuário já está logado no Google
  refreshGoogleToken: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const newToken = credential?.accessToken ?? null
      set({ accessToken: newToken })
      return newToken
    } catch {
      set({ error: "Não foi possível renovar o token do Google" })
      return null
    }
  },
}))

// Listener global — continua funcionando igual
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, isLoading: false })
})
