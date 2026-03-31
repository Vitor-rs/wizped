# Estrutura dos Materiais Didáticos da Wizard by Pearson

> **Documento gerado a partir de relato oral de Vitor Santos**
> Professor de Inglês e Espanhol — Wizard by Pearson (desde 2013)
> Data de elaboração: Março/2026

---

## 1. Visão Geral e Propósito

Este documento organiza e estrutura todas as informações sobre o ecossistema de materiais didáticos da Wizard by Pearson, com foco nos livros de inglês (carro-chefe da franquia), mas também abrangendo os demais idiomas.

O propósito deste levantamento é servir de base para a **definição de um esquema de banco de dados NoSQL** que represente toda a estrutura de livros de forma modular, dinâmica e preparada para o futuro (*future-proof*). Essa estrutura precisa ser flexível o suficiente para acomodar novas edições (vinculadas ao ano de lançamento, ex.: edição 2025, 2027), mudanças de conteúdo e conexões entre lições de diferentes livros.

### 1.1. Visão de Futuro

Além do esquema NoSQL, estão planejados para o futuro:

- **Grafo de similaridade temática** no estilo Obsidian, conectando lições de diferentes livros por conteúdo, objetivos e tags/palavras-chave, independente de categoria (criança, adolescente ou adulto).
- **Classificação por tags** de cada lição, vinculando-as aos seus objetivos de aprendizado e conteúdo programático, permitindo identificar onde determinado tópico gramatical (ex.: Simple Past) aparece ao longo dos livros.
- **Sistema de gestão de estoque** que diferencie unidades avulsas e kits completos.

---

## 2. Idiomas e Padrão Estrutural Geral

A Wizard ensina vários idiomas, e todos seguem o mesmo padrão metodológico: são sequenciais e logicamente distribuídos. Porém, o inglês tem uma gama de livros significativamente maior que os demais.

### 2.1. Idiomas com Estrutura Reduzida

Espanhol, italiano, chinês, francês e demais idiomas (exceto inglês) possuem **três livros cada**, numerados por pares (ex.: Español 2, Español 4, Español 6). Todos seguem a mesma estrutura:

| Elemento | Descrição |
|---|---|
| **Lições por capítulo** | 6 lições (3 ímpares/input + 3 pares/output) + 1 revisão = 7 por capítulo |
| **Total de capítulos** | 10 capítulos por livro |
| **Total de lições** | 60 lições normais + 10 revisões = 70 lições por livro |
| **Sequência entre livros** | Sequencial. Ex.: Español 2 termina na lição 60; Español 4 começa na 61 e vai até a 120; Español 6, da 121 à 180 |

### 2.2. Tipos de Lição (Padrão Geral — Todos os Idiomas)

| Tipo | Nome Alternativo | Natureza | Descrição |
|---|---|---|---|
| **Input** | Ímpar | Conteúdo novo | Introdução de gramática, vocabulário e conteúdo. Menos interação, mais absorção |
| **Output** | Par | Externalização | O aluno pratica o que aprendeu com maior interação (professor–aluno, aluno–aluno) |
| **Review** | Revisão | Consolidação | Finaliza o capítulo/bloco, revisando o conteúdo das lições anteriores |

### 2.3. Duração de Contrato

Cada livro tem duração de **1 ano de contrato**, independente da data de início. Se um aluno começa em 30/01/2026, deve finalizar até 30/01/2027. O aluno pode iniciar em qualquer data e segue seu próprio ritmo.

### 2.4. Habilidades Trabalhadas — Metodologia FALE

A Wizard trabalha quatro habilidades, sintetizadas na sigla **FALE**:

| Sigla | Habilidade | Onde é mais praticada |
|---|---|---|
| **F** | Fala (Speaking) | Em sala de aula |
| **A** | Audição (Listening) | Em sala de aula |
| **L** | Leitura (Reading) | Em sala de aula |
| **E** | Escrita (Writing) | Em casa (tarefa/homework), mas também em lições pares |

---

## 3. Estrutura dos Livros de Inglês

O inglês é o carro-chefe da Wizard e possui uma árvore de livros muito mais extensa, dividida em **três grandes categorias por faixa etária**, que por sua vez contêm **grupos** de livros.

