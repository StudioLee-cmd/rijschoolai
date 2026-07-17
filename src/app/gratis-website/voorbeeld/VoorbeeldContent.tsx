"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LOOKS, DEFAULT_LOOK, isLookId, dienstLabels, type LookId } from "../lookConfig";

interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

interface Props {
  lookParam: string;
  bedrijf: string;
  plaats: string;
  dienstenCsv: string;
  domein: string;
  naam: string;
  posts: PostCard[];
}

interface LookProps {
  bedrijf: string;
  plaats: string;
  diensten: string[];
  domein: string;
  posts: PostCard[];
}

const DIENST_COPY: { [label: string]: string } = {
  "Autorijles (B)": "Praktijklessen in een moderne lesauto, opgebouwd in jouw tempo.",
  "Automaat": "Ontspannen leren rijden zonder schakelen, ideaal voor wie snel op weg wil.",
  "Motorrijles (A)": "AVB en AVD training met ervaren motorinstructeurs.",
  "Aanhanger (BE)": "Compact traject voor je BE rijbewijs, vaak in enkele dagen klaar.",
  "Theoriecursus": "Slagen voor je theorie met een gerichte cursus en oefenexamens.",
  "Spoedcursus": "Je rijbewijs op korte termijn met een intensief lesprogramma.",
  "Opfriscursus": "Weer vertrouwd achter het stuur na een lange pauze.",
};

