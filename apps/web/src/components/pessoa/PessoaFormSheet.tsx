// apps/web/src/components/pessoa/PessoaFormSheet.tsx
// Formulário de criação/edição de Pessoa em Sheet lateral.

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@workspace/ui/components/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui/components/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Button } from "@workspace/ui/components/button"
import { ScrollArea } from "@workspace/ui/components/scroll-area"

import { usePessoaStore } from "@/stores/usePessoaStore"
import { type Pessoa } from "@/schemas/pessoas"

// ─────────────────────────────────────────────
// Schema do formulário — sem .default() pra evitar
// divergência input/output no zodResolver.
// Defaults ficam no defaultValues do useForm.
// ─────────────────────────────────────────────

const formSchema = z.object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    nomeApelido: z.string().optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    dataNascimento: z.string().optional(),
    genero: z.enum(["masculino", "feminino", "outro", "nao_informado"]),
    estadoCivil: z.string().optional(),
    nacionalidade: z.string().optional(),
    cidadeNatal: z.string().optional(),
    profissao: z.string().optional(),
    escolaridade: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),

    habilitarAluno: z.boolean(),
    aluno_livroAtual: z.string().optional(),
    aluno_turma: z.string().optional(),
    aluno_nivel: z.string().optional(),
    aluno_idioma: z.enum(["ingles", "espanhol", "outro"]),
    aluno_matricula: z.string().optional(),
    aluno_condicaoCadastral: z.enum(["ativo", "inativo", "trancado", "formado", "transferido", "desistente"]),
    aluno_responsavelNome: z.string().optional(),
    aluno_responsavelTelefone: z.string().optional(),
    aluno_responsavelParentesco: z.string().optional(),

    habilitarMembro: z.boolean(),
    membro_cargo: z.string().optional(),
    membro_departamento: z.string().optional(),
    membro_dataAdmissao: z.string().optional(),
    membro_professor: z.boolean(),
    membro_professorInteractive: z.boolean(),
    membro_atendenteComercial: z.boolean(),
    membro_gestorComercial: z.boolean(),
    membro_consultor: z.boolean(),

    observacoes: z.string().optional(),
    tags: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type PessoaFormSheetProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    pessoa?: Pessoa | null
    defaultRole?: "aluno" | "membro" | "nenhum"
}

// ─────────────────────────────────────────────
// Conversão: Pessoa → FormValues (pra edição)
// ─────────────────────────────────────────────

function pessoaToForm(pessoa: Pessoa): FormValues {
    return {
        nome: pessoa.nome,
        nomeApelido: pessoa.nomeApelido ?? "",
        cpf: pessoa.cpf ?? "",
        rg: pessoa.rg ?? "",
        dataNascimento: pessoa.dataNascimento ?? "",
        genero: pessoa.genero,
        estadoCivil: pessoa.estadoCivil ?? "",
        nacionalidade: pessoa.nacionalidade ?? "",
        cidadeNatal: pessoa.cidadeNatal ?? "",
        profissao: pessoa.profissao ?? "",
        escolaridade: pessoa.escolaridade ?? "",
        telefone: pessoa.contatos[0]?.valor ?? "",
        email: pessoa.emails[0]?.valor ?? "",
        habilitarAluno: !!pessoa.papelAluno,
        aluno_livroAtual: pessoa.papelAluno?.livroAtual ?? "",
        aluno_turma: pessoa.papelAluno?.turma ?? "",
        aluno_nivel: pessoa.papelAluno?.nivel ?? "",
        aluno_idioma: pessoa.papelAluno?.idioma ?? "ingles",
        aluno_matricula: pessoa.papelAluno?.matricula ?? "",
        aluno_condicaoCadastral: pessoa.papelAluno?.condicaoCadastral ?? "ativo",
        aluno_responsavelNome: pessoa.papelAluno?.responsavel?.nome ?? "",
        aluno_responsavelTelefone: pessoa.papelAluno?.responsavel?.telefone ?? "",
        aluno_responsavelParentesco: pessoa.papelAluno?.responsavel?.parentesco ?? "",
        habilitarMembro: !!pessoa.papelMembro,
        membro_cargo: pessoa.papelMembro?.cargo ?? "",
        membro_departamento: pessoa.papelMembro?.departamento ?? "",
        membro_dataAdmissao: pessoa.papelMembro?.dataAdmissao ?? "",
        membro_professor: pessoa.papelMembro?.funcoes?.professor ?? false,
        membro_professorInteractive: pessoa.papelMembro?.funcoes?.professorInteractive ?? false,
        membro_atendenteComercial: pessoa.papelMembro?.funcoes?.atendenteComercial ?? false,
        membro_gestorComercial: pessoa.papelMembro?.funcoes?.gestorComercial ?? false,
        membro_consultor: pessoa.papelMembro?.funcoes?.consultor ?? false,
        observacoes: pessoa.observacoes ?? "",
        tags: pessoa.tags.join(", "),
    }
}

