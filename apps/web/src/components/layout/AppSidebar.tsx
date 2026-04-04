// apps/web/src/components/layout/AppSidebar.tsx
import { NavLink } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
// No import dos ícones, adiciona:
import {
    DashboardSquare01Icon,
    BookOpen01Icon,
    Settings01Icon,
    UserMultipleIcon,
    GridIcon,
    ContactBookIcon,
    Calendar01Icon,
    HardDriveIcon,
} from "@hugeicons/core-free-icons"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
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
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarSeparator,
} from "@workspace/ui/components/sidebar"
import { Button } from "@workspace/ui/components/button"
import { useAuthStore } from "@/stores/useAuthStore"

// ── Itens de navegação direta (sem sub-menu) ──
const topItems = [
    {
        title: "Dashboard",
        path: "/",
        icon: DashboardSquare01Icon,
        tooltip: "Dashboard",
    },
    {
        title: "Pessoas",
        path: "/pessoas",
        icon: UserMultipleIcon,
        tooltip: "Pessoas",
    },
    {
        title: "Contatos",
        path: "/contatos",
        icon: ContactBookIcon,
        tooltip: "Contatos Google",
    },
    {
        title: "Agenda",
        path: "/agenda",
        icon: Calendar01Icon,
        tooltip: "Agenda Google",
    },
    {
        title: "Drive",
        path: "/drive",
        icon: HardDriveIcon,
        tooltip: "Google Drive",
    },
]

// ── Sub-itens do grupo "Gerenciar" ──
const gerenciarItems = [
    {
        title: "Cadastros",
        path: "/gerenciar/cadastros",
        tooltip: "Cadastros",
    },
    // Futuro: Contratos, Turmas, Atendimentos...
]

// ── Itens inferiores ──
const bottomItems = [
    {
        title: "Materiais",
        path: "/materiais",
        icon: BookOpen01Icon,
        tooltip: "Materiais",
    },
    {
        title: "Configurações",
        path: "/configuracoes",
        icon: Settings01Icon,
        tooltip: "Configurações",
    },
    
]

export function AppSidebar() {
    const { user, logout } = useAuthStore()

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            {/* ── Header: logo ── */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <NavLink to="/">
                                <span className="text-sm font-semibold">W</span>
                                <span className="ml-2 text-sm font-semibold">izped</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* ── Menu principal ── */}
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {topItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton tooltip={item.tooltip} asChild>
                                        <NavLink to={item.path}>
                                            <HugeiconsIcon icon={item.icon} size={18} />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* ── Gerenciar: grupo colapsável com sub-itens ── */}
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip="Gerenciar">
                                            <HugeiconsIcon icon={GridIcon} size={18} />
                                            <span>Gerenciar</span>
                                            {/* Seta indicadora de aberto/fechado */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {gerenciarItems.map((item) => (
                                                <SidebarMenuSubItem key={item.path}>
                                                    <SidebarMenuSubButton asChild>
                                                        <NavLink to={item.path}>
                                                            <span>{item.title}</span>
                                                        </NavLink>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* ── Seção inferior ── */}
                <SidebarGroup>
                    <SidebarGroupLabel>Sistema</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {bottomItems.map((item) => (
                                <SidebarMenuItem key={item.path}>
                                    <SidebarMenuButton tooltip={item.tooltip} asChild>
                                        <NavLink to={item.path}>
                                            <HugeiconsIcon icon={item.icon} size={18} />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* ── Footer: usuário logado + sair ── */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 px-2 py-1">
                            <span className="text-xs truncate">{user?.displayName ?? user?.email}</span>
                            <Button variant="ghost" size="sm" onClick={logout} className="ml-auto h-6 text-xs">
                                Sair
                            </Button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}