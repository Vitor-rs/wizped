// apps/web/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
import { LoginForm } from "@/components/auth/LoginForm"
import { AppLayout } from "@/components/layout/AppLayout"
import { DashboardPage } from "@/pages/DashboardPage"
import { StudentsPage } from "@/pages/StudentsPage"
import { MaterialsPage } from "@/pages/MaterialsPage"
import { ContactsPage } from "@/pages/ContactsPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { CalendarPage } from "@/pages/CalendarPage"

export function App() {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground text-sm">Carregando...</p>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="alunos" element={<StudentsPage />} />
          <Route path="materiais" element={<MaterialsPage />} />
          <Route path="contatos" element={<ContactsPage />} />
          <Route path="agenda" element={<CalendarPage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}