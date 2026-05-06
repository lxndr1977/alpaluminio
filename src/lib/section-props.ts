import type { SectionTheme } from "./section-themes"

export interface SectionBaseProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  titleSize?: "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl"
  headerAlign?: "left" | "center" | "right"
  theme?: SectionTheme
  paddingTop?: "none" | "sm" | "md" | "lg" | "xl"
  paddingBottom?: "none" | "sm" | "md" | "lg" | "xl"
  margin?: "none" | "sm" | "md" | "lg" | "xl"
  size?: "compact" | "content" | "large" | "container" | "full";
}