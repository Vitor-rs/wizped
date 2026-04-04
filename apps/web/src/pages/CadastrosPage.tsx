// apps/web/src/pages/CadastrosPage.tsx
// Página central de CRUD — organizada em Tabs por domínio.

import { useEffect, useState } from "react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@workspace/ui/components/tabs"
import { usePessoaStore } from "@/stores/usePessoaStore"
import { DataTable } from "@/components/data-table/DataTable"
import { getPessoaColumns } from "@/components/data-table/pessoa-columns"
import { Button } from "@workspace/ui/components/button"
import { isAluno, isMembro, type Pessoa } from "@/schemas/pessoas"
import { PessoaFormSheet } from "@/components/pessoa/PessoaFormSheet"

export function CadastrosPage() {
    const pessoas = usePessoaStore((s) => s.pessoas)
    const isLoading = usePessoaStore((s) => s.isLoading)
    const fetchPessoas = usePessoaStore((s) => s.fetchPessoas)

    // Estado do Sheet de formulário
    const [sheetOpen, setSheetOpen] = useState(false)
    const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null)
    const [defaultRole, setDefaultRole] = useState<"aluno" | "membro" | "nenhum">("nenhum")

    useEffect(() => {
        if (pessoas.length === 0) {
            fetchPessoas()
        }
    }, [pessoas.length, fetchPessoas])

    const estudantes = pessoas.filter((p) => isAluno(p))
    const funcionarios = pessoas.filter((p) => isMembro(p))

    // Handlers — declarados ANTES de serem usados em columnsComEdicao
    const handleNovoEstudante = () => {
        setPessoaEditando(null)
        setDefaultRole("aluno")
        setSheetOpen(true)
    }

    const handleNovoFuncionario = () => {
        setPessoaEditando(null)
        setDefaultRole("membro")
        setSheetOpen(true)
    }

    const handleEditar = (pessoa: Pessoa) => {
        setPessoaEditando(pessoa)
        setDefaultRole("nenhum")
        setSheetOpen(true)
    }

    // Gera colunas com botão de edição — DEPOIS dos handlers
    const columnsComEdicao = getPessoaColumns(handleEditar)

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-lg font-semibold">Cadastros</h1>
                <p className="text-muted-foreground text-sm">
                    Gestão de estudantes, funcionários e configurações gerais.
                </p>
            </div>

            <Tabs defaultValue="estudantes" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="estudantes">
                        Estudantes
                        {estudantes.length > 0 && (
                            <span className="bg-muted text-muted-foreground ml-2 rounded-full px-2 py-0.5 text-[10px]">
                                {estudantes.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="funcionarios">
                        Funcionários
                        {funcionarios.length > 0 && (
                            <span className="bg-muted text-muted-foreground ml-2 rounded-full px-2 py-0.5 text-[10px]">
                                {funcionarios.length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="cadastros-gerais">Cadastros Gerais</TabsTrigger>
                </TabsList>

                <TabsContent value="estudantes" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            {estudantes.length} estudante(s) cadastrado(s)
                        </p>
                        <Button size="sm" onClick={handleNovoEstudante}>
                            Novo Estudante
                        </Button>
                    </div>
                    {isLoading && estudantes.length === 0 ? (
                        <div className="flex h-48 items-center justify-center">
                            <p className="text-muted-foreground text-sm">Carregando...</p>
                        </div>
                    ) : (
                        <DataTable
                            columns={columnsComEdicao}
                            data={estudantes}
                            searchKey="nome"
                            searchPlaceholder="Buscar estudante por nome..."
                        />
                    )}
                </TabsContent>

                <TabsContent value="funcionarios" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                            {funcionarios.length} funcionário(s) cadastrado(s)
                        </p>
                        <Button size="sm" onClick={handleNovoFuncionario}>
                            Novo Funcionário
                        </Button>
                    </div>
                    {isLoading && funcionarios.length === 0 ? (
                        <div className="flex h-48 items-center justify-center">
                            <p className="text-muted-foreground text-sm">Carregando...</p>
                        </div>
                    ) : (
                        <DataTable
                            columns={columnsComEdicao}
                            data={funcionarios}
                            searchKey="nome"
                            searchPlaceholder="Buscar funcionário por nome..."
                        />
                    )}
                </TabsContent>

                <TabsContent value="cadastros-gerais" className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                        Configurações de motivos, classificações e parâmetros do sistema.
                    </p>
                    <div className="rounded-md border p-8 text-center">
                        <p className="text-muted-foreground text-sm">
                            Editor de cadastros gerais será implementado aqui.
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                            Motivos de cancelamento, desistência, não fechamento, salas, cursos, etc.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Sheet de formulário — vive fora das tabs */}
            <PessoaFormSheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                pessoa={pessoaEditando}
                defaultRole={defaultRole}
            />
        </div>
    )
}