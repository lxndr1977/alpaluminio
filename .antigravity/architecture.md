# Arquitetura de Componentes da Landing Page

Este documento descreve a arquitetura de componentes proposta para a landing page, utilizando Astro JS para a estrutura, Tailwind CSS para estilização e JavaScript puro para interatividade. Cada seção da landing page será implementada como um componente Astro, permitindo modularidade e reusabilidade.

## Estrutura Geral

A landing page será composta por um layout principal (`Layout.astro`) que incluirá o cabeçalho, rodapé e renderizará dinamicamente as seções de conteúdo. Cada seção será um componente Astro independente, recebendo dados via `props`.


### Componentes Globais

#### NavHeader.astro
*   **Estrutura (Desktop):**
    *   **Layout:** Flexbox com `justify-between` e `items-center`.
    *   **Esquerda:** Logo da empresa (link para home).
    *   **Centro:** Menu de navegação horizontal com links para as seções principais.
    *   **Direita:** Botão de CTA (WhatsApp) utilizando o componente `Button.astro` (variante primary).
*   **Estrutura (Mobile):**
    *   **Layout:** Logo à esquerda e ícone de Menu Hambúrguer à direita.
    *   **Menu Drawer:** 
        *   **Posicionamento:** Renderizado como um elemento independente (`fixed`) fora da tag `<header>` para evitar limitações de contexto de empilhamento (stacking context) e garantir que cubra a tela corretamente mesmo com animações no header.
        *   **Conteúdo:** Exibe os links de navegação em lista vertical e o botão de CTA (WhatsApp) em destaque no final da lista.
*   **Comportamento (Sticky/Hide):**
    *   O Header deve ser `fixed` no topo com `z-index: 50`.
    *   O Menu Drawer deve ter `z-index: [9999]` para sobrepor todos os elementos da página.
    *   **Interatividade (JS Puro):** 
        *   Implementar lógica de "Scroll Direction":
            *   **Ao rolar para baixo:** O Header deve subir (`translate-y-[-100%]`) para liberar espaço visual.
            *   **Ao rolar para cima:** O Header deve reaparecer (`translate-y-0`).
        *   **Toggle do Menu:** Utilizar `classList.toggle` para alternar as classes `translate-x-full` e `translate-x-0` do Tailwind v4 (que operam sobre a propriedade CSS `translate`), evitando conflitos com manipulações diretas de `transform`.
*   **Estilo Visual:**
    *   **Fundo:** Branco (`bg-white/90`) com `backdrop-blur-md` para efeito de vidro.
    *   **Borda:** Borda inferior sutil (`border-b border-gray-100`).
    *   **Altura:** Altura fixa de `64px` (h-16).
    *   **Tipografia:** Links do menu usando `font-sans`, `text-sm`, `font-medium` e `text-dark`.

#### Footer.astro
*   **Nome do Componente:** `Footer.astro`
*   **Descrição:** Rodapé com 4 colunas contendo navegação, institucional e informações de contato completas.

*   **Layout:**
    *   Grid com 4 colunas:
        1. Logo
        2. Menu
        3. Menu Institucional
        4. Contatos

*   **Props:**
    *   `logo: string` (URL da logo)
    *   `menuLinks: { label: string; href: string }[]`
    *   `institutionalLinks: { label: string; href: string }[]`
    *   `contacts: {
            phone: string;
            whatsapp: string;
            email: string;
            address: string;
            businessHours: string;
        }`
    *   `companyName: string`
    *   `cnpj: string`
    *   `year?: number` (fallback automático para ano atual)

*   **Conteúdo por Coluna:**
    *   **Logo:** Exibição da marca
    *   **Menu:** Links principais do site
    *   **Menu Institucional:** Sobre, política de privacidade, termos, etc.
    *   **Contatos:**
        *   Telefone (ícone Lucide: `Phone`)
        *   WhatsApp (ícone Lucide: `MessageCircle`)
        *   Email (ícone Lucide: `Mail`)
        *   Endereço (ícone Lucide: `MapPin`)
        *   Horário de funcionamento (ícone Lucide: `Clock`)