### 3.1. Mapa Geral das Categorias e Grupos

```
WIZARD — INGLÊS
│
├── CATEGORIA: WIZ KIDS (Crianças)
│   ├── Grupo Tots ........... Tots 2 → Tots 4 → Tots 6
│   ├── Grupo Little Kids ... Little Kids 2 → Little Kids 4
│   └── Grupo Kids .......... Kids 2 → Kids 4 → Pre-Teens (substitui Next Generation)
│
├── CATEGORIA: TEENS (Adolescentes)
│   └── Teens 2 → Teens 4 → Teens 6 → Teens 8
│
└── CATEGORIA: W (Adultos / Adolescentes avançados)
    └── W2 → W4 → W6 → W8 → W10 → W12
```

### 3.2. Equivalência Teens ↔ W

Os livros Teens e W possuem uma correspondência direta de conteúdo. Um aluno que completa todos os Teens **não precisa** refazer os livros correspondentes nos Ws:

| Teens | Equivale a | Próximo passo após completar todos os Teens |
|---|---|---|
| Teens 2 | W2 | — |
| Teens 4 | W4 | — |
| Teens 6 | W6 | — |
| Teens 8 | W8 | Segue direto para **W10** e depois **W12** |

---

## 4. Estrutura Detalhada por Grupo

### 4.1. Grupo Tots (Tots 2, Tots 4, Tots 6)

Faixa etária indicada: **3 a 6 anos** (aproximadamente).

Características especiais dos Tots: não possuem Workbook (livro integrado único), pois crianças nessa idade não têm maturidade para tarefas de casa por conta da fase de alfabetização. Usam a **Wiz.pen** (caneta falante) como ferramenta de apoio, sem acesso ao Wiz.me.

#### Tots 2

| Elemento | Detalhe |
|---|---|
| **Lição inicial** | Welcome Lesson + Classroom Talk (2 lições introdutórias) |
| **Capítulos** | 6 blocos |
| **Lições por bloco** | 5 ímpares + 5 pares + 1 revisão = 11 lições |
| **Lições dos blocos** | 6 × 11 = 66 lições |
| **Remind Lessons** | 4 (não vinculadas a capítulos; usadas em datas de eventos — Páscoa, piquenique etc.) |
| **Total de lições** | 2 (iniciais) + 66 (blocos) + 4 (remind) = **72 lições** |
| **Numeração** | Lição 1 até lição 60 (+ revisões e especiais) |

#### Tots 4

| Elemento | Detalhe |
|---|---|
| **Lição inicial** | Welcome Back Lesson (1 lição) |
| **Capítulos** | 6 blocos (mesma estrutura: 5 ímpares + 5 pares + 1 revisão = 11) |
| **Remind Lessons** | 4 |
| **Total de lições** | 1 + 66 + 4 = **71 lições** |
| **Numeração** | Sequencial: começa na lição **61**, termina na **120** |

#### Tots 6

| Elemento | Detalhe |
|---|---|
| **Lição inicial** | Welcome Back Lesson (1 lição) |
| **Estrutura** | Idêntica ao Tots 4 |
| **Total de lições** | **71 lições** |
| **Numeração** | Sequencial: começa na lição **121**, termina na **180** |
| **Remind Lessons** | 4 |

### 4.2. Grupo Little Kids (Little Kids 2, Little Kids 4)

Sequência natural para quem vem dos Tots, mas também aceita **alunos de primeira viagem** na idade correspondente.

#### Little Kids 2

| Elemento | Detalhe |
|---|---|
| **Lição inicial** | Welcome Lesson (aula 0) |
| **Estrutura** | Idêntica ao Tots 4/Tots 6 (6 blocos × 11 lições + 4 remind) |
| **Total de lições** | **71 lições** |
| **Numeração** | Começa na lição **1** (reinicia a contagem) |
| **Tipo** | Livro de transição e de primeira viagem |

#### Little Kids 4

| Elemento | Detalhe |
|---|---|
| **Estrutura** | Idêntica ao Little Kids 2 (e ao Tots 6) |
| **Total de lições** | **71 lições** |
| **Numeração** | Sequencial a partir do Little Kids 2 |

