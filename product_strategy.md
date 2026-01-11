# 📘 Estratégia de Produto & Arquitetura: Viver da Palavra

> **Visão Macro:** Transformar a leitura bíblica passiva em uma experiência de estudo ativa, contextual e transformadora, utilizando UX moderna para reduzir a fricção cognitiva do entendimento teológico.

---

## 🧠 1. Estratégia de Produto & Público

### Personas
1.  **O Buscador Iniciante (The Seeker)**
    *   *Dores:* Sente-se perdido com a linguagem e o tamanho da Bíblia. Começa e para.
    *   *Desejo:* Quer entender "o que Deus quer me dizer hoje" sem precisar de um diploma em teologia.
2.  **O Cristão em Crescimento (The Deep Diver)**
    *   *Dores:* Já lê, mas sente que está "patinando". Quer contexto histórico e cultural, mas acha livros acadêmicos chatos.
    *   *Desejo:* Ferramentas visuais e profundidade ao alcance de um clique.
3.  **O Multiplicador (The Mentor)**
    *   *Dores:* Precisa de material organizado para ensinar células/pequenos grupos.
    *   *Desejo:* Resumos visuais e aplicações práticas prontas para compartilhar.

### Proposta de Valor (UVP)
**"Sua jornada guiada da leitura superficial à compreensão profunda das Escrituras."**

### Diferencial Competitivo
Enquanto o *YouVersion* foca em leitura e comunidade, e o *Logos* foca em teologia acadêmica pesada, o **Viver da Palavra** foca no **"Middle Ground" (Acessibilidade Profunda)**: UX de app de meditação (Calm/Headspace) aplicada ao estudo bíblico sério.

---

## 🎨 2. UX/UI & Design Fluído

### Estilo Visual: "Sanctuary Tech"
O design deve evocar a paz de um santuário com a clareza de uma ferramenta SaaS moderna.
*   **Limpeza Cognitiva:** Muito espaço em branco (respiro). O texto bíblico é o herói. Nada compete com ele.
*   **Paleta de Cores Refinada:**
    *   `Navy Blue (#1a2c4e)`: Profundidade, autoridade, infinito. (Cor primária).
    *   `Muted Gold (#d4af37)`: Divindade, valor, destaque. (Ações de conversão/Premium).
    *   `Parchment Cream (#fdfbf7)`: O fundo de leitura. Reduz a fadiga ocular (blue light) e remete ao papel.
    *   `Soft Slate (#64748b)`: Textos secundários.

### Tipografia
*   **Leitura (Bíblia/Devocional):** `Playfair Display` ou `Merriweather`. Serifada, alta legibilidade, traz peso histórico.
*   **Interface (UI/Menus):** `Inter`. Geométrica, funcional, moderna.

### Microinterações (Exemplos)
*   **Highlight Progressivo:** Ao passar o mouse num versículo, ele "acende" suavemente, focando a atenção.
*   **Conclusão de Leitura:** Não use "confetes" barulhentos. Use um brilho dourado sutil ou uma animação de "check" desenhado à mão (sensação de diário feito).

---

## 🧩 3. Arquitetura Front-end (React Scalable)

Para garantir escalabilidade e performance, não usaremos uma estrutura plana.

```
src/
├── app/                 # Configurações globais (rotas, providers)
├── components/          # UI Kit genérico (Button, Modal, Input) - O Design System
├── features/            # O CORAÇÃO DO APP (Modules)
│   ├── auth/            # Login, Registro, Recuperação
│   ├── reader/          # O leitor bíblico, seleção de versículos
│   ├── study/           # Lógica dos planos de estudo, progresso
│   └── dashboard/       # Visão geral do usuário
├── hooks/               # Hooks customizados globais
├── services/            # Conexão com Firebase/API
├── styles/              # Tokens CSS, temas
└── utils/               # Formatadores, validadores
```

### Stack Técnico
*   **Vite + React:** Performance de build.
*   **React Router Dom v6:** Roteamento.
*   **Firebase Auth + Firestore:** Backend as a Service (rápido e seguro).
*   **Zustand:** Gerenciamento de estado (mais leve e simples que Redux).
*   **PWA Ready:** Service Workers para leitura offline (crítico para apps de leitura).

---

## 📖 4. Funcionalidades-Chave

### 1. Leitura Contextual (The Anchor Feature)
Não apenas texto corrido. Antes de cada capítulo, um **"Briefing"**:
*   *Quem escreveu?*
*   *Para quem?*
*   *Qual o cenário?*
Isso elimina a confusão inicial.

### 2. Dicionário "Tap-to-Know"
O usuário clica em palavras-chave (ex: "Graça", "Justificação") e sobe um *drawer* (gaveta) inferior com o significado original (Grego/Hebraico) explicado de forma simples.

### 3. Método CPA (Contexto, Pergunta, Aplicação)
Ao final de uma seção, o app bloqueia o avanço até o usuário responder:
*   *O que eu aprendi sobre o caráter de Deus?*
*   *Como isso muda minha atitude hoje?*
(Isso gera o "diário espiritual").

---

## 📈 5. Gamificação & Engajamento Espiritual

*Cuidado: Não transformar a fé em pontos vazios.*

*   **Metáfora Visual:** "A Árvore da Vida".
    *   O progresso não é uma barra, é uma árvore que cresce conforme a constância.
    *   Ficou 3 dias sem ler? A árvore "seca" um pouco (muda de cor), incentivando o retorno suave.
*   **Streaks (Ofensiva):** "Dias consecutivos na Presença".
*   **Insight Share:** Botão fácil para gerar uma imagem bonita de um versículo + anotação do usuário para Instagram (Growth Loop orgânico).

---

## 💰 6. Conversão & Monetização

Modelo: **Freemium**.

### Free (O Pão Diário)
*   Acesso à Bíblia completa.
*   Plano de leitura básico (anual).
*   Devocional do dia.

### Premium (O Banquete - "Viver da Palavra PRO")
*   Contexto histórico profundo.
*   Dicionário Grego/Hebraico.
*   Mapas mentais ilimitados.
*   Áudio-livros/Estudos em áudio.

### Copywriting de Conversão
*   *Ruim:* "Assine para desbloquear."
*   *Bom:* "Deseja aprofundar suas raízes? Acesse o contexto completo deste capítulo."
*   *Modal de Venda:* "Você ama a Palavra. Invista no seu entendimento. Menos de R$ 0,50 por dia."

---

## 🧪 7. Roadmap de Evolução (Próximos Passos)

1.  **Fase 1 (Atual - MVP):** Landing Page + Auth + Leitor Básico (Texto apenas).
2.  **Fase 2 (Contexto):** Implementar o "Briefing" antes dos capítulos e o Dashboard do usuário.
3.  **Fase 3 (Engajamento):** Sistema de anotações e gamificação (versão 1).
4.  **Fase 4 (Monetização):** Gatear conteúdos profundos e lançar checkout.

---
**Status:** Documento criado em 10/01/2026.
**Approval:** Aguardando validação do Product Owner.
