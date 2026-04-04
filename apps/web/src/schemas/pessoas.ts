// apps/web/src/schemas/pessoa.ts
// Schema Pessoa Única — uma coleção, múltiplos papéis.
// Baseado na análise das APIs Sponteweb + screenshots do Sponte + caso Lívia.

import { z } from "zod"

// ─────────────────────────────────────────────
// Schemas auxiliares (blocos reutilizáveis)
// ─────────────────────────────────────────────

/** Endereço — mesmo formato do Google People API (facilita sync futuro) */
export const EnderecoSchema = z.object({
  tipo: z.enum(["residencial", "comercial", "outro"]).default("residencial"),
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  principal: z.boolean().default(false),
})

/** Contato telefônico — tipos alinhados com o Sponte */
export const ContatoSchema = z.object({
  tipo: z.enum(["celular", "fixo", "whatsapp", "outro"]).default("celular"),
  valor: z.string().min(1, "Número é obrigatório"),
  principal: z.boolean().default(false),
})

/** Email */
export const EmailSchema = z.object({
  tipo: z.enum(["pessoal", "institucional", "outro"]).default("pessoal"),
  valor: z.string().email("Email inválido"),
  principal: z.boolean().default(false),
})

// ─────────────────────────────────────────────
// Papéis (adesivos no crachá)
// ─────────────────────────────────────────────

/**
 * Papel Membro — funcionário da escola.
 * Cargos: professor, recepcionista, coordenador, auxiliar, diretor.
 * "cargo" usa string livre porque lookup tables virão depois.
 */
export const PapelMembroSchema = z.object({
  ativo: z.boolean().default(true),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  departamento: z.string().optional(),
  dataAdmissao: z.string().optional(), // ISO date string — Firestore não tem tipo Date nativo no web SDK
  dataDemissao: z.string().optional(),
  observacoes: z.string().optional(),
})

/**
 * Papel Aluno — estudante matriculado.
 * Campos derivados das telas do Sponte (screenshots) + API BI.
 */
export const PapelAlunoSchema = z.object({
  ativo: z.boolean().default(true),
  matricula: z.string().optional(),
  livroAtual: z.string().optional(), // ex: "W4", "Teens 3", "Kids 2"
  turma: z.string().optional(), // ex: "T4-A", "SEG-QUA 18h"
  nivel: z.string().optional(), // ex: "Básico", "Intermediário"
  idioma: z.enum(["ingles", "espanhol", "outro"]).default("ingles"),
  dataMatricula: z.string().optional(), // ISO date
  dataCancelamento: z.string().optional(),
  motivoCancelamento: z.string().optional(), // ref à lookup table (futura)
  responsavel: z // Para menores de idade
    .object({
      nome: z.string(),
      telefone: z.string().optional(),
      email: z.string().email().optional(),
      parentesco: z.string().optional(), // "mãe", "pai", "avó", etc.
    })
    .optional(),
  observacoes: z.string().optional(),
})

// ─────────────────────────────────────────────
// Pessoa (o documento principal no Firestore)
// ─────────────────────────────────────────────

/**
 * PessoaSchema — entidade raiz da coleção "pessoas".
 *
 * Campos base são obrigatórios pra todo mundo.
 * Papéis são opcionais — presença indica que a pessoa exerce aquele papel.
 * Uma pessoa pode ter 0, 1 ou N papéis simultaneamente (caso Lívia).
 */
export const PessoaSchema = z.object({
  // Identificação Firestore (preenchido pelo sistema, não pelo usuário)
  id: z.string().optional(),

  // Dados pessoais base
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf: z.string().optional(),
  rg: z.string().optional(),
  dataNascimento: z.string().optional(), // ISO date
  genero: z
    .enum(["masculino", "feminino", "outro", "nao_informado"])
    .default("nao_informado"),
  fotoUrl: z.string().url().optional(),

  // Arrays de contato (mesmo padrão do Google People)
  enderecos: z.array(EnderecoSchema).default([]),
  contatos: z.array(ContatoSchema).default([]),
  emails: z.array(EmailSchema).default([]),

  // Papéis opcionais — se o campo existe, a pessoa tem esse papel
  papelMembro: PapelMembroSchema.optional(),
  papelAluno: PapelAlunoSchema.optional(),

  // IDs externos (pra sync com Google e WhatsApp no futuro)
  googleContactId: z.string().optional(), // resourceName do People API
  whatsappId: z.string().optional(), // pra quando WPPConnect entrar

  // Tags livres — flexibilidade pro dia-a-dia da escola
  tags: z.array(z.string()).default([]),

  // Metadados do sistema
  observacoes: z.string().optional(),
  criadoEm: z.string().optional(), // ISO datetime — preenchido automaticamente
  atualizadoEm: z.string().optional(), // ISO datetime — preenchido automaticamente
  criadoPor: z.string().optional(), // UID do Firebase Auth
})

// ─────────────────────────────────────────────
// Tipos inferidos (usados em todo o app)
// ─────────────────────────────────────────────

export type Endereco = z.infer<typeof EnderecoSchema>
export type Contato = z.infer<typeof ContatoSchema>
export type Email = z.infer<typeof EmailSchema>
export type PapelMembro = z.infer<typeof PapelMembroSchema>
export type PapelAluno = z.infer<typeof PapelAlunoSchema>
export type Pessoa = z.infer<typeof PessoaSchema>
export type PessoaInput = z.input<typeof PessoaSchema>


// ─────────────────────────────────────────────
// Schemas de criação rápida (formulários simplificados)
// ─────────────────────────────────────────────

/**
 * Schema pra cadastro rápido — só nome e um contato.
 * Pra quando a recepção precisa registrar alguém em 10 segundos
 * (como faz hoje no Google Contatos).
 */
export const PessoaCriacaoRapidaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  telefone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  tags: z.array(z.string()).default([]),
})

export type PessoaCriacaoRapida = z.infer<typeof PessoaCriacaoRapidaSchema>

// ─────────────────────────────────────────────
// Funções utilitárias
// ─────────────────────────────────────────────

/** Verifica se a pessoa é membro (funcionário) da escola */
export function isMembro(pessoa: Pessoa): boolean {
  return !!pessoa.papelMembro
}

/** Verifica se a pessoa é aluno */
export function isAluno(pessoa: Pessoa): boolean {
  return !!pessoa.papelAluno
}

/** Retorna uma label legível dos papéis da pessoa */
export function getPapeisLabel(pessoa: Pessoa): string {
  const papeis: string[] = []
  if (pessoa.papelMembro) papeis.push(pessoa.papelMembro.cargo)
  if (pessoa.papelAluno) papeis.push("Aluno")
  return papeis.length > 0 ? papeis.join(" · ") : "Contato"
}

/** Retorna o contato principal (telefone ou email) */
export function getContatoPrincipal(pessoa: Pessoa): string {
  const tel = pessoa.contatos.find((c) => c.principal)?.valor
  if (tel) return tel
  const email = pessoa.emails.find((e) => e.principal)?.valor
  if (email) return email
  // Fallback: primeiro que encontrar
  return pessoa.contatos[0]?.valor ?? pessoa.emails[0]?.valor ?? "—"
}