// ─────────────────────────────────────────────
// Conversão: FormValues → PessoaInput (pra gravar)
// ─────────────────────────────────────────────

function formToPessoa(values: FormValues) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {
        nome: values.nome,
        nomeApelido: values.nomeApelido || undefined,
        cpf: values.cpf || undefined,
        rg: values.rg || undefined,
        dataNascimento: values.dataNascimento || undefined,
        genero: values.genero,
        estadoCivil: values.estadoCivil || undefined,
        nacionalidade: values.nacionalidade || undefined,
        cidadeNatal: values.cidadeNatal || undefined,
        profissao: values.profissao || undefined,
        escolaridade: values.escolaridade || undefined,
        observacoes: values.observacoes || undefined,
        tags: values.tags
            ? values.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : [],
    }

    if (values.telefone) {
        data.contatos = [{ tipo: "celular", valor: values.telefone, principal: true }]
    }
    if (values.email) {
        data.emails = [{ tipo: "pessoal", valor: values.email, principal: true }]
    }

    if (values.habilitarAluno) {
        const responsavel = values.aluno_responsavelNome
            ? {
                nome: values.aluno_responsavelNome,
                telefone: values.aluno_responsavelTelefone || undefined,
                parentesco: values.aluno_responsavelParentesco || undefined,
            }
            : undefined

        data.papelAluno = {
            ativo: true,
            livroAtual: values.aluno_livroAtual || undefined,
            turma: values.aluno_turma || undefined,
            nivel: values.aluno_nivel || undefined,
            idioma: values.aluno_idioma,
            matricula: values.aluno_matricula || undefined,
            condicaoCadastral: values.aluno_condicaoCadastral,
            responsavel,
        }
    }

    if (values.habilitarMembro) {
        data.papelMembro = {
            ativo: true,
            cargo: values.membro_cargo || "Não definido",
            departamento: values.membro_departamento || undefined,
            dataAdmissao: values.membro_dataAdmissao || undefined,
            funcoes: {
                professor: values.membro_professor,
                professorInteractive: values.membro_professorInteractive,
                atendenteComercial: values.membro_atendenteComercial,
                gestorComercial: values.membro_gestorComercial,
                consultor: values.membro_consultor,
            },
        }
    }

    return data
}

// ─────────────────────────────────────────────
// Defaults pra criação
// ─────────────────────────────────────────────

function getDefaults(role?: string): FormValues {
    return {
        nome: "", nomeApelido: "", cpf: "", rg: "", dataNascimento: "",
        genero: "nao_informado", estadoCivil: "", nacionalidade: "",
        cidadeNatal: "", profissao: "", escolaridade: "",
        telefone: "", email: "",
        habilitarAluno: role === "aluno",
        aluno_livroAtual: "", aluno_turma: "", aluno_nivel: "",
        aluno_idioma: "ingles", aluno_matricula: "",
        aluno_condicaoCadastral: "ativo",
        aluno_responsavelNome: "", aluno_responsavelTelefone: "",
        aluno_responsavelParentesco: "",
        habilitarMembro: role === "membro",
        membro_cargo: "", membro_departamento: "", membro_dataAdmissao: "",
        membro_professor: false, membro_professorInteractive: false,
        membro_atendenteComercial: false, membro_gestorComercial: false,
        membro_consultor: false,
        observacoes: "", tags: "",
    }
}

// ─────────────────────────────────────────────
// Helper: campo de formulário com label e erro
// ─────────────────────────────────────────────

function Field({
    label,
    error,
    children,
    className,
}: {
    label?: string
    error?: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={className ?? "space-y-1"}>
            {label && <label className="text-sm font-medium">{label}</label>}
            {children}
            {error && <p className="text-destructive text-xs">{error}</p>}
        </div>
    )
}

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────

