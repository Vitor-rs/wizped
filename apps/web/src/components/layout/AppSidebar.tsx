// apps/web/src/components/layout/AppSidebar.tsx
import { NavLink } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    DashboardSquare01Icon,
    StudentIcon,
    BookOpen01Icon,
    Settings01Icon,
    ContactIcon,
    Calendar01Icon,
} from "@hugeicons/core-free-icons"
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

// Cada item agora tem um ícone associado.
// O campo "tooltip" é o texto que aparece ao passar o mouse quando recolhida.
const mainNavItems = [
    { title: "Dashboard", path: "/", icon: DashboardSquare01Icon },
    { title: "Alunos", path: "/alunos", icon: StudentIcon },
    { title: "Materiais", path: "/materiais", icon: BookOpen01Icon },
    { title: "Contatos", path: "/contatos", icon: ContactIcon },
    { title: "Agenda", path: "/agenda", icon: Calendar01Icon }
]

const secondaryNavItems = [
    { title: "Configurações", path: "/configuracoes", icon: Settings01Icon },
]

export function AppSidebar() {
    const { user, logout } = useAuthStore()

    return (
        // collapsible="icon" é a chave: a sidebar encolhe pra mostrar só ícones
        <Sidebar collapsible="icon">
            {/* ---- HEADER ---- */}
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-1">
                    {/* Quando recolhida, só o "W" aparece. Expandida, mostra "Wizped". 
              O group-data-[collapsible=icon] é um seletor do Tailwind que o
              shadcn Sidebar expõe: ele fica ativo quando a sidebar está no
              modo ícone (recolhida). */}
                    <span className="text-sm font-semibold">W</span>
                    <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
                        izped
                    </span>
                </div>
            </SidebarHeader>

            {/* ---- CONTENT ---- */}
            <SidebarContent>
                <SidebarGroup>
                    {/* O label do grupo some quando recolhida — comportamento padrão */}
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    {/* O prop "tooltip" faz o nome aparecer num tooltip
                      ao passar o mouse quando a sidebar está recolhida */}
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                isActive ? "font-semibold" : ""
                                            }
                                        >
                                            <HugeiconsIcon icon={item.icon} />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryNavItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                isActive ? "font-semibold" : ""
                                            }
                                        >
                                            <HugeiconsIcon icon={item.icon} />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ---- FOOTER ---- */}
            <SidebarFooter>
                <div className="flex items-center justify-between gap-2 px-2">
                    <span className="text-muted-foreground truncate text-xs group-data-[collapsible=icon]:hidden">
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