**Observação importante:** a partir do Little Kids, os livros passam a ter **Student Book + Workbook** (tarefa de casa separada). Essa regra vale para todos os livros daqui em diante.

### 4.3. Grupo Kids (Kids 2, Kids 4, Pre-Teens)

A partir do grupo Kids, a **estrutura de capítulos muda**: cada bloco passa a ter **6 lições + 1 revisão = 7 lições** (em vez de 11), com **10 capítulos por livro**. Essa estrutura se mantém para todos os livros subsequentes (Teens e Ws).

#### Kids 2

| Elemento | Detalhe |
|---|---|
| **Lição inicial** | Welcome Lesson |
| **Capítulos** | 10 blocos |
| **Lições por bloco** | 3 ímpares + 3 pares + 1 revisão = 7 lições |
| **Lições dos blocos** | 10 × 7 = 70 lições |
| **Remind Lessons** | Não possui |
| **Total de lições** | 1 (Welcome) + 70 = **71 lições** |
| **Numeração** | Começa na lição **1** |
| **Tipo** | Livro de transição e de primeira viagem |
| **Wiz.me** | Disponível a partir deste livro |

#### Kids 4

| Elemento | Detalhe |
|---|---|
| **Estrutura** | Idêntica ao Kids 2 |
| **Total de lições** | **71 lições** |
| **Numeração** | Começa na lição **1** (não sequencial) |
| **Tipo** | Transição e primeira viagem (mesma regra do Kids 2) |

#### Pre-Teens (substitui o Next Generation / "K6")

| Elemento | Detalhe |
|---|---|
| **Estrutura** | Idêntica ao Kids 2 e Kids 4 |
| **Total de lições** | **71 lições** |
| **Numeração** | Começa na lição **1** |
| **Tipo** | Transição e primeira viagem |
| **Nota** | Substitui o Next Generation (NG), que era uma edição antiga. O Pre-Teens acompanha a modernização dos Kids 2 e Kids 4 (3rd Edition). O NG ainda está sendo usado enquanto houver alunos ativos nele (previsão de ~8 meses para encerramento do estoque) |

### 4.4. Categoria Teens (Teens 2, 4, 6, 8)

Todos os livros Teens seguem **exatamente a mesma estrutura** do Kids 2/K4/Pre-Teens: 10 blocos de 7 lições (6 + revisão), totalizando 71 lições cada (incluindo a lição especial inicial).

| Livro | Lição Inicial | Total | Numeração |
|---|---|---|---|
| **Teens 2** | Useful Language (expressões do dia a dia) | 71 | Começa na lição 1 |
| **Teens 4** | Welcome Back Lesson | 71 | Sequencial |
| **Teens 6** | Welcome Back Lesson | 71 | Sequencial |
| **Teens 8** | Welcome Back Lesson | 71 | Sequencial |

**Teens Days (Wizteens Days):** além das lições regulares, os Teens possuem **4 aulas especiais** de Wizteens Day por livro (eventos temáticos).

### 4.5. Categoria W (W2, W4, W6, W8, W10, W12)

Exatamente a mesma estrutura da categoria Teens. Todos possuem 10 blocos, 71 lições, e a mesma distribuição de input/output/review.

| Livro | Lição Inicial | Carga Horária | Observações |
|---|---|---|---|
| **W2** | Welcome Lesson | 70h + Welcome | — |
| **W4** | Welcome Lesson | 70h + Welcome + 1 Class Preparation | Class Preparation antes da lição 79 |
| **W6** | Welcome Lesson | 71h + Welcome | Lição 121 planejada para durar 2 horas |
| **W8** | Welcome Lesson | 71h | — |
| **W10** | Zero Class | 71h | Wiz.pen opcional a partir daqui |
| **W12** | Zero Class | 71h | Wiz.pen opcional; último livro da Wizard |

---

## 5. Taxonomia dos Tipos de Lição

A **unidade atômica** de um livro é a lição. Toda lição deve possuir um **tipo** definido. Abaixo, a classificação completa:

### 5.1. Lições Especiais (não fazem parte da estrutura padrão de capítulos)

