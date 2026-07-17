// Gedeelde config voor de gratis-website funnel: de 3 looks + de diensten-opties.
// Eén bron voor wizard (GratisWebsiteContent) én preview (voorbeeld/VoorbeeldContent).

export type LookId = "premium" | "warm" | "editorial";

export const LOOKS: { id: LookId; naam: string; tagline: string }[] = [
  {
    id: "premium",
    naam: "Premium",
    tagline: "Donker en cinematic. Maximale eerste indruk.",
  },
  {
    id: "warm",
    naam: "Warm",
    tagline: "Licht en persoonlijk. Toegankelijk voor iedereen.",
  },
  {
    id: "editorial",
    naam: "Editorial",
    tagline: "Groot, gedurfd en modern. Valt gegarandeerd op.",
  },
];

export const DEFAULT_LOOK: LookId = "premium";

export function isLookId(v: string): v is LookId {
  return v === "premium" || v === "warm" || v === "editorial";
}

export const DIENSTEN: { id: string; label: string }[] = [
  { id: "auto", label: "Autorijles (B)" },
  { id: "automaat", label: "Automaat" },
  { id: "motor", label: "Motorrijles (A)" },
  { id: "aanhanger", label: "Aanhanger (BE)" },
  { id: "theorie", label: "Theoriecursus" },
  { id: "spoed", label: "Spoedcursus" },
  { id: "opfris", label: "Opfriscursus" },
];

export function dienstLabels(csv: string): string[] {
  const ids = csv.split(",").map((s) => s.trim()).filter(Boolean);
  const labels = ids
    .map((id) => DIENSTEN.find((d) => d.id === id)?.label)
    .filter((l): l is string => Boolean(l));
  return labels.length ? labels : ["Autorijles (B)", "Theoriecursus"];
}