function formatDate(d: string): string {
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

const VOORBEELD_REVIEWS = [
  { naam: "Sanne", tekst: "Superfijne rijschool. Duidelijke uitleg, veel geduld en in een keer geslaagd!" },
  { naam: "Mohammed", tekst: "Lessen sloten perfect aan op wat ik nodig had. Plannen ging altijd makkelijk." },
  { naam: "Lisa", tekst: "Door de rustige aanpak durfde ik steeds meer. Echt een aanrader." },
];

/* ---------- LOOK 1 · PREMIUM (donker, cinematic) ---------- */
function LookPremium({ bedrijf, plaats, diensten, domein, posts }: LookProps) {
  return (
    <div className="bg-[#0B0E13] text-[#EDEDEF]" style={{ fontFamily: "Manrope, sans-serif" }}>
      {/* Nav */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <span className="font-extrabold tracking-[0.15em] uppercase text-sm">{bedrijf}</span>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <a href="#p-diensten" className="hover:text-[#FFD84D] transition-colors">Lessen</a>
          <a href="#p-pakketten" className="hover:text-[#FFD84D] transition-colors">Pakketten</a>
          <a href="#p-reviews" className="hover:text-[#FFD84D] transition-colors">Reviews</a>
          <a href="#p-blog" className="hover:text-[#FFD84D] transition-colors">Blog</a>
        </div>
        <a href="#claim" className="bg-[#FFD84D] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition-all">
          Plan een proefles
        </a>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#FFD84D]/10 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
          <div>
            <p className="text-[#FFD84D] text-sm font-bold tracking-[0.2em] uppercase mb-4">Rijschool in {plaats}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
              Haal je rijbewijs met vertrouwen.
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              Bij {bedrijf} leer je rijden in je eigen tempo, met vaste instructeurs en heldere afspraken. Les in {plaats} en omgeving.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#claim" className="bg-[#FFD84D] text-black font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all">
                Gratis proefles plannen
              </a>
              <a href="#p-pakketten" className="border border-white/25 text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#FFD84D] hover:text-[#FFD84D] transition-all">
                Bekijk pakketten
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">Waarom {bedrijf}</p>
              <ul className="space-y-5">
                {["Vaste instructeur, vast lesmoment", `Ophalen in ${plaats} en omgeving`, "Les in je eigen tempo, zonder druk", "Heldere pakketten, geen verrassingen"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-[#FFD84D] text-black text-xs font-black flex items-center justify-center">✓</span>
                    <span className="text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Diensten */}
      <section id="p-diensten" className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-[#FFD84D] text-sm font-bold tracking-[0.2em] uppercase mb-3">Onze lessen</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10">Dit leer je bij {bedrijf}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diensten.map((d) => (
            <div key={d} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#FFD84D]/50 transition-colors">
              <h3 className="font-bold text-lg mb-2">{d}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{DIENST_COPY[d] || "Vraag naar de mogelijkheden."}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pakketten */}
      <section id="p-pakketten" className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#FFD84D] text-sm font-bold tracking-[0.2em] uppercase mb-3">Pakketten</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">Kies wat bij je past</h2>
            </div>
            <span className="text-xs text-white/40 border border-white/15 rounded-full px-3 py-1.5">Voorbeeldprijzen, vullen we samen in</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { naam: "Proefpakket", prijs: "€ —", punten: ["1 proefles", "Persoonlijk lesadvies", "Vrijblijvend"] },
              { naam: "Compleet", prijs: "€ —", punten: ["Volledig lespakket", "Inclusief examen", "Meest gekozen"], featured: true },
              { naam: "Spoed", prijs: "€ —", punten: ["Intensief traject", "Snel je rijbewijs", "Op korte termijn"] },
            ].map((p) => (
              <div key={p.naam} className={`rounded-2xl p-8 ${p.featured ? "bg-[#FFD84D] text-black" : "border border-white/10 bg-white/[0.03]"}`}>
                <h3 className="font-extrabold text-xl mb-1">{p.naam}</h3>
                <p className={`text-3xl font-extrabold mb-6 ${p.featured ? "" : "text-[#FFD84D]"}`}>{p.prijs}</p>
                <ul className={`space-y-2 text-sm ${p.featured ? "text-black/75" : "text-white/65"}`}>
                  {p.punten.map((pt) => <li key={pt}>• {pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="p-reviews" className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-[#FFD84D] text-sm font-bold tracking-[0.2em] uppercase mb-3">Reviews</p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Wat leerlingen zeggen</h2>
        <p className="text-white/40 text-sm mb-10">Voorbeeldteksten. Hier komen jouw echte reviews.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VOORBEELD_REVIEWS.map((r) => (
            <figure key={r.naam} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-[#FFD84D] mb-3">★★★★★</div>
              <blockquote className="text-white/80 text-sm leading-relaxed mb-4">{r.tekst}</blockquote>
              <figcaption className="text-white/50 text-sm font-semibold">{r.naam}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="p-blog" className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-[#FFD84D] text-sm font-bold tracking-[0.2em] uppercase mb-3">Kennisbank</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">Tips voor leerlingen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[#FFD84D]/50 transition-colors">
                {post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover" />
                ) : (
                  <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#FFD84D]/20 to-transparent" />
                )}
                <div className="p-5">
                  <p className="text-white/40 text-xs mb-2">{formatDate(post.date)}</p>
                  <h3 className="font-bold leading-snug group-hover:text-[#FFD84D] transition-colors">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-extrabold tracking-[0.15em] uppercase text-sm mb-1">{bedrijf}</p>
            <p className="text-white/50 text-sm">Rijschool in {plaats} · {domein}</p>
          </div>
          <a href="#claim" className="bg-[#FFD84D] text-black text-sm font-bold px-6 py-3 rounded-full hover:brightness-110 transition-all">
            Plan een gratis proefles
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ---------- LOOK 2 · WARM (licht, persoonlijk) ---------- */
function LookWarm({ bedrijf, plaats, diensten, domein, posts }: LookProps) {
  const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };
  return (
    <div className="bg-[#FAF5EC] text-[#2A2419]">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <span className="font-bold text-xl" style={serif}>{bedrijf}</span>
        <div className="hidden md:flex items-center gap-6 text-sm text-[#6B6154]">
          <a href="#w-diensten" className="hover:text-[#C0563A] transition-colors">Lessen</a>
          <a href="#w-pakketten" className="hover:text-[#C0563A] transition-colors">Tarieven</a>
          <a href="#w-reviews" className="hover:text-[#C0563A] transition-colors">Ervaringen</a>
          <a href="#w-blog" className="hover:text-[#C0563A] transition-colors">Blog</a>
        </div>
        <a href="#claim" className="bg-[#C0563A] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#A84730] transition-colors">
          Gratis proefles
        </a>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#40604C] font-semibold mb-4">Rijschool in {plaats}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={serif}>
            Rijles die bij jou past.
          </h1>
          <p className="text-[#6B6154] text-lg mb-8 max-w-md leading-relaxed">
            Rustig leren rijden met persoonlijke aandacht. Bij {bedrijf} staat jouw tempo centraal, van de eerste les tot het examen.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#claim" className="bg-[#C0563A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#A84730] transition-colors">
              Plan je gratis proefles
            </a>
            <a href="#w-diensten" className="text-[#40604C] font-semibold px-7 py-3.5 underline underline-offset-4 hover:text-[#C0563A] transition-colors">
              Bekijk onze lessen
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] bg-[#40604C] text-[#FAF5EC] p-8 md:p-10">
          <p className="text-sm uppercase tracking-widest text-[#FAF5EC]/60 mb-6">Zo werken wij</p>
          <ul className="space-y-5">
            {["Kennismaken met een gratis proefles", "Een persoonlijk lesplan op jouw niveau", `Ophalen thuis of op school in ${plaats}`, "Rustig toewerken naar je examen"].map((t, i) => (
              <li key={t} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-[#FAF5EC] text-[#40604C] font-bold text-sm flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Diensten */}
      <section id="w-diensten" className="bg-white/60 border-y border-[#E8DFD0]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={serif}>Onze lessen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diensten.map((d) => (
              <div key={d} className="rounded-2xl bg-white border border-[#E8DFD0] p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2" style={serif}>{d}</h3>
                <p className="text-[#6B6154] text-sm leading-relaxed">{DIENST_COPY[d] || "Vraag naar de mogelijkheden."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section id="w-pakketten" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={serif}>Tarieven</h2>
          <span className="inline-block text-xs text-[#6B6154] border border-[#E8DFD0] bg-white rounded-full px-3 py-1.5">Voorbeeldprijzen, vullen we samen in</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { naam: "Proefles", prijs: "€ —", punten: ["Een volledige les", "Persoonlijk advies", "Geheel vrijblijvend"] },
            { naam: "Lespakket", prijs: "€ —", punten: ["Compleet traject", "Inclusief examen", "Meest gekozen"], featured: true },
            { naam: "Losse lessen", prijs: "€ —", punten: ["Flexibel plannen", "Per les betalen", "Geen verplichting"] },
          ].map((p) => (
            <div key={p.naam} className={`rounded-[1.5rem] p-8 text-center ${p.featured ? "bg-[#C0563A] text-white shadow-lg" : "bg-white border border-[#E8DFD0]"}`}>
              <h3 className="font-bold text-xl mb-1" style={serif}>{p.naam}</h3>
              <p className="text-3xl font-bold mb-6">{p.prijs}</p>
              <ul className={`space-y-2 text-sm ${p.featured ? "text-white/85" : "text-[#6B6154]"}`}>
                {p.punten.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="w-reviews" className="bg-[#40604C] text-[#FAF5EC]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center" style={serif}>Ervaringen van leerlingen</h2>
          <p className="text-[#FAF5EC]/50 text-sm text-center mb-10">Voorbeeldteksten. Hier komen jouw echte reviews.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOORBEELD_REVIEWS.map((r) => (
              <figure key={r.naam} className="rounded-2xl bg-[#FAF5EC]/10 p-6">
                <div className="text-[#F0C64A] mb-3">★★★★★</div>
                <blockquote className="text-[#FAF5EC]/90 text-sm leading-relaxed mb-4" style={serif}>{r.tekst}</blockquote>
                <figcaption className="text-[#FAF5EC]/60 text-sm font-semibold">{r.naam}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="w-blog" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={serif}>Handige artikelen</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl bg-white border border-[#E8DFD0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover" />
              ) : (
                <div className="w-full aspect-[16/9] bg-[#40604C]/10" />
              )}
              <div className="p-5">
                <p className="text-[#6B6154] text-xs mb-2">{formatDate(post.date)}</p>
                <h3 className="font-bold leading-snug group-hover:text-[#C0563A] transition-colors" style={serif}>{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8DFD0] bg-white/60">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg mb-1" style={serif}>{bedrijf}</p>
            <p className="text-[#6B6154] text-sm">Rijschool in {plaats} · {domein}</p>
          </div>
          <a href="#claim" className="bg-[#C0563A] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#A84730] transition-colors">
            Gratis proefles plannen
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ---------- LOOK 3 · EDITORIAL (groot, gedurfd) ---------- */
function LookEditorial({ bedrijf, plaats, diensten, domein, posts }: LookProps) {
  return (
    <div className="bg-white text-[#111111]" style={{ fontFamily: "Manrope, sans-serif" }}>
      {/* Nav */}
      <nav className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <span className="font-black uppercase tracking-tight text-lg">{bedrijf}</span>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase">
            <a href="#e-diensten" className="hover:text-[#E8402A] transition-colors">Lessen</a>
            <a href="#e-pakketten" className="hover:text-[#E8402A] transition-colors">Pakketten</a>
            <a href="#e-reviews" className="hover:text-[#E8402A] transition-colors">Reviews</a>
            <a href="#e-blog" className="hover:text-[#E8402A] transition-colors">Blog</a>
          </div>
          <a href="#claim" className="bg-[#E8402A] text-white text-sm font-black uppercase px-5 py-2.5 hover:bg-black transition-colors">
            Proefles →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <p className="font-bold uppercase tracking-[0.25em] text-sm mb-6">Rijschool · {plaats}</p>
          <h1 className="font-black uppercase leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-8xl mb-8">
            Rijbewijs.<br /><span className="text-[#E8402A]">Geregeld.</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <p className="text-lg text-[#444444] max-w-md leading-relaxed">
              {bedrijf} leert je rijden zoals het hoort: duidelijk, direct en zonder omwegen. Les in {plaats} en omgeving.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href="#claim" className="bg-black text-white font-black uppercase px-8 py-4 hover:bg-[#E8402A] transition-colors">
                Plan je proefles
              </a>
              <a href="#e-pakketten" className="border-2 border-black font-black uppercase px-8 py-4 hover:bg-black hover:text-white transition-colors">
                Pakketten
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* USP strip */}
      <div className="border-b-2 border-black bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold uppercase">
          <span>✓ Vaste instructeur</span>
          <span>✓ Ophalen in {plaats}</span>
          <span>✓ Heldere prijzen</span>
          <span>✓ Les in eigen tempo</span>
        </div>
      </div>

      {/* Diensten */}
      <section id="e-diensten" className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-black uppercase tracking-tight text-3xl md:text-5xl mb-10">Onze lessen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t-2 border-l-2 border-black">
            {diensten.map((d, i) => (
              <div key={d} className="border-b-2 border-r-2 border-black p-6 md:p-8 hover:bg-[#F5F3EF] transition-colors">
                <p className="text-[#E8402A] font-black text-sm mb-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-black uppercase text-xl mb-2">{d}</h3>
                <p className="text-[#444444] text-sm leading-relaxed">{DIENST_COPY[d] || "Vraag naar de mogelijkheden."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section id="e-pakketten" className="border-b-2 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="font-black uppercase tracking-tight text-3xl md:text-5xl">Pakketten</h2>
            <span className="text-xs uppercase font-bold text-white/50 border border-white/30 px-3 py-1.5">Voorbeeldprijzen, vullen we samen in</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/30">
            {[
              { naam: "Proef", prijs: "€ —", punten: ["1 proefles", "Lesadvies", "Vrijblijvend"] },
              { naam: "Compleet", prijs: "€ —", punten: ["Volledig pakket", "Inclusief examen", "Meest gekozen"], featured: true },
              { naam: "Spoed", prijs: "€ —", punten: ["Intensief traject", "Korte termijn", "Maximale focus"] },
            ].map((p) => (
              <div key={p.naam} className={`p-8 ${p.featured ? "bg-[#E8402A]" : "bg-black"}`}>
                <h3 className="font-black uppercase text-xl mb-1">{p.naam}</h3>
                <p className="text-4xl font-black mb-6">{p.prijs}</p>
                <ul className="space-y-2 text-sm text-white/80 uppercase font-semibold">
                  {p.punten.map((pt) => <li key={pt}>— {pt}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="e-reviews" className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-black uppercase tracking-tight text-3xl md:text-5xl mb-2">Reviews</h2>
          <p className="text-[#888888] text-sm uppercase font-bold mb-10">Voorbeeldteksten. Hier komen jouw echte reviews.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VOORBEELD_REVIEWS.map((r) => (
              <figure key={r.naam} className="border-l-4 border-[#E8402A] pl-5">
                <blockquote className="text-lg font-semibold leading-snug mb-3">{r.tekst}</blockquote>
                <figcaption className="text-sm font-black uppercase text-[#888888]">{r.naam}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="e-blog" className="border-b-2 border-black bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-black uppercase tracking-tight text-3xl md:text-5xl mb-10">Uit de kennisbank</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white border-2 border-black overflow-hidden hover:-translate-y-1 transition-transform">
                {post.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover border-b-2 border-black" />
                ) : (
                  <div className="w-full aspect-[16/9] bg-[#E8402A]/10 border-b-2 border-black" />
                )}
                <div className="p-5">
                  <p className="text-[#888888] text-xs uppercase font-bold mb-2">{formatDate(post.date)}</p>
                  <h3 className="font-black leading-snug group-hover:text-[#E8402A] transition-colors">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-black uppercase tracking-tight text-lg mb-1">{bedrijf}</p>
            <p className="text-white/60 text-sm uppercase font-semibold">Rijschool · {plaats} · {domein}</p>
          </div>
          <a href="#claim" className="bg-[#E8402A] text-white text-sm font-black uppercase px-6 py-3 hover:bg-white hover:text-black transition-colors">
            Plan je proefles →
          </a>
        </div>
      </footer>
    </div>
  );
}

/* ---------- DE PREVIEW-SHELL ---------- */
export default function VoorbeeldContent(props: Props) {
  const initialLook: LookId = isLookId(props.lookParam) ? props.lookParam : DEFAULT_LOOK;
  const [look, setLook] = useState<LookId>(initialLook);

  const isDemo = !props.bedrijf;
  const bedrijf = props.bedrijf || "Jouw Rijschool";
  const plaats = props.plaats || "jouw regio";
  const diensten = dienstLabels(props.dienstenCsv);
  const domein = props.domein || `${bedrijf.toLowerCase().replace(/[^a-z0-9]/g, "")}.nl`;
  const voornaam = props.naam.split(" ")[0] || "";

  const lookProps: LookProps = { bedrijf, plaats, diensten, domein, posts: props.posts };

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#111111]" data-theme="light">
      {/* Preview-bar */}
      <div className="sticky top-0 z-50 bg-[#111111] text-white border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/gratis-website" className="text-white/60 hover:text-white text-sm whitespace-nowrap transition-colors">← Terug</Link>
            <span className="hidden sm:inline text-white/30">|</span>
            <p className="text-sm truncate">
              <span className="text-[#7CE7A0] font-bold">Gratis voorbeeld</span>
              <span className="text-white/60"> voor </span>
              <span className="font-bold">{bedrijf}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {LOOKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLook(l.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${look === l.id ? "bg-white text-black" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                {l.naam}
              </button>
            ))}
            <a href="#claim" className="ml-2 bg-[#7CE7A0] text-black text-xs font-bold px-4 py-1.5 rounded-full hover:brightness-110 transition-all whitespace-nowrap">
              Deze wil ik →
            </a>
          </div>
        </div>
      </div>

      {/* Demo-banner (alleen zonder ingevulde gegevens) */}
      {isDemo && (
        <div className="bg-[#7CE7A0] text-black text-center text-sm font-semibold px-4 py-2.5">
          Dit is een demo-voorbeeld. <Link href="/gratis-website" className="underline font-bold">Maak binnen 1 minuut jouw eigen versie →</Link>
        </div>
      )}

      {/* Fake browser-frame */}
      <div className="bg-[#1C1C1E] px-4 py-2.5 flex items-center gap-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 max-w-xl mx-auto bg-black/40 text-white/70 text-xs rounded-md px-4 py-1.5 text-center truncate">
          https://www.{domein}
        </div>
        <div className="w-12" />
      </div>

      {/* De gekozen look */}
      {look === "premium" && <LookPremium {...lookProps} />}
      {look === "warm" && <LookWarm {...lookProps} />}
      {look === "editorial" && <LookEditorial {...lookProps} />}

      {/* Claim-sectie */}
      <section id="claim" className="bg-[#111111] text-white border-t border-white/15">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-[#7CE7A0] text-sm font-bold uppercase tracking-widest mb-3">En nu?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {isDemo ? "Zo kan jouw website eruitzien" : `Mooi hè${voornaam ? `, ${voornaam}` : ""}? Dit is nog maar het voorbeeld.`}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            {isDemo
              ? "Vul het formulier in en zie dit voorbeeld met jouw eigen bedrijfsnaam, plaats en diensten."
              : `Je aanvraag is binnen. Wij bouwen dit design volledig voor je af, met echte teksten, foto's en jouw eigen domein. Binnen 48 uur ontvang je de link op je e-mail. 100% gratis en vrijblijvend.`}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {isDemo ? (
              <Link href="/gratis-website" className="bg-[#7CE7A0] text-black font-bold px-8 py-3.5 rounded-full hover:brightness-110 transition-all">
                Maak mijn eigen voorbeeld
              </Link>
            ) : (
              <a href={`mailto:tim@studiolee.nl?subject=${encodeURIComponent(`Gratis website ${bedrijf}`)}`} className="bg-[#7CE7A0] text-black font-bold px-8 py-3.5 rounded-full hover:brightness-110 transition-all">
                Vraag stellen? Mail direct
              </a>
            )}
            <Link href="/tarieven" className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:border-[#7CE7A0] hover:text-[#7CE7A0] transition-all">
              Bekijk de tarieven
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-8">
            Tip: wissel bovenaan van design om alle drie de stijlen met jouw gegevens te zien.
          </p>
        </div>
      </section>
    </div>
  );
}
