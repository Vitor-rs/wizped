// apps/web/src/stores/usePessoaStore.ts
// Store Zustand para a coleção "pessoas" no Firestore.
// Padrão: toda leitura/escrita passa por aqui → valida com Zod → persiste no Firestore → atualiza estado.

import { create } from "zustand"
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  getCountFromServer,
  type QueryDocumentSnapshot,
  type DocumentData,
  type WhereFilterOp,
} from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { PessoaSchema, type Pessoa, type PessoaInput } from "@/schemas/pessoas"

// ─────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────

const COLLECTION_NAME = "pessoas"
const PAGE_SIZE = 25

// ─────────────────────────────────────────────
// Tipos do Store
// ─────────────────────────────────────────────

/** Filtro genérico para queries no Firestore */
export type PessoaFilter = {
  field: string
  operator: WhereFilterOp
  value: unknown
}

type PessoaState = {
  // Dados
  pessoas: Pessoa[]
  pessoaSelecionada: Pessoa | null
  total: number

  // Paginação — cursor-based (padrão Firestore)
  lastDoc: QueryDocumentSnapshot<DocumentData> | null
  hasMore: boolean

  // UI state
  isLoading: boolean
  error: string | null
}

type PessoaActions = {
  // CRUD
  fetchPessoas: (
    filters?: PessoaFilter[],
    resetPagination?: boolean
  ) => Promise<void>
  fetchPessoaById: (id: string) => Promise<Pessoa | null>
  createPessoa: (
    data: Omit<PessoaInput, "id" | "criadoEm" | "atualizadoEm" | "criadoPor">
  ) => Promise<string>

  updatePessoa: (id: string, data: Partial<Pessoa>) => Promise<void>
  deletePessoa: (id: string) => Promise<void>

  // Seleção (pra formulários de edição, painel de detalhes, etc.)
  setPessoaSelecionada: (pessoa: Pessoa | null) => void

  // Limpeza
  clearError: () => void
  reset: () => void
}

// ─────────────────────────────────────────────
// Estado inicial (extraído pra poder reusar no reset)
// ─────────────────────────────────────────────

