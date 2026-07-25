import type { Metadata } from "next";
import { siteDetails } from "@/data/siteDetails";
import GratisWebsiteContent from "./GratisWebsiteContent";
import { fetchLooks } from "./funnelLooks";

const niche = siteDetails.niche?.toLowerCase() || "bedrijven";

// De sleutel waaronder deze site z'n looks ophaalt uit funnel-looks.json (RijschoolAI → rijschoolai).
const SITE_KEY = siteDetails.siteName.toLowerCase();

export const metadata: Metadata = {
  title: `Gratis website-ontwerp voor ${niche} | ${siteDetails.siteName}`,
  description: `Kies een ontwerp, vul je bedrijfsnaam in en zie direct je eigen website. Het ontwerpbestand is gratis van jou; het draaiend krijgen doen wij.`,
  openGraph: {
    title: `Gratis website-ontwerp voor ${niche} | ${siteDetails.siteName}`,
    description: `Kies uit onze echte websites, vul je naam in en bekijk 'm meteen als de jouwe. Het ontwerpbestand krijg je gratis.`,
    url: `${siteDetails.siteUrl}gratis-website`,
    type: "website",
    locale: "nl_NL",
  },
  alternates: { canonical: `${siteDetails.siteUrl}gratis-website` },
};

// De look-supply komt van de template-bank (register → funnel-looks.json), niet uit deze repo.
export const revalidate = 1800;

export default async function GratisWebsitePage() {
  const looks = await fetchLooks(SITE_KEY);
  return <GratisWebsiteContent looks={looks} />;
}
