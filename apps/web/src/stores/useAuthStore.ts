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