const initialState: PessoaState = {
  pessoas: [],
  pessoaSelecionada: null,
  total: 0,
  lastDoc: null,
  hasMore: true,
  isLoading: false,
  error: null,
}

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const usePessoaStore = create<PessoaState & PessoaActions>(
  (set, get) => ({
    ...initialState,

    /**
     * Busca pessoas com paginação cursor-based.
     *
     * Como funciona a paginação no Firestore (diferente de SQL):
     * - Não existe "OFFSET 50" — em vez disso, você guarda o último documento
     *   retornado e pede "me dê os próximos 25 DEPOIS deste documento".
     * - É como virar páginas de um livro: você não pula pra página 3 direto,
     *   você avança uma página por vez a partir de onde parou.
     *
     * @param filters - Array de filtros WHERE opcionais
     * @param resetPagination - true = começa do zero (primeira página)
     */
    fetchPessoas: async (filters = [], resetPagination = true) => {
      set({ isLoading: true, error: null })

      // Se é uma nova busca (troca de filtro, refresh), limpa o cursor
      if (resetPagination) {
        set({ pessoas: [], lastDoc: null, hasMore: true })
      }

      try {
        const collRef = collection(db, COLLECTION_NAME)

        // Monta a query peça por peça — como montar uma frase em inglês:
        // SELECT * FROM pessoas WHERE [filtros] ORDER BY nome LIMIT 25 AFTER [último]
        const constraints = []

        // Adiciona cada filtro WHERE
        for (const f of filters) {
          constraints.push(where(f.field, f.operator, f.value))
        }

        // Ordenação padrão: nome alfabético
        constraints.push(orderBy("nome"))

        // Paginação: se tem cursor, começa depois dele
        const { lastDoc } = get()
        if (!resetPagination && lastDoc) {
          constraints.push(startAfter(lastDoc))
        }

        // Limite de resultados por página
        constraints.push(limit(PAGE_SIZE))

        const q = query(collRef, ...constraints)
        const snapshot = await getDocs(q)

        // Converte os documentos Firestore em objetos Pessoa tipados
        const novasPessoas: Pessoa[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Pessoa[]

        // Conta o total (só na primeira página, pra não gastar leitura toda vez)
        let total = get().total
        if (resetPagination) {
          const countSnap = await getCountFromServer(
            collection(db, COLLECTION_NAME)
          )
          total = countSnap.data().count
        }

        set((state) => ({
          // Se é reset, substitui tudo; senão, concatena (infinite scroll)
          pessoas: resetPagination
            ? novasPessoas
            : [...state.pessoas, ...novasPessoas],
          lastDoc: snapshot.docs[snapshot.docs.length - 1] ?? null,
          hasMore: snapshot.docs.length === PAGE_SIZE,
          total,
          isLoading: false,
        }))
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao buscar pessoas"
        set({ error: message, isLoading: false })
      }
    },

    /**
     * Busca uma pessoa específica pelo ID do Firestore.
     * Útil pra abrir um painel de detalhes ou pré-popular um formulário de edição.
     */
    fetchPessoaById: async (id) => {
      set({ isLoading: true, error: null })

      try {
        const docSnap = await getDoc(doc(db, COLLECTION_NAME, id))

        if (!docSnap.exists()) {
          set({ isLoading: false })
          return null
        }

        const pessoa = { id: docSnap.id, ...docSnap.data() } as Pessoa
        set({ pessoaSelecionada: pessoa, isLoading: false })
        return pessoa
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao buscar pessoa"
        set({ error: message, isLoading: false })
        return null
      }
    },

    /**
     * Cria uma nova pessoa no Firestore.
     *
     * Fluxo:
     * 1. Preenche metadados automáticos (criadoEm, criadoPor)
     * 2. Valida com Zod (se os dados estão malformados, para aqui)
     * 3. Grava no Firestore
     * 4. Adiciona ao estado local (evita re-fetch desnecessário)
     *
     * @returns O ID do documento criado no Firestore
     */
    createPessoa: async (data) => {
      set({ isLoading: true, error: null })

      try {
        const agora = new Date().toISOString()
        const uid = auth.currentUser?.uid ?? "sistema"

        // Monta o documento completo com metadados
        const pessoaCompleta = {
          ...data,
          criadoEm: agora,
          atualizadoEm: agora,
          criadoPor: uid,
        }

        // Valida com Zod — se falhar, lança ZodError com detalhes dos campos
        const validated = PessoaSchema.parse(pessoaCompleta)

        // Remove o campo "id" antes de gravar (Firestore gera o próprio)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, ...paraGravar } = validated

        const docRef = await addDoc(collection(db, COLLECTION_NAME), paraGravar)

        // Atualiza o estado local: insere a pessoa nova no início da lista
        const pessoaCriada: Pessoa = { ...validated, id: docRef.id }
        set((state) => ({
          pessoas: [pessoaCriada, ...state.pessoas],
          total: state.total + 1,
          isLoading: false,
        }))

        return docRef.id
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao criar pessoa"
        set({ error: message, isLoading: false })
        throw err // Re-lança pro formulário poder tratar (ex: mostrar erros de validação)
      }
    },

    /**
     * Atualiza campos de uma pessoa existente.
     * Aceita Partial<Pessoa> — só manda os campos que mudaram.
     */
    updatePessoa: async (id, data) => {
      set({ isLoading: true, error: null })

      try {
        const atualizacao = {
          ...data,
          atualizadoEm: new Date().toISOString(),
        }

        // Valida parcialmente — PessoaSchema.partial() aceita qualquer subconjunto de campos
        PessoaSchema.partial().parse(atualizacao)

        await updateDoc(doc(db, COLLECTION_NAME, id), atualizacao)

        // Atualiza no estado local sem re-fetch
        set((state) => ({
          pessoas: state.pessoas.map((p) =>
            p.id === id ? { ...p, ...atualizacao } : p
          ),
          // Se a pessoa selecionada é esta, atualiza ela também
          pessoaSelecionada:
            state.pessoaSelecionada?.id === id
              ? { ...state.pessoaSelecionada, ...atualizacao }
              : state.pessoaSelecionada,
          isLoading: false,
        }))
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao atualizar pessoa"
        set({ error: message, isLoading: false })
        throw err
      }
    },

    /**
     * Remove uma pessoa do Firestore e do estado local.
     * ATENÇÃO: deleção permanente. No futuro, considerar soft-delete (campo "ativo").
     */
    deletePessoa: async (id) => {
      set({ isLoading: true, error: null })

      try {
        await deleteDoc(doc(db, COLLECTION_NAME, id))

        set((state) => ({
          pessoas: state.pessoas.filter((p) => p.id !== id),
          pessoaSelecionada:
            state.pessoaSelecionada?.id === id ? null : state.pessoaSelecionada,
          total: state.total - 1,
          isLoading: false,
        }))
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro ao deletar pessoa"
        set({ error: message, isLoading: false })
      }
    },

    setPessoaSelecionada: (pessoa) => set({ pessoaSelecionada: pessoa }),
    clearError: () => set({ error: null }),
    reset: () => set(initialState),
  })
)
