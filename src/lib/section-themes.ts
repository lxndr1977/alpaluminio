export type SectionTheme = "white" | "primary" | "secondary" | "transparent" | "surface";

type ColorValue =
  | "white"
  | "primary"
  | "secondary"
  | "foreground"
  | "muted"
  | "surface";

export type ThemeColors = {
  eyebrow: ColorValue;
  title: ColorValue;
  subtitle: ColorValue;
  swiper: {
    navButton: string;
    dotInactive: string;
    dotActive: string;
  }
  bg: string;
};

export const colorThemes: Record<SectionTheme, ThemeColors> = {
  white: {
    swiper: {
      navButton:
        "border-neutral-200 text-neutral-700 hover:bg-neutral-100 bg-white",
      dotInactive: "#d4d4d8",
      dotActive: "var(--color-primary)",
    },
    eyebrow: "primary",
    title: "foreground",
    subtitle: "muted",
    bg: "bg-white",
  },
  secondary: {
    swiper: {
      navButton:
        "border-neutral-200 text-neutral-700 hover:bg-neutral-100 bg-white",
      dotInactive: "#d4d4d8",
      dotActive: "#d4d4d8",
    },
    eyebrow: "primary",
    title: "white",
    subtitle: "white",
    bg: "bg-secondary",
  },
  primary: {
    swiper: {
      navButton: "border-white/30 bg-white text-primary hover:bg-white/15",
      dotInactive: "#ffffff40",
      dotActive: "#ffffff",
    },
    eyebrow: "white",
    title: "white",
    subtitle: "white",
    bg: "bg-primary",
  },
  transparent: {
    swiper: {
      navButton:
        "border-neutral-200 text-neutral-700 hover:bg-neutral-100 bg-white",
      dotInactive: "#d4d4d8",
      dotActive: "var(--color-primary)",
    },
    eyebrow: "primary",
    title: "foreground",
    subtitle: "muted",
    bg: "bg-transparent",
  },
  surface: {
    swiper: {
      navButton:
        "border-neutral-200 text-neutral-700 hover:bg-neutral-100 bg-white",
      dotInactive: "#d4d4d8",
      dotActive: "var(--color-primary)",
    },
    eyebrow: "primary",
    title: "foreground",
    subtitle: "muted",
    bg: "bg-primary",
  },
};

export function getTheme(theme: SectionTheme): ThemeColors {
  return colorThemes[theme];
}
