// apps/web/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
import { LoginForm } from "@/components/auth/LoginForm"
import { AppLayout } from "@/components/layout/AppLayout"
import { DashboardPage } from "@/pages/DashboardPage"
import { StudentsPage } from "@/pages/StudentsPage"
import { MaterialsPage } from "@/pages/MaterialsPage"
import { SettingsPage } from "@/pages/SettingsPage"

export function App() {
  const { user, isLoading } = useAuthStore()

  // Enquanto o Firebase verifica sessão, mostra loading
  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </div>
    )
  }

  // Sem usuário → login (fora do Router, porque login não precisa de sidebar)
  if (!user) {
    return <LoginForm />
  }

  // Usuário logado → CRM com sidebar e rotas
  return (
    <BrowserRouter>
      <Routes>
        {/* O AppLayout é a "casca": sidebar + header + <Outlet />.
            As rotas filhas renderizam dentro do <Outlet />. */}
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="alunos" element={<StudentsPage />} />
          <Route path="materiais" element={<MaterialsPage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}