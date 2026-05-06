import * as Icons from "@lucide/astro";

export type AstroIconComponent = any;

export function resolveIcon(name?: string): AstroIconComponent | undefined {
  if (!name) return undefined;
  return (Icons as Record<string, AstroIconComponent>)[name];
}