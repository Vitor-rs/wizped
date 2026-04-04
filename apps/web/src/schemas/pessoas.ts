// apps/web/src/schemas/pessoas.ts
// Schema Pessoa Única v2 — modelagem completa baseada nas telas do Sponteweb.
//
// Fontes:
// - 14 screenshots do Sponteweb (cadastro aluno, funcionário, cadastros gerais)
// - APIs Sponteweb REST V1, V2, BI
// - Documento de estrutura de materiais da Wizard
// - Schema v1 (Pessoa Única original com papéis opcionais)
//
// Princípios:
// - Dados da PESSOA ficam na raiz (compartilhados entre papéis)
// - Dados específicos ficam dentro do papel (papelAluno, papelMembro)
// - Lookup tables são referenciadas por string (valor do nome/descrição)
// - Todos os campos novos são opcionais (formulário progressivo)

import { z } from "zod"

// ═══════════════════════════════════════════════
// SCHEMAS AUXILIARES (blocos reutilizáveis)
// ═══════════════════════════════════════════════

/** Endereço — compatível com Google People API pra sync futuro */
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

/** Contato telefônico — tipos expandidos com base nas telas do Sponte */
export const ContatoSchema = z.object({
  tipo: z
    .enum(["celular", "fixo", "comercial", "whatsapp", "outro"])
    .default("celular"),
  valor: z.string().min(1, "Número é obrigatório"),
  principal: z.boolean().default(false),
  // Campo extra que o Sponte mostra na tela de Endereço/Comunicação do aluno
  operadora: z.string().optional(),
})

/** Email */
export const EmailSchema = z.object({
  tipo: z.enum(["pessoal", "institucional", "outro"]).default("pessoal"),
  valor: z.string().email("Email inválido"),
  principal: z.boolean().default(false),
})

/**
 * Documento anexo — referência a arquivo no Google Drive.
 * Aparece na aba "Anexos" tanto de aluno (imagem 1) quanto de funcionário (imagem 12).
 * O arquivo em si fica no Drive; aqui guardamos só o link e metadados.
 */
export const AnexoSchema = z.object({
  nome: z.string(),
  url: z.string().url(),
  tipo: z.string().optional(), // MIME type ou categoria (ex: "contrato", "documento", "foto")
  dataUpload: z.string().optional(), // ISO date
})

/**
 * Responsável embutido — modelo simplificado pra cadastro rápido.
 * Usado quando você quer registrar dados do responsável sem criar
 * um documento Pessoa separado. Pro cadastro rápido da recepção.
 */
export const ResponsavelEmbutidoSchema = z.object({
  nome: z.string(),
  telefone: z.string().optional(),
  email: z.string().email().optional(),
  parentesco: z.string().optional(), // "mãe", "pai", "avó", etc.
})

/**
 * Responsável vinculado — modelo relacional completo.
 * Referencia outra Pessoa na mesma coleção pelo ID do Firestore.
 * Baseado na tela de Responsáveis do Sponte (imagem 5), que mostra:
 * - Busca por nome/CPF (implica que é outra pessoa no sistema)
 * - Distinção entre Responsável Financeiro e Didático
 * - Vínculo com Empresa
 */
export const ResponsavelVinculadoSchema = z.object({
  pessoaId: z.string(), // ID do documento Pessoa no Firestore
  parentesco: z.string().optional(),
  tipoResponsabilidade: z
    .enum(["financeiro", "didatico", "ambos"])
    .default("ambos"),
})

// ═══════════════════════════════════════════════
// PAPEL: MEMBRO (funcionário da escola)
// ═══════════════════════════════════════════════

/**
 * Tabela de valores de pagamento por tipo de aula.
 * Aparece na aba "Dados Profissionais" do funcionário (imagem 11)
 * como uma mini-tabela editável com tipos e valores em R$.
 */
export const ValoresPagamentoSchema = z.object({
  aulaExterna: z.number().default(0),
  aulaInterna: z.number().default(0),
  horaAula: z.number().default(0),
  mensalista: z.number().default(0),
})

/**
 * PapelMembro — funcionário da escola.
 *
 * Estrutura baseada nas 5 abas do cadastro de Funcionário do Sponte:
 * - Dados do Funcionário (imagem 10): cargo, funções, dados gerais
 * - Endereço/Comunicação (imagem 13): compartilha com base Pessoa
 * - Dados Profissionais (imagem 11): pagamento, fiscal, admissão
 * - Financeiro: não capturado nas screenshots (fica pro futuro)
 * - Comissões: não capturado (fica pro futuro)
 * - Obs./Anexos (imagem 12): compartilha com base Pessoa
 */