| Tipo | Função | Onde aparece |
|---|---|---|
| **Welcome Lesson** | Introdução ao idioma, familiarização com o ambiente. Pais podem estar envolvidos | Primeiro livro de cada grupo/categoria |
| **Classroom Talk** | Segunda lição introdutória (familiarização com o ambiente de sala) | Tots 2 (junto com Welcome Lesson) |
| **Welcome Back Lesson** | Reintrodução para alunos que continuam do livro anterior | Livros de sequência (Tots 4, Tots 6, Teens 4, 6, 8 etc.) |
| **Useful Language** | Expressões do dia a dia (bom dia, boa tarde, com licença) | Teens 2 |
| **Zero Class** | Aula introdutória | W10 e W12 |
| **Class Preparation** | Preparação para uma lição específica | W4 (antes da lição 79) |
| **Remind / Recall Lesson** | Lições temáticas para eventos (Páscoa, piquenique etc.), sugeridas pela franqueadora | Tots 2, 4, 6, Little Kids 2, 4 (4 por livro) |
| **Wizkids Days / Wizteens Days** | Aulas especiais temáticas/eventos | Kids e Teens (4 por livro) |

### 5.2. Lições Regulares (estrutura padrão dos capítulos)

| Tipo | Nome Alternativo | Características |
|---|---|---|
| **Input** | Ímpar | Estrutura mais fixa (~95% consistente entre livros). Foco em absorção de conteúdo: objetivos de aprendizado, gramática, palavras-chave. Menor interação |
| **Output** | Par | Maior variedade de atividades entre lições. As 3 lições pares de um mesmo capítulo são diferentes entre si. Foco em interação e externalização |
| **Review** | Revisão | Consolida o capítulo. Serve como ponto de referência para contar quantos capítulos o livro tem |

**Todas as lições**, sem exceção, possuem objetivos de aprendizado e conteúdo programático. Todas possuem tarefa (homework).

---

## 6. Composição dos Kits e Materiais

### 6.1. Kit do Estudante

| Grupo | Student Book | Workbook | Wiz.pen | Wiz.me |
|---|---|---|---|---|
| **Tots** | Livro integrado único | Não possui | Sim (obrigatória) | Não |
| **Little Kids** | Sim | Sim | Sim (obrigatória) | Não |
| **Kids** | Sim | Sim (input) | Sim | Sim (a partir do K2) |
| **Teens** | Sim | Sim (input) | Sim | Sim |
| **W2 a W8** | Sim | Sim (input) | Sim | Sim |
| **W10 e W12** | Sim | Sim (input) | Opcional | Sim |

### 6.2. Kit do Professor

O Kit do Professor inclui o **Teacher's Guide** com as páginas do Student's Book intercaladas com instruções detalhadas para cada aula, tecnologia Wiz.pen, Workbook com gabarito e, em alguns livros, o Kit de Realia (materiais concretos de apoio).

### 6.3. Materiais Acessórios e Vinculados

Os livros possuem materiais complementares que são vinculados a lições específicas (geralmente pares ou ímpares): panfletos, material didático extra e ferramentas externas. Esses materiais são **modulares** — coleções diferentes que se unem ao livro principal, como peças encaixáveis.

### 6.4. Ferramentas Tecnológicas

| Ferramenta | Descrição | Disponível para |
|---|---|---|
| **Wiz.pen** | Caneta falante que interage com o material impresso, reproduzindo áudios | Todos os livros (opcional no W10/W12) |
| **Wiz.me** | Aplicativo de celular com atividades interativas, Card Homework, Speaking Practice, Recording etc. | Kids 2 em diante (crianças que já têm cognição e maturidade para usar um app) |
| **Wiz.tab** | Tablet interativo usado em sala de aula com tasks, áudios e atividades | Livros mais recentes (W6, W8, T4, T6, T8 etc.) |

---

## 7. Checking Sentences

As **Checking Sentences** (frases de verificação) são um elemento metodológico central da Wizard, vinculado a **todas as lições** de todos os livros.

### 7.1. O que são