*   **Footer Legal (abaixo das colunas):**
    *   Linha separadora (`border-t`)
    *   Texto:
        *   `CNPJ {cnpj} • {companyName} • © {year} Todos os direitos reservados.`

*   **Estilo:**
    *   Fundo escuro (`bg-dark`)
    *   Texto claro (`text-white/80`)
    *   Grid responsivo:
        *   1 coluna (mobile)
        *   2 colunas (tablet)
        *   4 colunas (desktop)
    *   Espaçamento vertical confortável (`py-10`)
    *   Gap entre colunas (`gap-8`)

*   **Interatividade:**
    *   Links clicáveis (tel:, mailto:, wa.me)
    *   Hover states suaves (underline ou mudança de cor)

#### WhatsappButton.astro
*   **Nome do Componente:** `WhatsappButton.astro`
*   **Descrição:** Botão flutuante de contato rápido via WhatsApp.
*   **Comportamento:** O botão deve ser `fixed` no canto inferior direito (`bottom-6 right-6`) com alto `z-index: [999]`.
*   **Props:**
    *   `phoneNumber: string` (Número formatado ou apenas dígitos)
    *   `message?: string` (Mensagem pré-preenchida opcional)
*   **Estilo Visual:**
    *   **Fundo:** Verde oficial do WhatsApp (`#25D366`).
    *   **Tamanho:** Circular com 64px (`w-16 h-16`).
    *   **Ícone:** Ícone oficial do WhatsApp em SVG inline (cor branca, tamanho 32px/w-8).
    *   **Sombra:** Shadow pronunciada com cor do branding (`shadow-[0_10px_30px_rgba(37,211,102,0.4)]`).
*   **Interatividade:**
    *   **Hover:** Leve escala (`hover:scale-110`) e aumento de sombra.

#### Cookie Consent
*   **Nome do Componente:** `CookieConsent.astro`
*   **Descrição:** Banner fixo para consentimento de cookies com mensagem breve e botão de aceite.

*   **Props:**
    *   `message: string` (Texto curto explicando o uso de cookies)
    *   `buttonLabel?: string` (Texto do botão — default: "Concordo")
    *   `storageKey?: string` (Chave para armazenar consentimento — default: "cookie_consent")

*   **Comportamento:**
    *   Exibido apenas se o usuário ainda não tiver dado consentimento
    *   Ao clicar em "Concordo":
        *   Armazena aceite no `localStorage`
        *   Esconde o componente

*   **Layout:**
    *   Fixo no rodapé (`fixed bottom-0 left-0 w-full`)
    *   Container centralizado (`max-w-7xl mx-auto`)
    *   Desktop:
        *   Texto à esquerda
        *   Botão à direita
    *   Mobile:
        *   Layout empilhado

*   **Estilo:**
    *   Tailwind CSS
    *   Fundo: `bg-white`
    *   Texto: `text-gray-700`
    *   Borda superior: `border-t border-gray-200`
    *   Botão:
        *   `bg-primary`
        *   `text-white`
        *   `rounded-lg`
        *   `px-4 py-2`
        *   Hover: leve escurecimento (`opacity-90` ou variação da cor)
    *   Espaçamento: `p-4`
    *   Sombra superior leve: `shadow-[0_-2px_10px_rgba(0,0,0,0.05)]`

*   **Interatividade:**
    *   JavaScript puro
    *   Transição suave:
        *   Entrada: `translate-y-full → translate-y-0`
        *   Opacidade: `opacity-0 → opacity-100`

*   **Acessibilidade:**
    *   Botão com `aria-label`
    *   Suporte a navegação por teclado

*   **Objetivo:**
    *   Informar de forma clara e discreta
    *   Manter consistência visual com layout claro

## Componentes por Seção

Abaixo, detalhamos cada componente, suas `props` esperadas, considerações de estilo e interatividade:

### 1. Hero (Fixo)
*   **Nome do Componente:** `HeroSection.astro`
*   **Descrição:** Seção de abertura de alto impacto com layout de duas colunas e fundo com gradiente orgânico moderno.
*   **Visual & Background (Modern Gradient):**
    *   **Base:** Fundo sólido na cor `primary` ou `dark` (conforme o tema).
    *   **Efeito de Profundidade:** Inserir 2 a 3 elementos `<svg>` circulares em posições estratégicas (ex: topo-esquerda e centro-direita).
    *   **Estilo dos Círculos:** 
        *   Cores: Mistura de `primary` e `accent`.
        *   Filtro: Aplicar um `blur` intenso (ex: `blur-[120px]`) via Tailwind.
        *   Opacidade: `opacity-40` a `opacity-60` para um efeito suave e não obstrutivo.
    *   **Overlay:** Camada de ruído sutil (`noise texture`) opcional para um toque industrial premium.
*   **Layout & Conteúdo:**
    *   **Grid Desktop:** `grid-cols-1 lg:grid-cols-2` com `items-center` e `gap-16`.
    *   **Coluna Esquerda:** 
        *   Headline em **branco** (`text-white`) com `font-extrabold` e `leading-tight`.
        *   Subheadline em branco com opacidade (`text-white/80`).
        *   CTA: Componente `Button.astro` (variante `white`).
    *   **Coluna Direita:** 
        *   Imagem do produto com `drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]`.
        *   Animação: Flutuação suave via CSS (`animate-float`).
*   **Interatividade:** 
    *   Animação de entrada `.fade-up` para o bloco de texto.
    *   Efeito de hover no botão via componente `Button.astro`.

### 2. Visão Geral (Fixo)
*   **Nome do Componente:** `OverviewSection.astro`
*   **Layout:** 
    *   **Topo:** Headline centralizada e parágrafo de descrição com largura máxima controlada (`max-w-3xl mx-auto`) para facilitar a leitura.
    *   **Grid de Atributos:** Grid de 2 colunas no mobile e 4 colunas no desktop (`grid-cols-2 lg:grid-cols-4`).
*   **Estilo dos Atributos (Cards de Ícone):**
    *   **Ícone:** Usar `lucide-astro` com fundo `primary/10` e ícone na cor `primary`.
    *   **Texto:** Título do atributo em `font-bold` e descrição curta em `text-sm text-gray-600`.
    *   **Efeito:** Hover suave com `translate-y-[-4px]` e sombra sutil.
*   **Props:**
    *   `title: string` (Ex: "Visão Geral do Produto")
    *   `description: string` (Texto descritivo principal)
    *   `attributes: Array<{ icon: string; label: string; detail: string }>`

### 3. Vídeo (Opcional)
*   **Nome do Componente:** `VideoSection.astro`
*   **Descrição:** Exibição de vídeo do YouTube com carregamento otimizado, priorizando performance e Core Web Vitals.

*   **Props:**
    *   `videoId: string` (ID do vídeo do YouTube)
    *   `title?: string` (Título acessível do vídeo)
    *   `thumbnail?: string` (URL da thumbnail customizada opcional)
    *   `aspectRatio?: '16:9' | '4:3'` (Proporção do vídeo)

*   **Condicionalidade:**
    *   Renderizar apenas se `videoId` for fornecido

*   **Estratégia de Performance:**
    *   **Lazy Load real:**
        *   NÃO carregar iframe do YouTube inicialmente
    *   **Thumbnail estática:**
        *   Usar imagem do próprio YouTube:
            *   `https://img.youtube.com/vi/{videoId}/hqdefault.jpg`
    *   **Carregamento sob demanda:**
        *   Ao clicar, substituir thumbnail por `<iframe>`
    *   **Evita scripts pesados iniciais do YouTube (~500KB)**