export const PapelMembroSchema = z.object({
  ativo: z.boolean().default(true),

  // ── Dados do Funcionário (imagem 10) ──
  cargo: z.string().min(1, "Cargo é obrigatório"), // dropdown → lookup table futura
  departamento: z.string().optional(),

  // Funções operacionais — checkboxes independentes do cargo (imagem 10, parte inferior).
  // Uma pessoa pode ter múltiplas funções ativas simultaneamente.
  funcoes: z
    .object({
      professor: z.boolean().default(false),
      professorInteractive: z.boolean().default(false),
      atendenteComercial: z.boolean().default(false),
      gestorComercial: z.boolean().default(false),
      consultor: z.boolean().default(false),
    })
    .default({}),

  // Nível de acesso ao sistema — dropdown "Usuário" na imagem 10
  nivelAcesso: z.string().optional(),
  nDependentes: z.number().int().optional(),

  // ── Dados Profissionais (imagem 11) ──
  tipoPagamento: z.enum(["horista", "mensalista"]).optional(),
  valoresPagamento: ValoresPagamentoSchema.optional(),

  // Dados fiscais
  inss: z.string().optional(),
  percentualINSS: z.number().optional(),
  ccm: z.string().optional(),
  percentualISS: z.number().optional(),
  pis: z.string().optional(),
  carteiraProfissional: z.string().optional(),

  // Datas
  dataAdmissao: z.string().optional(), // ISO date
  dataDemissao: z.string().optional(),

  // Currículo — textarea na imagem 11
  curriculo: z.string().optional(),

  observacoes: z.string().optional(),
})

// ═══════════════════════════════════════════════
// PAPEL: ALUNO (estudante matriculado)
// ═══════════════════════════════════════════════

/**
 * PapelAluno — estudante da escola.
 *
 * Estrutura baseada nas 9 abas do cadastro de Aluno do Sponte:
 * - Dados do Aluno (imagem 2): dados essenciais, gerais, escola
 * - Endereço/Comunicação (imagem 3): compartilha com base Pessoa
 * - Dados Bancários: não capturado (fica pro futuro)
 * - Responsáveis (imagem 5): modelo relacional
 * - Interessado: não capturado (fica pro futuro — é o funil comercial)
 * - Observações (imagem 4): compartilha com base Pessoa + classificações
 * - Anexos (imagem 1): compartilha com base Pessoa
 * - Sincronização: específico Sponte, irrelevante pro Wizped
 * - Renegociações: não capturado (fica pro futuro)
 */
export const PapelAlunoSchema = z.object({
  ativo: z.boolean().default(true),

  // ── Dados Essenciais (imagem 2, seção superior) ──
  condicaoComercial: z.string().optional(), // dropdown → lookup table
  midia: z.string().optional(), // canal de captação (como conheceu a escola)
  condicaoCadastral: z
    .enum([
      "ativo",
      "inativo",
      "trancado",
      "formado",
      "transferido",
      "desistente",
    ])
    .default("ativo"),

  // ── Dados da Escola (imagem 2, seção inferior) ──
  matricula: z.string().optional(),
  livroAtual: z.string().optional(), // ex: "W4", "Teens 3", "Kids 2"
  turma: z.string().optional(), // ex: "T4-A", "SEG-QUA 18h"
  nivel: z.string().optional(), // ex: "Básico", "Intermediário"
  idioma: z.enum(["ingles", "espanhol", "outro"]).default("ingles"),

  // Credenciais do sistema de ensino (imagem 2, "Dados da Escola")
  usuarioTabCatchUp: z.string().optional(),
  senhaTabCatchUp: z.string().optional(),
  emailWizMe: z.string().optional(),

  // ── Flags e preferências ──
  transferidoOutraUnidade: z.boolean().default(false),
  permitirBiblioteca: z.boolean().default(false), // "Permitir empréstimo/reserva"
  desativarCadastro: z.boolean().default(false),

  // ── Preferências de comunicação (imagem 3, seção Contatos) ──
  // Quem recebe correspondência — o próprio aluno ou o responsável
  correspondencia: z.enum(["aluno", "responsavel"]).default("aluno"),
  contatoWhatsapp: z.string().optional(), // qual número usar pro WhatsApp

  // ── Datas ──
  dataMatricula: z.string().optional(), // ISO date
  dataCancelamento: z.string().optional(),

  // ── Motivos (referenciam lookup tables) ──
  motivoCancelamento: z.string().optional(),
  motivoDesistencia: z.string().optional(),
  motivoNaoFechamento: z.string().optional(),

  // ── Responsáveis ──
  // Modelo simples (embutido) — pra cadastro rápido
  responsavel: ResponsavelEmbutidoSchema.optional(),
  // Modelo completo (referências) — pra vinculação de Pessoas existentes
  responsaveisVinculados: z.array(ResponsavelVinculadoSchema).default([]),
  // Empresa vinculada ao aluno (imagem 5)
  empresa: z.string().optional(),

  // ── Classificações do sistema (imagem 4, painel direito) ──
  // Checkboxes definidos pelo Sponte — diferentes das tags livres
  classificacoes: z
    .object({
      evadidoWizardInteractive: z.boolean().default(false),
      funcionarioEAlunoWizard: z.boolean().default(false),
      inadimplente: z.boolean().default(false),
    })
    .default({}),

  observacoes: z.string().optional(),
})

