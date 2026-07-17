import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import GratisWebsiteContent from "./GratisWebsiteContent";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";

export const metadata: Metadata = {
  title: `Gratis Website Design voor ${niche} | ${siteDetails.siteName}`,
  description: `Kies een design, vul je gegevens in en bekijk direct een gepersonaliseerd voorbeeld van je nieuwe website voor ${niche}. 100% gratis.`,
  openGraph: {
    title: `Gratis Website Design voor ${niche} | ${siteDetails.siteName}`,
    description: `Kies uit 3 designs en zie direct je eigen website-voorbeeld. Website kopen vanaf €800 of het complete AI platform vanaf €79/maand.`,
    url: `${siteDetails.siteUrl}gratis-website`,
    type: "website",
    locale: "nl_NL",
  },
};

export default function GratisWebsitePage() {
  return <GratisWebsiteContent />;
}