*   **Interatividade:**
    *   Clique na thumbnail:
        *   Carrega iframe com autoplay
        *   `https://www.youtube.com/embed/{videoId}?autoplay=1`
    *   Botão de play central (ícone Lucide: `Play`)
    *   Cursor pointer + feedback visual

*   **Estilo:**
    *   Container responsivo com aspect ratio:
        *   `aspect-video` (16:9 padrão)
    *   Thumbnail:
        *   `rounded-xl`
        *   `overflow-hidden`
        *   `object-cover`
    *   Overlay:
        *   Gradiente leve (`bg-black/40`)
        *   Botão play centralizado
    *   Hover:
        *   Leve zoom (`scale-105`)
        *   Fade no overlay

*   **Acessibilidade:**
    *   `aria-label` no botão de play
    *   `title` no iframe
    *   Suporte a navegação por teclado

*   **SEO & Performance:**
    *   Evita impacto no LCP
    *   Reduz uso de JS inicial
    *   Ideal para páginas de produto e landing pages

*   **Opcional (futuro):**
    *   Carregar iframe apenas quando entrar no viewport (Intersection Observer)
    *   Suporte a múltiplos vídeos (carrossel)

### 4. Aplicações (Fixo)
*   **Nome do Componente:** `ApplicationsSection.astro`
*   **Descrição:** Seção que apresenta aplicações reais do produto em contexto de uso, com visualização ampliada (lightbox).

*   **Props:**
    *   `applications: Array<{
            image: string;
            alt: string;
            title?: string;
            description?: string;
        }>`
    *   `enableLightbox?: boolean` (Ativa visualização em tela cheia ao clicar)

*   **Interatividade:**
    *   Clique na imagem abre um **lightbox (modal fullscreen)**
    *   Funcionalidades do lightbox:
        *   Visualização ampliada da imagem
        *   Navegação entre imagens (next/prev)
        *   Fechar ao clicar fora ou pressionar `ESC`
        *   Suporte a swipe (mobile)

*   **UX Recomendada:**
    *   Cursor pointer nas imagens
    *   Ícone de “expandir” no hover (ex: `Maximize` do Lucide)
    *   Fundo escuro com leve blur ao abrir o lightbox

*   **Estilo do Lightbox:**
    *   Fundo: `bg-black/80 backdrop-blur-sm`
    *   Imagem centralizada e responsiva (`max-h-screen`, `object-contain`)
    *   Transição suave de entrada (fade + scale).

### 5. Galeria de Fotos (Opcional)
*   **Nome do Componente:** `PhotoGallerySection.astro`
*   **Descrição:** Galeria de fotos de produtos com forte apelo visual.
*   **Props:**
    *   `images: Array<string>` (Lista de URLs de imagens)
*   **Condicionalidade:** O componente será renderizado apenas se a lista `images` não estiver vazia.
*   **Estilo:** Tailwind CSS para layout responsivo da galeria (e.g., grid, carousel).
*   **Interatividade:** JavaScript puro para funcionalidades de lightbox ou carrossel de imagens.

### 6. Especificações Técnicas (Fixo)
- **Nome do Componente:** `TechSpecsSection.astro`
- **Props:**
  - `specGroups: Array<{ category: string; rows: Array<{ param: string; value: string }> }>`
  - `note?: string` (texto da nota de rodapé com ícone de alerta amber)
- **Layout:** Grid de 2 colunas no desktop, 1 coluna no mobile
- **Estrutura interna:** Cada grupo tem um label de categoria (10px uppercase, `--blue`, border-bottom) seguido de linhas param/valor separadas por dividers

### 7. Personalizações (Opcional)
*   **Nome do Componente:** `CustomizationSection.astro`
*   **Descrição:** Galeria compacta de fotos mostrando opções disponíveis (cores, formatos, acabamentos, etc.). Layout em grid responsivo com lightbox para visualização ampliada.
*   **Props:**
    *   `title?: string` (Título da seção, padrão: "Personalizações")
    *   `description?: string` (Descrição da seção)
    *   `options: Array<{ name: string; image: ImageMetadata }>` (Lista de opções de personalização com nome e imagem)
    *   `cols?: number` (Colunas mobile, padrão 2)
    *   `colsMd?: number` (Colunas tablet, padrão 3)
    *   `colsLg?: number` (Colunas desktop, padrão 4)