// ═══════════════════════════════════════════════
// PESSOA (documento principal no Firestore)
// ═══════════════════════════════════════════════

/**
 * PessoaSchema — entidade raiz da coleção "pessoas".
 *
 * Campos base são compartilhados entre todos os papéis.
 * Tudo que aparece tanto no formulário de aluno quanto de funcionário
 * fica aqui, não dentro do papel. Exemplos: estadoCivil, nacionalidade,
 * escolaridade — são dados da pessoa, não do papel que ela exerce.
 *
 * Papéis são opcionais — presença indica que a pessoa exerce aquele papel.
 * Uma pessoa pode ter 0, 1 ou N papéis simultaneamente (caso Lívia).
 */
export const PessoaSchema = z.object({
  // ── Identificação Firestore ──
  id: z.string().optional(),

  // ── Dados pessoais base ──
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  nomeApelido: z.string().optional(), // "Nome/Apelido" do Sponte (imagem 10)
  cpf: z.string().optional(),
  rg: z.string().optional(),
  dataNascimento: z.string().optional(), // ISO date
  genero: z
    .enum(["masculino", "feminino", "outro", "nao_informado"])
    .default("nao_informado"),
  fotoUrl: z.string().url().optional(),

  // ── Dados gerais (imagens 2 e 10, seção "Dados Gerais") ──
  estadoCivil: z.string().optional(), // "Solteiro", "Casado", etc.
  nacionalidade: z.string().optional(),
  cidadeNatal: z.string().optional(), // aparece em ambos os formulários
  profissao: z.string().optional(),
  escolaridade: z.string().optional(), // dropdown → lookup table futura
  estrangeiro: z.boolean().default(false), // checkbox em ambos os formulários

  // ── Educação regular (imagem 2 — dados do aluno na escola regular) ──
  // Ficam na base porque descrevem a pessoa, não o papel.
  // Um funcionário que estuda também frequenta uma escola regular.
  escolaRegular: z.string().optional(), // qual escola (fundamental/médio) frequenta
  serieEscolar: z.string().optional(), // qual série

  // ── Arrays de contato (compatíveis com Google People API) ──
  enderecos: z.array(EnderecoSchema).default([]),
  contatos: z.array(ContatoSchema).default([]),
  emails: z.array(EmailSchema).default([]),

  // ── Preferências de comunicação ──
  naoReceberEmail: z.boolean().default(false),
  naoReceberSMS: z.boolean().default(false),

  // ── Documentos anexos (imagens 1 e 12) ──
  anexos: z.array(AnexoSchema).default([]),

  // ── Papéis opcionais ──
  papelMembro: PapelMembroSchema.optional(),
  papelAluno: PapelAlunoSchema.optional(),

  // ── IDs externos (pra sync com serviços externos) ──
  googleContactId: z.string().optional(),
  whatsappId: z.string().optional(),

  // ── Tags livres — flexibilidade pro dia-a-dia ──
  tags: z.array(z.string()).default([]),

  // ── Metadados do sistema ──
  observacoes: z.string().optional(),
  criadoEm: z.string().optional(),
  atualizadoEm: z.string().optional(),
  criadoPor: z.string().optional(),
})

// ═══════════════════════════════════════════════
// TIPOS INFERIDOS
// ═══════════════════════════════════════════════

