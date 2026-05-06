# Design System - Landing Page Industrial (Astro + Tailwind v4)

## 1. Identidade Visual e Tema
Este projeto utiliza **Tailwind CSS v4**. As configurações de tema devem ser aplicadas via variáveis CSS no bloco `@theme` do arquivo `src/styles/global.css`.

### Tipografia
- **Fonte Principal:** 'Albert Sans', sans-serif (Google Fonts: 400, 500, 600, 700, 800).
- **Configuração:** Mapear como `--font-sans` no Tailwind.
- **Estilo de Títulos:** `font-extrabold`, `tracking-tight`, `leading-tight`.

### Paleta de Cores (Tokens)
- **Primary:** `#00AADB` (Azul Industrial)
- **Accent:** `#00D4F0` (Ciano de Destaque)
- **Background Dark:** `#0D0F14` (Fundo Escuro Profundo)
- **Gradient:** `linear-gradient(135deg, #00AADB 0%, #0088B0 100%)`
- **Neutral:** Escala de cinzas do Tailwind (gray-50 a gray-950).

---

## 2. Diretrizes de Implementação
O Antigravity deve seguir estas regras rigorosamente:
1. **Zero CSS Customizado:** Não crie classes como `.btn-primary` no CSS. Use apenas classes utilitárias do Tailwind (ex: `bg-primary`, `text-white`).
2. **Componentes Astro de UI:** Toda a interface deve ser construída com componentes reutilizáveis em `src/components/ui/`.
3. **Responsividade:** Design Mobile-First. Use prefixos `md:` para ajustes em desktop (ex: `py-12 md:py-32`).

---

## 3. Especificação de Componentes Base (UI)

### Button.astro
- **Props:** `variant` ('primary', 'outline', 'white'), `href`, `class`.
- **Estilo Base:** `inline-flex items-center justify-center gap-2 px-7 py-3 rounded-sm font-semibold text-sm transition-all duration-200`.
- **Variantes:**
  - `primary`: `bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 shadow-sm`.
  - `outline`: `bg-transparent border border-white/30 text-white hover:border-white/70 hover:bg-white/5`.
  - `white`: `bg-white text-dark font-bold hover:bg-gray-50 hover:-translate-y-0.5`.

### Section.astro (Container)
- **Props:** `id`, `class`, `isDark` (boolean).
- **Estilo Base:** `w-full py-20 md:py-32 overflow-hidden`.
- **Inner Container:** `max-w-[1440px] mx-auto px-6 md:px-20`.
- **Lógica:** Se `isDark`, aplicar `bg-dark text-white`.

### Typography (Tags Diretas)
- **H2 (Seção):** `text-3xl md:text-5xl font-extrabold text-dark leading-[1.12] tracking-[-0.025em]`.
- **Eyebrow:** `text-[11px] font-bold uppercase tracking-[0.16em] text-primary mb-4 block`.
- **Tag:** `inline-flex items-center px-3.5 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider`.

### Card.astro
- **Estilo Base:** `bg-white border border-gray-200 rounded-sm p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden`.
- **Detalhe:** Adicionar uma borda inferior de 2px `bg-primary` que expande no hover (usando `scale-x-0` para `scale-x-100`).

---

## 4. Animações (Tailwind + JS Puro)
- Use a classe `.fade-up` (definida no global.css) para entradas de seção.
- Aplique `delay-1` a `delay-6` para escalonar a entrada de elementos em grids.