São frases enxutas sobre o conteúdo de fala da lição, usadas pelo professor durante o **Teacher Support** ao final de cada aula. O professor repete uma frase em inglês e o aluno reproduz, seguindo a metodologia. Quando o professor fala em português, o aluno deve traduzir — a dinâmica varia conforme o nível.

### 7.2. Estrutura

Cada livro possui um arquivo PDF de Checking Sentences vinculado, que contém técnicas, procedimentos e as frases organizadas por lição. A estrutura de um Checking Sentences inclui seções como: Verbos – Conjugação, Vocabulário – Frases, Expressões, Gramática, e atividades direcionadas (Diálogo, Juego de rol, etc.).

A estrutura base é consistente, mas **pode variar** entre livros e edições, sendo flexível o suficiente para mudanças futuras. Cada Checking Sentences é um **documento modular**, vinculado à lição mas independente do livro em si.

---

## 8. Escalas de Proficiência: GSE e CEFR

Todos os livros da Wizard seguem métricas internacionais de medição de proficiência em idiomas.

### 8.1. Definições

| Escala | Nome Completo | Faixa |
|---|---|---|
| **GSE** | Global Scale of English (Pearson) | 10 a 90 pontos |
| **CEFR** | Common European Framework of Reference for Languages | <A1 até C2 |