export type Endereco = z.infer<typeof EnderecoSchema>
export type Contato = z.infer<typeof ContatoSchema>
export type Email = z.infer<typeof EmailSchema>
export type Anexo = z.infer<typeof AnexoSchema>
export type ResponsavelEmbutido = z.infer<typeof ResponsavelEmbutidoSchema>
export type ResponsavelVinculado = z.infer<typeof ResponsavelVinculadoSchema>
export type ValoresPagamento = z.infer<typeof ValoresPagamentoSchema>
export type PapelMembro = z.infer<typeof PapelMembroSchema>
export type PapelAluno = z.infer<typeof PapelAlunoSchema>
export type Pessoa = z.infer<typeof PessoaSchema>

// Tipo de entrada (aceita campos com defaults como opcionais)
export type PessoaInput = z.input<typeof PessoaSchema>

// ═══════════════════════════════════════════════
// SCHEMAS DE CRIAÇÃO RÁPIDA
// ═══════════════════════════════════════════════

/**
 * Cadastro rápido — só nome e um contato.
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

// ═══════════════════════════════════════════════
// SCHEMAS DE LOOKUP TABLES
// ═══════════════════════════════════════════════

/**
 * Schema genérico pra lookup tables.
 *
 * Baseado nas telas de Cadastros Gerais (imagens 6-8):
 * - Motivos de Cancelamento: só "Nome" (imagem 6)
 * - Motivos de Desistência: "Descrição" + "Ativo" (imagem 7)
 * - Motivos de Não Fechamento: "Descrição" + "Ativo" (imagem 8)
 *
 * O schema único acomoda os dois modelos (com e sem flag de ativo).
 */
export const LookupItemSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  ativo: z.boolean().default(true),
  ordem: z.number().int().optional(), // pra ordenação manual se necessário
})

export type LookupItem = z.infer<typeof LookupItemSchema>

/**
 * Enum dos tipos de lookup table disponíveis.
 * Cada tipo corresponde a uma coleção (ou subcoleção) no Firestore.
 * Baseado no menu de Cadastros Gerais do Sponte (imagem 6, sidebar esquerda).
 */
export const LOOKUP_TYPES = {
  // ── Didáticos ──
  cursos: "cursos",
  modalidadesTurmas: "modalidades_turmas",
  motivosCancelamento: "motivos_cancelamento",
  motivosDesistencia: "motivos_desistencia",
  motivosNaoFechamento: "motivos_nao_fechamento",
  salas: "salas",
  sistemasAvaliacao: "sistemas_avaliacao",
  templatesHorarios: "templates_horarios",
  tiposAtividadesExtras: "tipos_atividades_extras",
  tiposInteractive: "tipos_interactive",
  // ── Geral ──
  cargos: "cargos",
  escolaridades: "escolaridades",
  condicoesComerciais: "condicoes_comerciais",
  midias: "midias", // canais de captação
} as const

export type LookupType = (typeof LOOKUP_TYPES)[keyof typeof LOOKUP_TYPES]

// ═══════════════════════════════════════════════
// FUNÇÕES UTILITÁRIAS
// ═══════════════════════════════════════════════

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
  return pessoa.contatos[0]?.valor ?? pessoa.emails[0]?.valor ?? "—"
}

/** Retorna a condição cadastral formatada pro display */
export function getCondicaoLabel(pessoa: Pessoa): string {
  if (!pessoa.papelAluno) return "—"
  const mapa: Record<string, string> = {
    ativo: "Ativo",
    inativo: "Inativo",
    trancado: "Trancado",
    formado: "Formado",
    transferido: "Transferido",
    desistente: "Desistente",
  }
  return (
    mapa[pessoa.papelAluno.condicaoCadastral] ??
    pessoa.papelAluno.condicaoCadastral
  )
}

/** Lista as funções ativas de um membro (pra exibir em badges) */
export function getFuncoesAtivas(pessoa: Pessoa): string[] {
  if (!pessoa.papelMembro?.funcoes) return []
  const labels: Record<string, string> = {
    professor: "Professor",
    professorInteractive: "Prof. Interactive",
    atendenteComercial: "Atendente Comercial",
    gestorComercial: "Gestor Comercial",
    consultor: "Consultor",
  }
  return Object.entries(pessoa.papelMembro.funcoes)
    .filter(([, ativo]) => ativo)
    .map(([key]) => labels[key] ?? key)
}
