// apps/web/src/components/data-table/pessoa-columns.tsx
// Definições de colunas da Data Table para a entidade Pessoa.
// Cada coluna define: que dado mostrar, como formatar, e se é ordenável.

import { type ColumnDef } from "@tanstack/react-table"
import { type Pessoa, getPapeisLabel, getContatoPrincipal } from "@/schemas/pessoas"
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ArrowUpDownIcon,
} from "@hugeicons/core-free-icons"

export const pessoaColumns: ColumnDef<Pessoa>[] = [
    // ── Nome (ordenável, filtrável) ──
    {
        accessorKey: "nome",
        header: ({ column }) => (
            <Button
                variant="ghost"
                size="sm"
                className="-ml-3"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nome
                <HugeiconsIcon icon={ArrowUpDownIcon} className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("nome")}</span>
        ),
    },

    // ── Papel (calculado pelas funções utilitárias do schema) ──
    {
        id: "papel",
        header: "Papel",
        cell: ({ row }) => {
            const label = getPapeisLabel(row.original)
            return (
                <span className="text-muted-foreground text-xs">{label}</span>
            )
        },
        // Habilita filtro por texto no campo calculado
        filterFn: (row, _columnId, filterValue: string) => {
            const label = getPapeisLabel(row.original).toLowerCase()
            return label.includes(filterValue.toLowerCase())
        },
    },

    // ── Contato principal ──
    {
        id: "contato",
        header: "Contato",
        cell: ({ row }) => {
            const contato = getContatoPrincipal(row.original)
            return (
                <span className="text-muted-foreground text-xs">{contato}</span>
            )
        },
    },

    // ── Livro atual (só aparece se é aluno) ──
    {
        id: "livroAtual",
        header: "Livro",
        cell: ({ row }) => {
            const livro = row.original.papelAluno?.livroAtual
            return livro ? (
                <span className="text-xs">{livro}</span>
            ) : (
                <span className="text-muted-foreground text-xs">—</span>
            )
        },
    },

    // ── Turma ──
    {
        id: "turma",
        header: "Turma",
        cell: ({ row }) => {
            const turma = row.original.papelAluno?.turma
            return turma ? (
                <span className="text-xs">{turma}</span>
            ) : (
                <span className="text-muted-foreground text-xs">—</span>
            )
        },
    },

    // ── Tags ──
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const tags = row.getValue("tags") as string[]
            if (!tags || tags.length === 0) return null
            return (
                <div className="flex gap-1 flex-wrap">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )
        },
    },
]