*   **Condicionalidade:** O componente será renderizado apenas se a lista `options` não estiver vazia.
*   **Layout:** Grid dinâmico e flexível, permitindo definir o número exato de colunas por dispositivo via props. Cada item exibe a foto com legenda abaixo.
*   **Estilo:** Cards com borda sutil, `rounded-sm`, hover com leve escala e sombra. Lightbox overlay ao clicar na foto.
*   **Interatividade:** JavaScript puro para lightbox (abrir/fechar imagem ampliada com overlay escuro e navegação).

### 8. Diferenciais (Fixo)
- **Nome do Componente:** `DifferentialsSection.astro`
- **Layout:** Grid `grid-cols-2 lg:grid-cols-3 gap-6`
- **Background:** `bg-dark text-white` (seção escura)
- **Cada card:**
  - Ícone lucide-astro com fundo `primary/10` e cor `primary`, tamanho 20px
  - Título em `font-bold text-white`
  - Descrição em `text-sm text-white/60` com 1–2 linhas
  - Estilo: `bg-white/5 border border-white/10 rounded-sm p-6 hover:border-primary/40 transition-colors`
- **Props:**
  - `title?: string` (título da seção, opcional)
  - `items: Array<{ icon: string; title: string; description: string }>`
- **Background:** `bg-dark` (usar componente `Section.astro` com `isDark={true}`)


### 9. Prova Social (Opcional)
*   **Nome do Componente:** `SocialProofSection.astro`
*   **Descrição:** Seção de depoimentos de clientes, focada em aumentar confiança, reduzir objeções e reforçar credibilidade do produto.

*   **Props:**
    *   `title?: string` (Ex: "O que nossos clientes dizem")
    *   `subtitle?: string` (Texto de apoio opcional)
    *   `testimonials: Array<{
            quote: string;
            author: string;
            role?: string; // ex: "Arquiteto", "Cliente"
            company?: string;
            avatar?: string;
            rating?: 1 | 2 | 3 | 4 | 5;
        }>`
    *   `layout?: 'carousel' | 'grid'` (Tipo de exibição)
    *   `highlightFirst?: boolean` (Destacar primeiro depoimento)

*   **Condicionalidade:**
    *   Renderizar apenas se `testimonials.length > 0`

*   **Layout:**
    *   **Grid:** mais estável e transmite mais confiança
    *   **Carousel:** mais dinâmico e compacto (ideal para mobile)
    *   Opção de destaque para o primeiro depoimento

*   **Conteúdo:**
    *   Texto do depoimento (quote)
    *   Nome do autor
    *   Cargo/empresa (opcional, aumenta credibilidade)
    *   Avatar (opcional, reforça confiança)
    *   Rating (opcional, exibição de estrelas)

*   **Estilo:**
    *   Tailwind CSS
    *   Cards com:
        *   `rounded-xl`
        *   `border border-white/10`
        *   `p-6`
    *   Destaque tipográfico para o depoimento
    *   Rating com ícones Lucide (`Star`)
    *   Hover:
        *   Leve elevação (`shadow-lg`)
        *   Feedback visual suave

*   **Interatividade:**
    *   Carousel com swipe (mobile), se aplicável
    *   (Opcional) autoplay leve e pausável no hover

*   **Boas práticas:**
    *   Usar depoimentos reais (nome + contexto)
    *   Evitar textos genéricos
    *   Priorizar clareza e objetividade
    *   Misturar perfis (ex: profissional + cliente final)

*   **Objetivo:**
    *   Reduzir objeções
    *   Aumentar confiança na decisão de compra
    *   Reforçar percepção de qualidade do produto

