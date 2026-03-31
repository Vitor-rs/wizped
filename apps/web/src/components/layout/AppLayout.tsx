// apps/web/src/components/layout/AppLayout.tsx
import { Outlet } from "react-router-dom"
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { Separator } from "@workspace/ui/components/separator"
import { AppSidebar } from "./AppSidebar"

export function AppLayout() {
    return (
        <SidebarProvider>
            {/* Sidebar à esquerda */}
            <AppSidebar />

            {/* Área de conteúdo principal à direita */}
            <SidebarInset>
                {/* Header fixo com o trigger e um breadcrumb simples */}
                <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <span className="text-muted-foreground text-sm">Wizped CRM</span>
                </header>

                {/* Conteúdo da página — o <Outlet /> renderiza a rota ativa */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}