A GSE é uma escala granular desenvolvida pela Pearson que se baseia no CEFR e permite mapear o desenvolvimento do estudante desde o início até o final da jornada no idioma. A equipe editorial utiliza um documento chamado **Scope and Sequence** (disponível no Teacher's Guide) para distribuir os objetivos de aprendizado por bloco, com base na GSE.

### 8.2. Mapeamento GSE/CEFR por Livro

```
GSE:  10───20───30───40───50───60───70───80───90
CEFR: <A1    A1    A2    B1    B2    C1    C2
              +           +           +
```

| Livro | GSE Início | GSE Fim | CEFR Início | CEFR Fim |
|---|---|---|---|---|
| **Kids 2 (3rd Ed)** | 10 | 29 | <A1 | A1 |
| **Teens 4 (3rd Ed)** | 30 | 42 | A1+ | A2 |
| **Teens 6 (3rd Ed)** | 43 | 56 | B1 | B1+ |
| **W2** | 10 | 26–29 | <A1 | A1 |
| **W4** | 30 | 42–43 | A2 | A2+ |
| **W6** | 42 | 55 | A2+ | B1 |
| **W8** | 55 | 64 | B1+ | B2 |
| **W10** | 59 | 71 | B2 | B2+ |
| **W12** | 76 | 84 | B2+ | C1 |

### 8.3. Caso Especial: Crianças

Todos os livros da categoria Kids (Tots, Little Kids, Kids) estão no nível **A1**, porém com **subníveis estendidos** para acomodar as limitações cognitivas naturais da idade. Uma criança no Tots 6 não pode ser medida como B1, pois ainda não tem cognição de fala plena. Esses subníveis dentro do A1 ainda necessitam de documentação mais detalhada sobre onde estão registrados oficialmente.

A medição mais precisa pela GSE/CEFR começa a ser viável a partir do **Teens 2**.

---

## 9. Regras de Matrícula e Nivelamento

### 9.1. Faixa Etária e Exceções

Cada livro possui uma **idade mínima e máxima** recomendada, mas exceções ocorrem com frequência:

| Situação | Exemplo |
|---|---|
| Aluno avançado para a idade | Criança de 10 anos pode pular para o Teens 2 em vez do Pre-Teens |
| Aluno de 13 anos com bom nível | Pode iniciar direto no W2 em vez do Teens 2 |
| Aluno de 15 anos com capacidade cognitiva limitada | Pode precisar começar no Teens 2 mesmo sendo da faixa etária do W |

A decisão é tomada com base no histórico do aluno, teste de nivelamento (placement test) e avaliação do professor. Essas regras são configuradas dinamicamente no sistema da Wizard.

### 9.2. Livros de Entrada (Primeira Viagem)

Alguns livros servem tanto como continuação de sequência quanto como ponto de entrada para alunos novos:

| Livro | Aceita primeira viagem? | Aceita continuação? |
|---|---|---|
| **Tots 2** | Sim | — |
| **Little Kids 2** | Sim | Sim (vindo dos Tots) |
| **Kids 2** | Sim | Sim (vindo dos Little Kids) |
| **Kids 4** | Sim | Sim (vindo do Kids 2) |
| **Pre-Teens** | Sim | Sim (vindo do Kids 4) |
| **Teens 2** | Sim | Sim (vindo do Pre-Teens/NG) |
| **W2** | Sim | Sim |

---

## 10. Estrutura das Seções Internas de uma Lição

Cada tipo de lição possui seções internas que compõem a aula. A estrutura varia ~5% entre livros, mas segue um padrão consolidado.

### 10.1. Input Lessons (Ímpares) — Seções Típicas

| Seção | Descrição |
|---|---|
| **Spread Page** | Página de abertura do bloco com objetivos de aprendizagem para marcar conforme progresso |
| **Verbs / Grammar** | Apresentação de conteúdo gramatical novo dentro da metodologia |
| **New Words** | Vocabulário apresentado via cards com suporte visual e áudio |
| **Useful Phrases** | Frases de uso prático, com atenção aos itens em negrito |
| **Language Functions** | Leitura de frases em inglês com orientação do áudio |
| **Language Practice** | Reprodução de frases com substituição de vocabulário |
| **Real Life** | Texto com contexto real; leitura, perguntas e verificação de respostas |
| **Check it Out!** | Reforço e complemento do conteúdo; imagem vinculada ao Workbook |
| **Learning Objectives** | Retorno à Spread Page para marcar objetivos atingidos |
| **Homework Instructions** | Instruções para tarefa de casa (Workbook) |
| **Teacher Support** | Atendimento final: Checking Sentences, dúvidas, objetivos |

**Tasks das Input Lessons** (atividades interativas variadas): Maze, Read and Match, Match the Sentences, Match, Text Pages Scrambled, Text Dialogue Drag and Drop, Image Phrase Type, Choose the Correct Answer, Put the Words in Order, Listen and Choose.

### 10.2. Output Lessons (Pares) — Seções Típicas

As Output Lessons são compostas de atividades variáveis (as 3 primeiras mudam entre lições) e uma atividade fixa no final. Exemplos de atividades:

| Atividade | Descrição |
|---|---|
| **Ask and Answer** | Observar imagem, ouvir modelo, montar e responder perguntas |
| **Complete the Sentences** | Descrever imagem e completar frases com base no modelo |
| **Listen and Answer** | Ouvir diálogo/texto, assinalar respostas, conferir com áudio |
| **Describing the Picture** | Escrever uma história sobre uma imagem e contá-la a outro aluno |
| **What's the Definition?** | Descobrir significado de palavras pelo contexto do diálogo |
| **Focus Listening** | Escuta atenta com foco em informações específicas |
| **Pronunciation and Intonation** | Prática de pronúncia com foco em partes destacadas |
| **There and Around** | Atividade fixa, desenvolvida ao longo das 3 Output Lessons do bloco. Envolve Realia Pictures, gravação de voz (Recording no Wiz.me) e construção de speech |

### 10.3. Review Lessons

As aulas de Review consolidam o conteúdo do bloco e incluem atividades de homework no Workbook que integram estrutura, escrita e audição (ex.: Which Sentence Means...?, Listen and Take Notes, Write Your Answer, Choose The Correct Option).

No Wiz.me, o final do bloco gera o card **Let's Check!**, que é um card extra adaptativo baseado nos acertos e erros do estudante ao longo das atividades do Card Homework.

---

## 11. Resumo Comparativo: Estrutura de Todos os Livros de Inglês

### 11.1. Grupo Tots e Little Kids (blocos de 11 lições)

| Livro | Lição Inicial | Blocos | Lições/Bloco | Remind | Total | Numeração Inicial |
|---|---|---|---|---|---|---|
| Tots 2 | Welcome + Classroom Talk | 6 | 11 | 4 | 72 | 1 |
| Tots 4 | Welcome Back | 6 | 11 | 4 | 71 | 61 |
| Tots 6 | Welcome Back | 6 | 11 | 4 | 71 | 121 |
| Little Kids 2 | Welcome | 6 | 11 | 4 | 71 | 1 |
| Little Kids 4 | Welcome Back | 6 | 11 | 4 | 71 | Sequencial |

### 11.2. Kids, Teens e Ws (blocos de 7 lições)

| Livro | Lição Inicial | Blocos | Lições/Bloco | Especiais | Total | Numeração |
|---|---|---|---|---|---|---|
| Kids 2 | Welcome | 10 | 7 | 4 Wizkids Days | 71 + extras | 1 |
| Kids 4 | Welcome | 10 | 7 | 4 Wizkids Days | 71 + extras | 1 |
| Pre-Teens | Welcome | 10 | 7 | — | 71 | 1 |
| Teens 2 | Useful Language | 10 | 7 | 4 Wizteens Days | 71 + extras | 1 |
| Teens 4 | Welcome Back | 10 | 7 | 4 Wizteens Days | 71 + extras | Sequencial |
| Teens 6 | Welcome Back | 10 | 7 | 4 Wizteens Days | 71 + extras | Sequencial |
| Teens 8 | Welcome Back | 10 | 7 | 4 Wizteens Days | 71 + extras | Sequencial |
| W2 | Welcome | 10 | 7 | — | 71 | 1 |
| W4 | Welcome | 10 | 7 | 1 Class Prep | 71 + 1 | 1 |
| W6 | Welcome | 10 | 7 | — | 71 | Sequencial |
| W8 | Welcome | 10 | 7 | — | 71 | Sequencial |
| W10 | Zero Class | 10 | 7 | — | 71 | Sequencial |
| W12 | Zero Class | 10 | 7 | — | 71 | Sequencial |

---

## 12. Considerações para o Esquema NoSQL

Com base em tudo que foi documentado, a modelagem do banco de dados deve considerar os seguintes princípios:

### 12.1. A Lição como Unidade Atômica

Cada lição é um **documento independente** no banco, contendo: tipo, índice sequencial (para cálculo de hora-aula), objetivos de aprendizado, conteúdo programático, gramática trabalhada, palavras-chave/tags e vinculação ao livro/bloco.

### 12.2. Modularidade como Princípio

Todos os componentes (livro, lição, checking sentences, materiais acessórios, kit) são **coleções separadas que se conectam** — como peças de LEGO. Nenhum componente deve ser rigidamente acoplado ao outro, permitindo substituições e atualizações independentes.

### 12.3. Índice Universal

A primeira lição de qualquer livro (seja Welcome Lesson, aula 0, ou qualquer especial) recebe **índice 1** para fins de cálculo de hora-aula. Isso é fundamental para manter a contagem consistente.

### 12.4. Edições como Versionamento

As edições são vinculadas ao ano de lançamento (ex.: 3rd Edition, edição 2025, edição 2027) e devem ser tratadas como versões do mesmo livro-base, permitindo que múltiplas edições coexistam durante períodos de transição (como o caso atual do Next Generation → Pre-Teens).

### 12.5. Flexibilidade Estrutural

A estrutura de lições (quantidade por bloco, tipos de atividades, seções internas) deve ser **configurável**, não hardcoded. Um livro futuro pode ter mais ou menos lições por bloco, e o esquema precisa acomodar isso sem quebra.

---

## 13. Pontos em Aberto

| Item | Status | Nota |
|---|---|---|
| Subníveis do A1 para crianças (GSE/CEFR estendido) | Pendente de localização | Onde está documentado o subnivelamento? |
| Regras exatas de faixa etária por livro | Configurável no sistema | Muda dinamicamente; precisa de consulta à Wizard |
| Estrutura detalhada do Checking Sentences por livro | Parcialmente documentada | PDFs disponíveis para ESP2, ESP4, W6 |
| Mapeamento completo de atividades por tipo de lição e livro | Parcialmente documentado | Guias do material didático cobrem parcialmente |
| Estrutura dos livros Business Empire | A ser explorada | Existem guias para BE2 e BE4 na base |
| GSE/CEFR dos Teens 2 e Teens 8 | A ser confirmado | Dados dos guias disponíveis parcialmente |

---

*Documento elaborado com base na transcrição de áudio e nos Guias do Material Didático disponíveis na base de conhecimento do projeto.*
