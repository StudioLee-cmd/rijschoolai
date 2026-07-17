import type { Metadata } from "next";
import { getAllPosts } from "@/utils/posts";
import VoorbeeldContent from "./VoorbeeldContent";

export const metadata: Metadata = {
  title: "Jouw website-voorbeeld | RijschoolAI",
  description: "Bekijk direct een gepersonaliseerd voorbeeld van je nieuwe rijschool-website, in het design dat jij koos.",
  robots: { index: false, follow: false },
};

export default async function VoorbeeldPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sp = (k: string) => {
    const v = params[k];
    return typeof v === "string" ? v : "";
  };

  const posts = getAllPosts().slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    date: p.date,
  }));

  return (
    <VoorbeeldContent
      lookParam={sp("look")}
      bedrijf={sp("bedrijf")}
      plaats={sp("plaats")}
      dienstenCsv={sp("diensten")}
      domein={sp("domein")}
      naam={sp("naam")}
      posts={posts}
    />
  );
}