export function PessoaFormSheet({
    open,
    onOpenChange,
    pessoa,
    defaultRole = "nenhum",
}: PessoaFormSheetProps) {
    const createPessoa = usePessoaStore((s) => s.createPessoa)
    const updatePessoa = usePessoaStore((s) => s.updatePessoa)
    const fetchPessoas = usePessoaStore((s) => s.fetchPessoas)
    const isEditing = !!pessoa

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaults(defaultRole),
    })

    useEffect(() => {
        if (open && pessoa) {
            reset(pessoaToForm(pessoa))
        } else if (open && !pessoa) {
            reset(getDefaults(defaultRole))
        }
    }, [open, pessoa, defaultRole, reset])

    const habilitarAluno = watch("habilitarAluno")
    const habilitarMembro = watch("habilitarMembro")

    const onSubmit = async (values: FormValues) => {
        try {
            const data = formToPessoa(values)
            if (isEditing && pessoa?.id) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await updatePessoa(pessoa.id, data as any)
            } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await createPessoa(data as any)
            }
            await fetchPessoas()
            onOpenChange(false)
        } catch (err) {
            console.error("Erro ao salvar pessoa:", err)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col">
                <SheetHeader className="px-6 pt-6 pb-2">
                    <SheetTitle>{isEditing ? `Editar: ${pessoa?.nome}` : "Nova Pessoa"}</SheetTitle>
                    <SheetDescription>
                        {isEditing ? "Altere os dados e clique em Salvar." : "Preencha os dados e clique em Salvar."}
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6">
                    <form id="pessoa-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
                        <Tabs defaultValue="dados" className="space-y-4">
                            <TabsList className="w-full justify-start flex-wrap h-auto gap-1">
                                <TabsTrigger value="dados" className="text-xs">Dados Pessoais</TabsTrigger>
                                <TabsTrigger value="contato" className="text-xs">Contato</TabsTrigger>
                                <TabsTrigger value="aluno" className="text-xs">Estudante</TabsTrigger>
                                <TabsTrigger value="membro" className="text-xs">Funcionário</TabsTrigger>
                                <TabsTrigger value="obs" className="text-xs">Observações</TabsTrigger>
                            </TabsList>

                            {/* ══ TAB: Dados Pessoais ══ */}
                            <TabsContent value="dados" className="space-y-4">
                                <Field label="Nome *" error={errors.nome?.message}>
                                    <Input placeholder="Nome completo" {...register("nome")} />
                                </Field>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Apelido">
                                        <Input placeholder="Como é chamado" {...register("nomeApelido")} />
                                    </Field>
                                    <Field label="CPF">
                                        <Input placeholder="000.000.000-00" {...register("cpf")} />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="RG">
                                        <Input {...register("rg")} />
                                    </Field>
                                    <Field label="Data de Nascimento">
                                        <Input type="date" {...register("dataNascimento")} />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Gênero">
                                        <Controller control={control} name="genero" render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="masculino">Masculino</SelectItem>
                                                    <SelectItem value="feminino">Feminino</SelectItem>
                                                    <SelectItem value="outro">Outro</SelectItem>
                                                    <SelectItem value="nao_informado">Não informado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                    </Field>

                                    <Field label="Estado Civil">
                                        <Controller control={control} name="estadoCivil" render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="solteiro">Solteiro</SelectItem>
                                                    <SelectItem value="casado">Casado</SelectItem>
                                                    <SelectItem value="divorciado">Divorciado</SelectItem>
                                                    <SelectItem value="viuvo">Viúvo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )} />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Nacionalidade">
                                        <Input placeholder="Brasileira" {...register("nacionalidade")} />
                                    </Field>
                                    <Field label="Cidade Natal">
                                        <Input {...register("cidadeNatal")} />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Profissão">
                                        <Input {...register("profissao")} />
                                    </Field>
                                    <Field label="Escolaridade">
                                        <Input {...register("escolaridade")} />
                                    </Field>
                                </div>
                            </TabsContent>

                            {/* ══ TAB: Contato ══ */}
                            <TabsContent value="contato" className="space-y-4">
                                <Field label="Celular">
                                    <Input placeholder="(67) 99999-0000" {...register("telefone")} />
                                </Field>
                                <Field label="E-mail">
                                    <Input type="email" placeholder="email@exemplo.com" {...register("email")} />
                                </Field>
                                <p className="text-muted-foreground text-xs">
                                    Endereço completo e contatos adicionais serão implementados em breve.
                                </p>
                            </TabsContent>

                            {/* ══ TAB: Estudante ══ */}
                            <TabsContent value="aluno" className="space-y-4">
                                <Controller control={control} name="habilitarAluno" render={({ field }) => (
                                    <div className="flex items-center gap-2 rounded-md border p-3">
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        <label className="text-sm">Esta pessoa é estudante da escola</label>
                                    </div>
                                )} />

                                {habilitarAluno && (
                                    <div className="space-y-4 rounded-md border p-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Idioma">
                                                <Controller control={control} name="aluno_idioma" render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="ingles">Inglês</SelectItem>
                                                            <SelectItem value="espanhol">Espanhol</SelectItem>
                                                            <SelectItem value="outro">Outro</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )} />
                                            </Field>
                                            <Field label="Condição">
                                                <Controller control={control} name="aluno_condicaoCadastral" render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="ativo">Ativo</SelectItem>
                                                            <SelectItem value="inativo">Inativo</SelectItem>
                                                            <SelectItem value="trancado">Trancado</SelectItem>
                                                            <SelectItem value="formado">Formado</SelectItem>
                                                            <SelectItem value="transferido">Transferido</SelectItem>
                                                            <SelectItem value="desistente">Desistente</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )} />
                                            </Field>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <Field label="Livro Atual">
                                                <Input placeholder="W4" {...register("aluno_livroAtual")} />
                                            </Field>
                                            <Field label="Turma">
                                                <Input placeholder="SEG-QUA 19h" {...register("aluno_turma")} />
                                            </Field>
                                            <Field label="Nível">
                                                <Input placeholder="Intermediário" {...register("aluno_nivel")} />
                                            </Field>
                                        </div>

                                        <Field label="Nº Matrícula">
                                            <Input {...register("aluno_matricula")} />
                                        </Field>

                                        <div className="space-y-3 rounded-md border p-3">
                                            <p className="text-sm font-medium">Responsável</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Field label="Nome">
                                                    <Input {...register("aluno_responsavelNome")} />
                                                </Field>
                                                <Field label="Telefone">
                                                    <Input {...register("aluno_responsavelTelefone")} />
                                                </Field>
                                            </div>
                                            <Field label="Parentesco">
                                                <Input placeholder="mãe, pai, avó..." {...register("aluno_responsavelParentesco")} />
                                            </Field>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            {/* ══ TAB: Funcionário ══ */}
                            <TabsContent value="membro" className="space-y-4">
                                <Controller control={control} name="habilitarMembro" render={({ field }) => (
                                    <div className="flex items-center gap-2 rounded-md border p-3">
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        <label className="text-sm">Esta pessoa é funcionária da escola</label>
                                    </div>
                                )} />

                                {habilitarMembro && (
                                    <div className="space-y-4 rounded-md border p-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <Field label="Cargo *">
                                                <Input placeholder="Professor, Recepcionista..." {...register("membro_cargo")} />
                                            </Field>
                                            <Field label="Departamento">
                                                <Input placeholder="Acadêmico, Atendimento..." {...register("membro_departamento")} />
                                            </Field>
                                        </div>

                                        <Field label="Data de Admissão">
                                            <Input type="date" {...register("membro_dataAdmissao")} />
                                        </Field>

                                        <div className="space-y-3 rounded-md border p-3">
                                            <p className="text-sm font-medium">Funções</p>
                                            <div className="space-y-2">
                                                {([
                                                    ["membro_professor", "Professor"],
                                                    ["membro_professorInteractive", "Professor Interactive"],
                                                    ["membro_atendenteComercial", "Atendente Comercial"],
                                                    ["membro_gestorComercial", "Gestor Comercial"],
                                                    ["membro_consultor", "Consultor"],
                                                ] as const).map(([name, label]) => (
                                                    <Controller key={name} control={control} name={name} render={({ field }) => (
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                            <label className="text-sm">{label}</label>
                                                        </div>
                                                    )} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            {/* ══ TAB: Observações ══ */}
                            <TabsContent value="obs" className="space-y-4">
                                <Field label="Observações">
                                    <Textarea rows={5} placeholder="Anotações sobre a pessoa..." {...register("observacoes")} />
                                </Field>
                                <Field label="Tags">
                                    <Input placeholder="adulto, vip, interessado (separadas por vírgula)" {...register("tags")} />
                                </Field>
                            </TabsContent>
                        </Tabs>
                    </form>
                </ScrollArea>

                <div className="border-t px-6 py-4 flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button type="submit" form="pessoa-form" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}