### 10. Documentação (Opcional)
*   **Nome do Componente:** `DocumentationSection.astro`
*   **Descrição:** Seção para disponibilização de documentos técnicos do produto, como fichas técnicas, catálogos, laudos e manuais, reforçando credibilidade e suporte à decisão.

*   **Props:**
    *   `title?: string` (Título da seção — ex: "Documentação Técnica")
    *   `subtitle?: string` (Texto de apoio opcional)
    *   `documents: Array<{
            title: string;
            url: string;
            type: 'pdf' | 'doc' | 'xls' | 'image' | 'other';
            size?: string; // ex: "2.4MB"
            updatedAt?: string; // ex: "Atualizado em 03/2026"
        }>`
    *   `layout?: 'list' | 'grid'` (Tipo de layout)
    *   `highlightPrimary?: boolean` (Destacar documento principal, ex: ficha técnica)

*   **Condicionalidade:**
    *   Renderizar apenas se `documents.length > 0`

*   **Layout:**
    *   **Lista:** mais compacto e direto (ideal para poucos documentos)
    *   **Grid:** cards visuais (ideal para muitos documentos)
    *   Possibilidade de destacar o primeiro item (ex: ficha técnica principal)

*   **Conteúdo por item:**
    *   Ícone por tipo de arquivo:
        *   PDF → `FileText`
        *   Planilha → `FileSpreadsheet`
        *   Documento → `File`
        *   Imagem → `Image`
    *   Título do documento
    *   Metadados opcionais:
        *   Tamanho do arquivo
        *   Data de atualização
    *   CTA:
        *   "Baixar" ou "Visualizar"

*   **Estilo:**
    *   Tailwind CSS
    *   Cards com:
        *   `rounded-xl`
        *   `border border-white/10`
        *   `p-4`
    *   Hover:
        *   Leve destaque (`bg-white/5`)
        *   Ícone ou botão com animação sutil
    *   Espaçamento consistente (`gap-4` ou `gap-6`)

*   **Interatividade:**
    *   Download direto (`target="_blank"` + `rel="noopener"`)
    *   (Opcional) abrir preview de PDF em nova aba
    *   (Opcional futuro) tracking de download

### 11. Variações da Linha (Opcional)
*   **Nome do Componente:** `ProductVariationsSection.astro`
*   **Descrição:** Quando existir versão Standard, Premium, etc.
*   **Props:**
    *   `variations: Array<{ name: string; description: string; image: string }>` (Lista de variações de produto)
*   **Condicionalidade:** O componente será renderizado apenas se a lista `variations` não estiver vazia.
*   **Estilo:** Tailwind CSS para cards de variações de produto.

### 12. Produtos Relacionados (Fixo)
*   **Nome do Componente:** `RelatedProductsSection.astro`
*   **Descrição:** 3 a 4 produtos complementares.
*   **Props:**
    *   `products: Array<{ name: string; image: string; link: string }>` (Lista de produtos relacionados)
*   **Estilo:** Tailwind CSS para layout de grade ou carrossel de produtos.

### 13. Sobre a Empresa (Fixo)
- **Nome do Componente:** `AboutSection.astro`
- **Layout:** Grid 2 colunas no desktop (`grid-cols-2 gap-16 items-center`), coluna única no mobile (foto abaixo do texto)
- **Coluna esquerda:**
  - Eyebrow label + H2 com título da seção
  - Parágrafo de texto institucional
  - Grid de métricas: `grid-cols-2 gap-6 mt-10` com 2 a 4 números de destaque
- **Coluna direita:**
  - Imagem única com `aspect-[4/5] object-cover rounded-sm`
- **Props:**
  - `title: string`
  - `text: string`
  - `image: string`
  - `metrics: Array<{ value: string; label: string }>` — ex: `{ value: "32 anos", label: "de mercado" }`
- **Estilo das métricas:** valor em `text-4xl font-extrabold text-primary tracking-tight`, label em `text-sm text-gray-500 mt-1`
- **Background:** branco (`bg-white`)

