import { redirect } from "next/navigation";

// De oude, kale voorbeeld-pagina (V2, afgekeurd 17-07: "moet showcase-niveau") is vervangen.
// Het voorbeeld is nu de ÉCHTE template van de bank, gepersonaliseerd via ?d= — zie
// funnelLooks.ts + de personalisatie-laag op de bank. Oude links komen hier binnen en
// gaan naar de keuze terug, zodat er nooit een dood adres of een oud ontwerp blijft staan.
export const metadata = { robots: { index: false, follow: false } };

export default function OudVoorbeeld() {
  redirect("/gratis-website");
}
