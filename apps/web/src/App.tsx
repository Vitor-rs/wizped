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