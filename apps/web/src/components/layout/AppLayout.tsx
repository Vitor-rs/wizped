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
        // defaultOpen={false} → sidebar inicia recolhida, mostrando só ícones
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <span className="text-muted-foreground text-sm">Wizped CRM</span>
                </header>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}