# Product Requirements Document (PRD) - Landing Page de Produtos Industriais

## 1. Visão Geral do Produto

O objetivo deste projeto é desenvolver um template de Landing Page de alta performance para produtos do setor industrial e construção civil. A página será construída utilizando **Astro JS**, **Tailwind CSS** e **JavaScript puro**, garantindo carregamento rápido, excelente SEO e facilidade de manutenção.

A arquitetura será projetada para suportar a criação de múltiplas landing pages (uma por produto), com a capacidade futura de integração com um Headless CMS (especificamente o **Directus**). Isso permitirá que o cliente final crie, edite e publique novas páginas de forma autônoma, ativando ou desativando seções conforme a necessidade de cada produto.

## 2. Objetivos e Metas

*   **Performance:** Alcançar pontuações superiores a 90 no Google PageSpeed Insights (Mobile e Desktop).
*   **Conversão:** Direcionar o usuário de forma clara e eficiente para o contato via WhatsApp.
*   **Flexibilidade:** Permitir a composição de páginas através de 14 seções modulares (fixas e opcionais).
*   **Autonomia do Cliente:** Preparar a arquitetura de dados para integração com o Directus CMS, permitindo gestão de conteúdo sem necessidade de código.
*   **Escalabilidade:** Facilitar a adição de novos produtos através de um fluxo de CI/CD (ex: Vercel/Netlify) acionado por webhooks do CMS.

## 3. Público-Alvo

*   **Usuários Finais:** Engenheiros, arquitetos, compradores corporativos e profissionais da construção civil que buscam informações técnicas precisas, aplicações reais e especificações de produtos industriais.
*   **Cliente (Gestor do Conteúdo):** Equipe de marketing ou vendas que precisa atualizar informações de produtos, adicionar novos cases ou lançar novas linhas de produtos de forma ágil.

## 4. Requisitos Funcionais

A landing page será composta por até 14 seções. O sistema deve permitir que as seções marcadas como "Opcionais" sejam ativadas ou desativadas por produto.

| # | Seção | Tipo | Descrição e Requisitos |
| :--- | :--- | :--- | :--- |
| 1 | Hero | Fixo | Foto do produto em contexto real, headline de benefício e CTA principal direcionando para o WhatsApp. |
| 2 | Visão Geral | Fixo | Descrição curta do produto acompanhada de ícones destacando atributos-chave. |
| 3 | Vídeo | Opcional | Player de vídeo (YouTube/Vimeo ou nativo) posicionado antes das aplicações, quando disponível. |
| 4 | Aplicações | Fixo | Galeria ou grid de fotos mostrando projetos reais e contextos de uso do produto. |
| 5 | Galeria de Fotos | Opcional | Imagens adicionais do produto com forte apelo visual (ex: detalhes de acabamento). |
| 6 | Especificações Técnicas | Fixo | Tabela detalhada contendo informações como liga, dimensões, normas atendidas e acabamentos. |
| 7 | Personalizações | Opcional | Exibição de cores, modelos ou variações disponíveis, preferencialmente com fotos correspondentes. |
| 8 | Diferenciais | Fixo | Lista de *bullets* técnicos utilizando linguagem apropriada para especificadores (engenheiros/arquitetos). |
| 9 | Prova Social | Opcional | Depoimentos de clientes ou links para *cases* de sucesso detalhados. |
| 10 | Documentação | Opcional | Links para download de fichas técnicas (PDF), catálogos completos ou laudos de certificação. |
| 11 | Variações da Linha | Opcional | Destaque para versões alternativas do produto (ex: Standard, Premium, Heavy Duty). |
| 12 | Produtos Relacionados | Fixo | Exibição de 3 a 4 produtos complementares para incentivar *cross-sell*. |
| 13 | Sobre a Empresa | Fixo | Breve texto institucional acompanhado de foto, visando reforçar a credibilidade antes do contato final. |
| 14 | CTA Final | Fixo | Botão de chamada para ação direcionando exclusivamente para o WhatsApp, configurável por produto. |

## 5. Requisitos Técnicos

### 5.1. Stack Tecnológico
*   **Framework:** Astro JS (Geração de Sites Estáticos - SSG).
*   **Estilização:** Tailwind CSS.
*   **Interatividade:** JavaScript puro (Vanilla JS) para manter o *bundle* mínimo.
*   **CMS (Futuro):** Directus (Headless CMS).
*   **Hospedagem/Deploy:** Vercel, Netlify ou Cloudflare Pages.

### 5.2. Arquitetura de Dados (Preparação para Directus)
O projeto Astro deve ser estruturado para consumir dados de arquivos JSON ou Markdown inicialmente, simulando a resposta de uma API REST. O modelo de dados para um produto deve refletir a estrutura das seções:

```json
{
  "id": "produto-exemplo",
  "slug": "produto-exemplo",
  "hero": {
    "headline": "...",
    "image": "...",
    "whatsappNumber": "..."
  },
  "overview": { ... },
  "hasVideo": true,
  "video": { "url": "..." },
  "applications": [ ... ],
  "hasGallery": false,
  "techSpecs": [ ... ],
  // ... demais seções
}
```

### 5.3. Fluxo de Publicação (CI/CD)
1.  O cliente cria ou edita um produto no Directus.
2.  Ao salvar/publicar, o Directus dispara um *Webhook*.
3.  A plataforma de hospedagem (ex: Vercel) recebe o webhook e inicia o processo de *build*.
4.  O Astro consome a API do Directus, gera as páginas estáticas atualizadas e faz o *deploy*.

## 6. Requisitos de Design e UX

*   **Identidade Visual:** O template deve ser genérico e adaptável, permitindo a configuração de cores primárias, secundárias e tipografia através de variáveis do Tailwind CSS (ex: `tailwind.config.mjs`), facilitando a personalização para diferentes marcas ou linhas de produtos.
*   **Responsividade:** Design *Mobile-First*, garantindo usabilidade perfeita em smartphones, tablets e desktops.
*   **Acessibilidade:** Uso de tags semânticas HTML5, atributos `alt` em imagens e contraste adequado de cores.

## 7. Plano de Implementação (Fases)

### Fase 1: Setup e Estrutura Base
*   Inicializar projeto Astro com Tailwind CSS.
*   Configurar layout principal (`Layout.astro`) com Header e Footer genéricos.
*   Definir variáveis de tema no `tailwind.config.mjs`.

### Fase 2: Desenvolvimento dos Componentes (Seções)
*   Criar os 14 componentes Astro correspondentes a cada seção.
*   Implementar a lógica condicional para renderizar as seções opcionais apenas quando os dados estiverem presentes.
*   Adicionar interatividade com JS puro (ex: menu mobile, acordeões para especificações, lightbox para galeria).

### Fase 3: Integração de Dados Mockados
*   Criar arquivos JSON simulando a estrutura de dados de 2 ou 3 produtos diferentes (testando combinações de seções opcionais).
*   Configurar a geração dinâmica de rotas no Astro (`getStaticPaths`) com base nesses arquivos JSON.

### Fase 4: Preparação para o CMS (Directus)
*   Documentar o esquema de dados (Collections e Fields) necessário no Directus.
*   Criar um serviço no Astro para buscar dados (inicialmente dos arquivos locais, preparado para trocar pela URL da API do Directus).

### Fase 5: Testes e Otimização
*   Auditoria de performance com Lighthouse.
*   Testes de responsividade em múltiplos dispositivos.
*   Validação dos links de WhatsApp.