### 14. CTA Final (Fixo)
*   **Nome do Componente:** `FinalCtaSection.astro`
*   **Descrição:** Botão de contato direto via WhatsApp com mensagem dinâmica baseada no produto.
*   **Props:**
    *   `whatsappNumber: string` (Número do WhatsApp com código do país e DDD)
    *   `productName: string` (Nome do produto para compor a mensagem)
    *   `customMessage?: string` (Mensagem customizada opcional com placeholder `{productName}`)
*   **Estilo:** Tailwind CSS para estilização do botão com destaque visual (cor, hover, animação leve).
*   **Interatividade:** Geração dinâmica do link do WhatsApp (`https://wa.me/`) com mensagem pré-preenchida. 
    *   Caso `customMessage` seja informada, substituir `{productName}` pelo valor real.
    *   Caso contrário, usar fallback padrão:
        *   `"Olá! Tenho interesse no produto {productName}. Pode me ajudar?"`


### 15. Sticky CTA Bar (Fixo)
*   **Nome do Componente:** `StickyBar.astro`
*   **Descrição:** Barra fixa no rodapé que aparece após scroll, com CTA de conversão (WhatsApp ou Âncora) e mini preview do produto.

*   **Props:**
    *   `productName: string` (Nome do produto)
    *   `productImage: string` (Imagem pequena do produto)
    *   `message?: string` (Mensagem principal)
    *   `subMessage?: string` (Mensagem secundária opcional)
    *   `ctaLabel: string` (Texto do botão)
    *   `ctaTarget: string` (ID da seção ou URL — ex: "#contato" ou link WhatsApp)
    *   `showAfter?: 'hero' | 'scroll'` (Quando exibir a barra)

*   **Comportamento:**
    *   Inicialmente oculto (fora da tela)
    *   Aparece após:
        *   Scroll além da seção hero (padrão)
        *   Ou após determinado scroll vertical (800px)
    *   **Z-index:** `z-[100]` para ficar acima do conteúdo, mas abaixo do botão de WhatsApp e do menu mobile.
    *   **Não** possui botão de fechar, mantendo o CTA sempre acessível após o scroll inicial.

*   **Layout:**
    *   Fixo no rodapé (`fixed bottom-0 left-0 w-full`)
    *   Container centralizado (`max-w-7xl mx-auto`)
    *   Estrutura:
        *   **Esquerda:**
            *   Mini imagem do produto (`w-14 h-14`)
            *   Texto (Título + Subtexto)
        *   **Direita:**
            *   Botão CTA de destaque

*   **Conteúdo:**
    *   **Imagem:**
        *   Thumbnail (`w-14 h-14`)
        *   `object-cover`
        *   `rounded-sm`
    *   **Texto:**
        *   Mensagem: `text-lg` aumentando para `xl:text-xl`
        *   Subtexto: `text-sm` aumentando para `xl:text-base`
    *   **CTA:**
        *   Botão com ação principal (WhatsApp direto ou scroll suave)

*   **Estilo:**
    *   Tailwind CSS
    *   Fundo: `bg-white`
    *   Texto: `text-dark` (título) e `text-gray-500` (subtexto)
    *   Borda superior: `border-t border-gray-100`
    *   Sombra: `shadow-[0_-10px_40px_rgba(0,0,0,0.1)]`
    *   Espaçamento: `px-4 py-3`
    *   Layout flex com `justify-between` e `gap-10`

*   **Interatividade:**
    *   JavaScript puro
    *   Entrada suave:
        *   `translate-y-full → translate-y-0`
        *   `opacity-0 → opacity-100`
        *   Bezier customizado para efeito premium.
    *   Redirecionamento direto (WhatsApp) ou scroll suave até target (`scrollIntoView`).

*   **Acessibilidade:**
    *   Navegação por teclado
    *   Imagem com `alt` descritivo

*   **Boas práticas:**
    *   Manter altura compacta para não obstruir conteúdo
    *   Foco total na conversão imediata

