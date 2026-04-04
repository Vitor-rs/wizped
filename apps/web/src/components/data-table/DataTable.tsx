// apps/web/src/components/data-table/DataTable.tsx
// Componente genérico de Data Table — reutilizável pra qualquer entidade.
// Combina shadcn Table (visual) + TanStack Table (lógica).

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type SortingState,
    type ColumnFiltersState,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@workspace/ui/components/table"
import { Input } from "@workspace/ui/components/input"

// ─────────────────────────────────────────────
// Props — genéricas pra aceitar qualquer tipo de dado
// ─────────────────────────────────────────────

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string           // qual campo usar no filtro de busca
    searchPlaceholder?: string   // texto do placeholder do input de busca
}

// ─────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────


export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchPlaceholder = "Buscar...",
}: DataTableProps<TData, TValue>) {
    // Estado local do TanStack — sorting e filtering são client-side
    // (a paginação é server-side via Firestore cursor, então não entra aqui)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    /* eslint-disable react-hooks/incompatible-library */
    const table = useReactTable({
        data,
        columns,
        state: { sorting, columnFilters },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div className="space-y-4">
            {/* Barra de busca — só aparece se searchKey foi definida */}
            {searchKey && (
                <div className="flex items-center">
                    <Input
                        placeholder={searchPlaceholder}
                        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                        onChange={(e) =>
                            table.getColumn(searchKey)?.setFilterValue(e.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
            )}

            {/* Tabela propriamente dita */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Contador de resultados */}
            <div className="text-muted-foreground text-xs">
                {table.getFilteredRowModel().rows.length} resultado(s)
            </div>
        </div>
    )
}