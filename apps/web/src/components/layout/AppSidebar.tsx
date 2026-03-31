// apps/web/src/components/layout/AppSidebar.tsx
import { NavLink } from "react-router-dom"
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from "@workspace/ui/components/sidebar"
import { Button } from "@workspace/ui/components/button"
import { useAuthStore } from "@/stores/useAuthStore"

// Definição centralizada das rotas do menu.
// Quando precisar adicionar uma página nova, é só adicionar um objeto aqui.
const mainNavItems = [
    { title: "Dashboard", path: "/" },
    { title: "Alunos", path: "/alunos" },
    { title: "Materiais", path: "/materiais" },
]

const secondaryNavItems = [
    { title: "Configurações", path: "/configuracoes" },
]

export function AppSidebar() {
    const { user, logout } = useAuthStore()

    return (
        <Sidebar>
            {/* ---- HEADER: Logo/nome do app ---- */}
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                    <span className="text-sm font-semibold">Wizped</span>
                </div>
            </SidebarHeader>

            {/* ---- CONTENT: Links de navegação ---- */}
            <SidebarContent>
                {/* Grupo principal */}
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                isActive ? "font-semibold" : ""
                                            }
                                        >
                                            {item.title}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* Grupo secundário */}
                <SidebarGroup>
                    <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                isActive ? "font-semibold" : ""
                                            }
                                        >
                                            {item.title}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ---- FOOTER: Info do usuário + logout ---- */}
            <SidebarFooter>
                <div className="flex items-center justify-between gap-2 px-2">
                    <span className="text-muted-foreground truncate text-xs">
                        {user?.displayName || user?.email}
                    </span>
                    <Button variant="ghost" size="xs" onClick={logout}>
                        Sair
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}