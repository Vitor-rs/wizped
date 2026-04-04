// apps/web/src/pages/StudentsPage.tsx
import { useEffect, useState } from "react"
import { usePessoaStore } from "@/stores/usePessoaStore"
import { DataTable } from "@/components/data-table/DataTable"
import { pessoaColumns } from "@/components/data-table/pessoa-columns"
import { Button } from "@workspace/ui/components/button"

// ─────────────────────────────────────────────
// Dados de seed — REMOVER depois de validar
// ─────────────────────────────────────────────
const SEED_DATA = [
    {
        // Caso 1: Aluno adulto — só papelAluno, sem responsável
        nome: "Carlos Eduardo Silva",
        contatos: [{ tipo: "celular" as const, valor: "(67) 99901-1111", principal: true }],
        emails: [{ tipo: "pessoal" as const, valor: "carlos.silva@gmail.com", principal: true }],
        tags: ["adulto"],
        papelAluno: {
            ativo: true,
            livroAtual: "W6",
            turma: "SEG-QUA 19h",
            nivel: "Intermediário",
            idioma: "ingles" as const,
            dataMatricula: "2024-03-10",
        },
    },
    {
        // Caso 2: Aluno kids — tem responsável
        nome: "Ana Beatriz Oliveira",
        dataNascimento: "2016-08-22",
        genero: "feminino" as const,
        contatos: [{ tipo: "celular" as const, valor: "(67) 99902-2222", principal: true }],
        tags: ["kids", "menor"],
        papelAluno: {
            ativo: true,
            livroAtual: "Kids 2",
            turma: "TER-QUI 14h",
            nivel: "Básico",
            idioma: "ingles" as const,
            dataMatricula: "2025-02-15",
            responsavel: {
                nome: "Márcia Oliveira",
                telefone: "(67) 99903-3333",
                email: "marcia.oliveira@gmail.com",
                parentesco: "mãe",
            },
        },
    },
    {
        // Caso 3: Funcionária — só papelMembro (recepcionista)
        nome: "Fernanda Costa",
        contatos: [{ tipo: "whatsapp" as const, valor: "(67) 99904-4444", principal: true }],
        emails: [{ tipo: "institucional" as const, valor: "fernanda@wizardnavirai.com.br", principal: true }],
        tags: ["equipe"],
        papelMembro: {
            ativo: true,
            cargo: "Recepcionista",
            departamento: "Atendimento",
            dataAdmissao: "2021-06-01",
        },
    },
    {
        // Caso 4: Lívia — professora E aluna ao mesmo tempo (o caso que definiu a arquitetura)
        nome: "Lívia Mendes",
        contatos: [{ tipo: "celular" as const, valor: "(67) 99905-5555", principal: true }],
        emails: [{ tipo: "pessoal" as const, valor: "livia.mendes@gmail.com", principal: true }],
        tags: ["equipe", "adulto"],
        papelMembro: {
            ativo: true,
            cargo: "Professora",
            departamento: "Acadêmico",
            dataAdmissao: "2022-01-15",
        },
        papelAluno: {
            ativo: true,
            livroAtual: "W12",
            turma: "SAB 09h",
            nivel: "Avançado",
            idioma: "espanhol" as const,
            dataMatricula: "2023-08-01",
        },
    },
    {
        // Caso 5: Contato puro — sem papel nenhum (ex-interessado, pai que não é responsável direto)
        nome: "Roberto Almeida",
        contatos: [{ tipo: "fixo" as const, valor: "(67) 3461-0000", principal: true }],
        emails: [],
        tags: ["interessado"],
    },
]

// ─────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────

export function StudentsPage() {
    const pessoas = usePessoaStore((s) => s.pessoas)
    const isLoading = usePessoaStore((s) => s.isLoading)
    const hasMore = usePessoaStore((s) => s.hasMore)
    const total = usePessoaStore((s) => s.total)
    const error = usePessoaStore((s) => s.error)
    const fetchPessoas = usePessoaStore((s) => s.fetchPessoas)
    const createPessoa = usePessoaStore((s) => s.createPessoa)

    // Controle do botão de seed (evitar clique duplo)
    const [seeding, setSeeding] = useState(false)

    useEffect(() => {
        fetchPessoas()
    }, [fetchPessoas])

    // ── Função de seed temporária ──
    const handleSeed = async () => {
        setSeeding(true)
        try {
            for (const pessoa of SEED_DATA) {
                await createPessoa(pessoa)
            }
            // Re-fetch pra pegar tudo ordenado corretamente
            await fetchPessoas()
        } catch (err) {
            console.error("Erro no seed:", err)
        } finally {
            setSeeding(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Pessoas</h1>
                    <p className="text-muted-foreground text-sm">
                        {total > 0
                            ? `${total} pessoa(s) cadastrada(s)`
                            : "Nenhuma pessoa cadastrada ainda."}
                    </p>
                </div>

                <div className="flex gap-2">
                    {/* ── SEED TEMPORÁRIO — REMOVER DEPOIS ── */}
                    {total === 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleSeed}
                            disabled={seeding || isLoading}
                        >
                            {seeding ? "Populando..." : "Popular dados de teste"}
                        </Button>
                    )}

                    <Button size="sm" disabled>
                        Nova Pessoa
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            {isLoading && pessoas.length === 0 ? (
                <div className="flex h-48 items-center justify-center">
                    <p className="text-muted-foreground text-sm">Carregando...</p>
                </div>
            ) : (
                <>
                    <DataTable
                        columns={pessoaColumns}
                        data={pessoas}
                        searchKey="nome"
                        searchPlaceholder="Buscar por nome..."
                    />

                    {hasMore && pessoas.length > 0 && (
                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => fetchPessoas([], false)}
                                disabled={isLoading}
                            >
                                {isLoading ? "Carregando..." : "Carregar mais"}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}