# Skill: Desenvolvimento de Landing Page Modular com Astro JS

## Descrição

Esta skill orienta o desenvolvimento de uma landing page de produto de alta performance, modular e otimizada para SEO, utilizando **Astro JS**, **Tailwind CSS** e **JavaScript puro**. A arquitetura é projetada para ser facilmente integrável com um Headless CMS como o Directus, permitindo a gestão autônoma do conteúdo e a criação dinâmica de múltiplas páginas de produto.

## Pré-requisitos

*   Conhecimento básico em desenvolvimento web (HTML, CSS, JavaScript).
*   Familiaridade com linha de comando.
*   Node.js e npm/yarn instalados.
*   Conhecimento básico de Astro JS e Tailwind CSS é um diferencial.

## Fluxo de Trabalho

### 1. Inicialização do Projeto Astro

Comece criando um novo projeto Astro e configurando o Tailwind CSS. Utilize o seguinte comando:

```bash
npm create astro@latest meu-projeto-landing-page -- --template minimal
cd meu-projeto-landing-page
npx astro add tailwind
```

Configure o `tailwind.config.mjs` para incluir as cores e fontes da identidade visual do produto, se houver. Caso contrário, mantenha um tema genérico e adaptável.

### 2. Estrutura de Diretórios

Organize o projeto da seguinte forma para facilitar a modularidade:

```
src/
├── components/        # Componentes Astro para cada seção
│   ├── HeroSection.astro
│   ├── OverviewSection.astro
│   └── ... (demais seções)
├── layouts/
│   └── Layout.astro   # Layout principal da landing page
├── pages/
│   └── [productSlug].astro # Página dinâmica para produtos
├── styles/
│   └── global.css     # Estilos globais e imports do Tailwind
└── data/              # Dados mockados para desenvolvimento
    └── products.json
```

### 3. Desenvolvimento dos Componentes (Seções)

Crie um componente Astro (`.astro`) para cada uma das 14 seções definidas no PRD. Cada componente deve:

*   Receber os dados via `props`.
*   Utilizar Tailwind CSS para estilização.
*   Implementar lógica condicional para seções opcionais (renderizar apenas se os dados necessários estiverem presentes).
*   Adicionar interatividade com JavaScript puro dentro dos blocos `<script>` do Astro, se necessário.

**Exemplo de Componente `HeroSection.astro`:**

```astro
--- 
interface Props {
  headline: string;
  image: string;
  whatsappNumber: string;
}

const { headline, image, whatsappNumber } = Astro.props;
---

<section class="relative bg-cover bg-center h-screen flex items-center" style={`background-image: url(${image})`}>
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="container mx-auto text-white text-center z-10">
    <h1 class="text-5xl font-bold mb-4">{headline}</h1>
    <a 
      href={`https://wa.me/${whatsappNumber}`}
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      Solicite um orçamento
    </a>
  </div>
</section>
```

### 4. Criação do Layout Principal

O `Layout.astro` deve incluir o cabeçalho, rodapé e um slot para o conteúdo da página. Ele será responsável por importar os estilos globais e fornecer a estrutura básica para todas as landing pages.

### 5. Gerenciamento de Dados (Mock e Futura Integração com Directus)

1.  **Dados Mockados:** Crie um arquivo `src/data/products.json` com a estrutura de dados definida no PRD. Este arquivo simulará a API do Directus.
2.  **Páginas Dinâmicas:** Utilize a funcionalidade `getStaticPaths` do Astro em `src/pages/[productSlug].astro` para gerar dinamicamente uma página para cada produto com base nos dados mockados.

    ```astro
    --- 
    import Layout from '../layouts/Layout.astro';
    import products from '../data/products.json';
    // Importar todos os componentes de seção aqui
    import HeroSection from '../components/HeroSection.astro';
    // ...

    export async function getStaticPaths() {
      return products.map(product => ({
        params: { productSlug: product.slug },
        props: { product },
      }));
    }

    const { product } = Astro.props;
    ---

    <Layout title={product.hero.headline}>
      {product.hero && <HeroSection {...product.hero} />}
      {/* Renderizar condicionalmente as demais seções */}
      {product.overview && <OverviewSection {...product.overview} />}
      {product.hasVideo && product.video && <VideoSection {...product.video} />}
      {/* ... */}
    </Layout>
    ```

3.  **Preparação para Directus:** Ao integrar com o Directus, o `products.json` será substituído por uma chamada à API do Directus para buscar os dados dos produtos.

### 6. Interatividade com JavaScript Puro

Para funcionalidades como carrosséis, lightboxes, validação de formulários ou menus *mobile*, utilize JavaScript puro. Incorpore o JS diretamente nos componentes Astro ou em arquivos `.js` separados importados via `<script src="..."></script>`.

### 7. Testes e Otimização

*   **Performance:** Monitore o desempenho com ferramentas como Google Lighthouse durante o desenvolvimento.
*   **Responsividade:** Teste a landing page em diferentes tamanhos de tela e dispositivos.
*   **SEO:** Verifique a estrutura semântica e meta tags.

## Referências de Estilo
- **Design System:** Sempre consulte o arquivo `.antigravity/design-system.md` na raiz do projeto antes de gerar qualquer componente de UI ou seção.
- **Prioridade:** As definições do `design-system.md` (cores, fontes e componentes de UI) têm prioridade sobre estilos genéricos.

## Referências

*   [Product Requirements Document (PRD) - Landing Page de Produtos Industriais](/home/ubuntu/landing_page_prd.md)
*   [Arquitetura de Componentes da Landing Page](/home/ubuntu/landing_page_architecture.md)
*   [Documentação Oficial Astro JS](https://docs.astro.build/)
*   [Documentação Oficial Tailwind CSS](https://tailwindcss.com/docs/)
*   [Documentação Oficial Directus](https://docs.directus.io/)