*   **Objetivo:**
    *   Garantir um ponto de contato sempre visível para o usuário que demonstra interesse ao scrollar a página
    *   Reforçar o apelo visual do produto com a mini thumbnail

### 18. FAQ (Opcional)
*   **Nome do Componente:** `FaqSection.astro`
*   **Descrição:** Seção de perguntas frequentes para esclarecer dúvidas comuns, reduzir objeções e melhorar SEO.

*   **Props:**
    *   `title?: string` (Ex: "Perguntas Frequentes")
    *   `subtitle?: string` (Texto de apoio opcional)
    *   `faqs: Array<{
            question: string;
            answer: string;
        }>`
    *   `openFirst?: boolean` (Abrir o primeiro item por padrão)

*   **Condicionalidade:**
    *   Renderizar apenas se `faqs.length > 0`

*   **Layout:**
    *   Lista vertical (accordion)
    *   Cada item contém:
        *   Pergunta (header clicável)
        *   Resposta (conteúdo expansível)

*   **Interatividade:**
    *   Clique expande/recolhe resposta
    *   Comportamento:
        *   Pode permitir múltiplos abertos
        *   Ou modo “accordion” (apenas um aberto por vez)
    *   Animação suave de expansão (`max-height` ou `scale + opacity`)

*   **Conteúdo:**
    *   Perguntas objetivas e reais
    *   Respostas claras e diretas (sem excesso de texto)

*   **Estilo:**
    *   Tailwind CSS
    *   Itens com:
        *   `border-b border-gray-200`
        *   `py-4`
    *   Pergunta:
        *   `font-medium text-gray-900`
        *   Ícone de toggle (Lucide: `Plus` / `Minus` ou `ChevronDown`)
    *   Resposta:
        *   `text-gray-600`
        *   `mt-2`
    *   Hover:
        *   Leve mudança de cor no título

*   **Acessibilidade:**
    *   Uso de `button` para perguntas
    *   `aria-expanded` e `aria-controls`
    *   Navegação por teclado

*   **SEO:**
    *   Estrutura preparada para **FAQ Schema (JSON-LD)**
    *   Melhora chances de rich results no Google

*   **Boas práticas:**
    *   4 a 8 perguntas principais
    *   Baseadas em dúvidas reais de clientes
    *   Incluir objeções comuns (preço, prazo, instalação, etc.)

*   **Objetivo:**
    *   Reduzir fricção na decisão
    *   Antecipar dúvidas do usuário
    *   Melhorar SEO e tempo na página

    

## Considerações Técnicas Gerais

*   **Astro JS versão 6.0.0:** Utilizado para a renderização de componentes estáticos e hidratação seletiva com JavaScript puro, garantindo alta performance e SEO.
*   **Tailwind CSS versão 4.2** Framework CSS utilitário para estilização rápida e consistente, com foco em responsividade e personalização.
*   **JavaScript Puro:** Para toda a interatividade no lado do cliente, evitando frameworks pesados e mantendo a leveza da aplicação.
*   **Dados:** Os dados para cada seção serão passados via `props` para os componentes Astro, permitindo fácil gerenciamento e atualização do conteúdo.
*   **SEO:** Astro JS oferece excelente suporte a SEO por padrão, com a geração de HTML estático. A estrutura semântica dos componentes será priorizada.
*   **Performance:** A combinação de Astro JS e Tailwind CSS resultará em uma landing page leve e de carregamento rápido.

### Base Visual e UI
- **Componentes de UI:** Todos os componentes de seção (Hero, Visão Geral, etc.) devem ser construídos utilizando os componentes base definidos em `src/components/ui/` (Button, Section, Card), conforme especificado no `design-system.md`.
- **Tailwind v4:** Utilize as variáveis de tema configuradas no `global.css` que refletem o Design System.


Esta arquitetura visa proporcionar uma landing page modular, performática e fácil de manter, alinhada com as melhores práticas de desenvolvimento web moderno.
