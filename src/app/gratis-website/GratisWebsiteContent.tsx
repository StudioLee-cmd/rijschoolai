"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsArrowRight, BsArrowLeft, BsCheck2, BsBoxArrowUpRight, BsStars,
  BsChatDots, BsTelephone, BsGraphUpArrow, BsWindowDesktop,
} from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";
import { type FunnelLook, type Prospect, previewUrl } from "./funnelLooks";

const niche = siteDetails.niche || "Bedrijven";
const nicheLower = niche.toLowerCase();

// Nederlands enkelvoud is niet af te leiden met een regel ("rijscholen" → "rijschol"), dus:
// een kleine vloot-tabel met een natuurlijke terugval ("jouw zaak") voor alles wat er niet in staat.
const ENKELVOUD: Record<string, string> = {
  rijscholen: "rijschool", kappers: "kapper", kapsalons: "kapsalon", barbershops: "barbershop",
  loodgieters: "loodgieter", hoveniers: "hovenier", elektriciens: "elektricien", dakdekkers: "dakdekker",
  verhuizers: "verhuisbedrijf", makelaars: "makelaardij", fietsenmakers: "fietsenzaak",
  klinieken: "kliniek", huisartsen: "praktijk", dierenartsen: "praktijk", tandartsen: "praktijk",
  fysiotherapeuten: "praktijk", schilders: "schildersbedrijf", stukadoors: "stukadoorsbedrijf",
  restaurants: "restaurant", garages: "garage", schoonmaakbedrijven: "schoonmaakbedrijf",
};
const nicheSingular = ENKELVOUD[nicheLower] || "zaak";

const WEBHOOK_URL = "https://n8n.aireclamestudio.nl/webhook/freewebsite";

// De prijsladder — SSOT: alpha1/data/platform/prices.json (self/managed/websiteBuyout).
// Wijzigen doe je dáár; deze regel volgt bij de copy-rollout mee.
const PRIJS = { start: 79, alles: 279, afkoop: 800 };

/* ─────────────────────────────────────────────────────────────────────────────
   DE VIER DINGEN — het propositie-contract (niche-sites-upgrade-programma.md
   §PROPOSITIE-CONTRACT ①). Precies vier, nooit een vijfde, nooit een tool-naam.
   ───────────────────────────────────────────────────────────────────────────── */
const VIER = [
  { icon: BsChatDots, titel: "Een chatbot op je site", tekst: "Vangt de bezoeker op die liever typt dan belt — ook om 23:00." },
  { icon: BsTelephone, titel: "Een telefoon die opneemt", tekst: `Neemt op als jij aan het werk bent, en plant de afspraak meteen in.` },
  { icon: BsGraphUpArrow, titel: "Marketing die doorloopt", tekst: "Je wordt gevonden, je klanten horen van je en je krijgt betaald — zonder dat jij eraan denkt." },
  { icon: BsWindowDesktop, titel: "Een site die zichzelf bijhoudt", tekst: "Nieuwe teksten en beelden komen er vanzelf bij. Over een jaar staat 'ie er nóg goed bij." },
];

export default function GratisWebsiteContent({ looks }: { looks: FunnelLook[] }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [look, setLook] = useState<FunnelLook | null>(null);
  const [form, setForm] = useState({ bedrijf: "", plaats: "", contact: "", email: "", telefoon: "", domein: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [klaar, setKlaar] = useState<string>("");

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const kies = (l: FunnelLook) => {
    setLook(l);
    setStep(2);
    setTimeout(() => document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!look) return;
    if (!form.bedrijf || !form.plaats || !form.contact || !form.email) {
      setError("Vul je bedrijfsnaam, plaats, naam en e-mailadres in — dan kan ik je voorbeeld maken.");
      return;
    }
    setBusy(true);

    const prospect: Prospect = {
      naam: form.bedrijf,
      plaats: form.plaats,
      telefoon: form.telefoon || undefined,
      domein: form.domein || undefined,
      email: form.email,
      b: siteDetails.siteUrl.replace(/\/$/, ""),
    };
    const url = previewUrl(look, prospect);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: form.bedrijf,
          contactName: form.contact,
          email: form.email,
          phone: form.telefoon,
          city: form.plaats,
          domain: form.domein,
          niche,
          look: look.slug,
          lookLabel: look.label,
          previewUrl: url,
          bron: `${siteDetails.siteName} /gratis-website`,
        }),
      });
    } catch {
      /* de aanvraag mag nooit tussen de bezoeker en z'n voorbeeld staan — we sturen 'm door
         en houden het adres hieronder zichtbaar als er iets misging met verzenden */
    }
    setKlaar(url);
    window.location.href = url;
  };

  const geenLooks = looks.length === 0;

  return (
    <main className="pt-24 md:pt-32">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-10 md:pt-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/15 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-5"
          >
            <BsStars /> Het ontwerp is gratis — het bestand is van jou
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 !leading-tight"
          >
            Kies het ontwerp voor jouw {nicheSingular}. Met jouw naam erin.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent"
          >
            Geen schets en geen offerte: je kiest een van onze echte websites, vult je bedrijfsnaam
            en plaats in, en ziet 'm meteen als de jouwe. Het ontwerpbestand krijg je gratis mee.
          </motion.p>
        </div>
      </section>

      {/* ── WIZARD ───────────────────────────────────────────────────────── */}
      <section id="wizard" className="py-10 md:py-14 px-4 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          {/* stappen */}
          <div className="flex items-center justify-center gap-3 md:gap-5 mb-10 text-sm">
            {[
              { n: 1, t: "Kies je ontwerp" },
              { n: 2, t: "Vul je gegevens in" },
              { n: 3, t: "Bekijk je voorbeeld" },
            ].map((s, i) => (
              <React.Fragment key={s.n}>
                <div className={`flex items-center gap-2 ${step >= s.n ? "text-foreground" : "text-foreground-accent/60"}`}>
                  <span className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold border ${
                    step > s.n ? "bg-primary border-primary text-black"
                    : step === s.n ? "border-primary text-primary" : "border-foreground-accent/30"}`}>
                    {step > s.n ? <BsCheck2 /> : s.n}
                  </span>
                  <span className="hidden sm:inline font-medium">{s.t}</span>
                </div>
                {i < 2 && <span className="w-6 md:w-12 h-px bg-foreground-accent/25" />}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {geenLooks ? `Ontwerpen voor ${nicheLower}` : `Welk ontwerp past bij jouw ${nicheSingular}?`}
                  </h2>
                  <p className="text-foreground-accent">
                    {geenLooks
                      ? "De ontwerpen voor deze branche staan klaar bij ons — vraag ze even op, dan stuur ik ze je door."
                      : "Dit zijn echte websites, geen schetsen. Klik erop om 'm helemaal te bekijken."}
                  </p>
                </div>

                {geenLooks ? (
                  <div className="max-w-xl mx-auto text-center bg-white/5 border border-foreground-accent/15 rounded-2xl p-8">
                    <p className="text-foreground-accent mb-5">
                      Mail me je bedrijfsnaam en plaats, dan stuur ik je binnen een dag een voorbeeld op jouw naam.
                    </p>
                    <a href="mailto:tim@studiolee.nl" className="inline-flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-full">
                      Vraag je voorbeeld aan <BsArrowRight />
                    </a>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${looks.length === 1 ? "max-w-2xl mx-auto" : "md:grid-cols-2 xl:grid-cols-3"}`}>
                    {looks.map((l, i) => (
                      <motion.div
                        key={l.slug}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                        className="group rounded-2xl overflow-hidden bg-white/5 border border-foreground-accent/15 hover:border-primary/60 transition-colors flex flex-col"
                      >
                        <button onClick={() => kies(l)} className="relative block w-full text-left" aria-label={`Kies ontwerp ${l.label}`}>
                          <span className="block relative aspect-[16/10] overflow-hidden bg-black/20">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={l.thumb} alt={`Voorbeeld van het ontwerp ${l.label}`} loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          </span>
                          {l.tier === "showcase" && (
                            <span className="absolute top-3 left-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur">
                              Onze showcase
                            </span>
                          )}
                        </button>
                        <div className="p-5 flex flex-col gap-3 flex-1">
                          <div>
                            <h3 className="text-lg font-bold">{l.label}</h3>
                            <p className="text-sm text-foreground-accent mt-1">{l.tagline}</p>
                          </div>
                          <div className="mt-auto flex items-center gap-3 pt-1">
                            <button onClick={() => kies(l)} className="flex-1 bg-primary text-black font-bold text-sm px-4 py-2.5 rounded-full inline-flex items-center justify-center gap-2">
                              Dit wil ik <BsArrowRight />
                            </button>
                            <a href={l.url} target="_blank" rel="noopener noreferrer"
                               className="text-sm font-semibold text-foreground-accent hover:text-primary inline-flex items-center gap-1.5">
                              Bekijken <BsBoxArrowUpRight className="text-xs" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && look && (
              <motion.div key="s2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start max-w-5xl mx-auto">
                {/* gekozen ontwerp */}
                <div className="rounded-2xl overflow-hidden border border-foreground-accent/15 bg-white/5">
                  <div className="relative aspect-[16/10] bg-black/20 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={look.thumb} alt={`Gekozen ontwerp: ${look.label}`} loading="lazy"
                         className="absolute inset-0 w-full h-full object-cover object-top" />
                  </div>
                  <div className="p-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-foreground-accent">Jouw keuze</p>
                      <p className="font-bold">{look.label}</p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-sm font-semibold text-foreground-accent hover:text-primary inline-flex items-center gap-1.5">
                      <BsArrowLeft /> Ander ontwerp
                    </button>
                  </div>
                </div>

                {/* formulier */}
                <form onSubmit={submit} className="rounded-2xl border border-foreground-accent/15 bg-white/5 p-6 md:p-7">
                  <h2 className="text-xl md:text-2xl font-bold mb-1">Zo komt jouw naam erin</h2>
                  <p className="text-sm text-foreground-accent mb-5">Duurt een halve minuut. Daarna zie je 'm meteen.</p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { n: "bedrijf", l: `Naam van je ${nicheSingular}`, p: "Bijv. Van Dijk & Zn", req: true },
                      { n: "plaats", l: "Plaats", p: "Bijv. Zwolle", req: true },
                      { n: "contact", l: "Jouw naam", p: "Bijv. Sanne", req: true },
                      { n: "email", l: "E-mailadres", p: "jij@bedrijf.nl", req: true, type: "email" },
                      { n: "telefoon", l: "Telefoonnummer", p: "Optioneel" },
                      { n: "domein", l: "Gewenste domeinnaam", p: "Optioneel" },
                    ].map((f) => (
                      <label key={f.n} className={`block text-sm ${f.n === "bedrijf" ? "sm:col-span-2" : ""}`}>
                        <span className="font-medium">{f.l}{f.req && <span className="text-primary"> *</span>}</span>
                        <input
                          name={f.n} type={f.type || "text"} placeholder={f.p} required={f.req}
                          value={(form as Record<string, string>)[f.n]} onChange={change}
                          className="mt-1.5 w-full rounded-xl border border-foreground-accent/25 bg-background px-4 py-2.5 outline-none focus:border-primary"
                        />
                      </label>
                    ))}
                  </div>

                  {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

                  <button type="submit" disabled={busy}
                    className="mt-6 w-full bg-primary text-black font-bold px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
                    {busy ? "Je voorbeeld wordt klaargezet…" : <>Laat mijn voorbeeld zien <BsArrowRight /></>}
                  </button>

                  {klaar && (
                    <p className="mt-3 text-sm text-foreground-accent">
                      Opent niet vanzelf? <a className="text-primary font-semibold underline" href={klaar}>Klik hier voor je voorbeeld</a>.
                    </p>
                  )}
                  <p className="mt-3 text-xs text-foreground-accent">
                    Je gegevens gaan alleen naar mij, zodat ik je het ontwerpbestand kan sturen. Geen verplichtingen.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── GRATIS ↔ BETAALD — de lijn ───────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-hero-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Wat je gratis krijgt, en wat niet</h2>
            <p className="text-foreground-accent max-w-2xl mx-auto">
              Eerlijk verhaal, want daar heb je meer aan dan aan kleine lettertjes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-7">
              <p className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Gratis</p>
              <h3 className="text-xl font-bold mb-3">Het ontwerp. En het bestand.</h3>
              <p className="text-foreground-accent mb-4">
                Je kiest een van onze websites, ziet 'm op je eigen naam, en het ontwerpbestand is van jou.
                Geen bedenktijd, geen voorwaarden, geen proefperiode die stiekem doorloopt.
              </p>
              <ul className="space-y-2 text-sm">
                {["Het complete ontwerp", "Je eigen naam en plaats erin", "Het bestand, om te houden"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><BsCheck2 className="text-primary mt-1 flex-none" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-foreground-accent/20 bg-white/5 p-7">
              <p className="text-sm font-bold uppercase tracking-wider text-foreground-accent mb-3">Het abonnement</p>
              <h3 className="text-xl font-bold mb-3">Het draaiend krijgen. En houden.</h3>
              <p className="text-foreground-accent mb-4">
                Een website die stilstaat levert niets op. Live zetten, gevonden worden, teksten die blijven
                komen, iemand die opneemt — dát is het werk, en dat zit in het abonnement.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  `Vanaf €${PRIJS.start} per maand: live gezet en draaiend`,
                  `€${PRIJS.alles} per maand: alles uit handen, ook de teksten en de vindbaarheid`,
                  "Samen goedkoper dan de losse dingen apart",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2"><BsCheck2 className="text-foreground-accent mt-1 flex-none" /> {t}</li>
                ))}
              </ul>
              <Link href="/tarieven" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary">
                Bekijk wat erin zit <BsArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DE VIER DINGEN ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Wat er daarna voor je werkt</h2>
            <p className="text-foreground-accent max-w-2xl mx-auto">
              Vier dingen, en niet meer dan dat. Ze doen samen het werk waar jij geen tijd voor hebt.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VIER.map((v) => (
              <div key={v.titel} className="rounded-2xl border border-foreground-accent/15 bg-white/5 p-6 flex gap-4">
                <span className="w-11 h-11 flex-none rounded-xl bg-primary/15 text-primary grid place-items-center text-xl">
                  <v.icon />
                </span>
                <div>
                  <h3 className="font-bold mb-1">{v.titel}</h3>
                  <p className="text-sm text-foreground-accent">{v.tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-hero-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Veelgestelde vragen</h2>
          <div className="space-y-3">
            {[
              { q: "Is het echt gratis?", a: "Ja. Je kiest een ontwerp, vult je gegevens in en ziet 'm meteen op je eigen naam. Het ontwerpbestand krijg je van me, zonder voorwaarden." },
              { q: "Wat kost het dan wél?", a: `Het draaiend krijgen. Live zetten, gevonden worden, de teksten die blijven komen — dat is het abonnement, vanaf €${PRIJS.start} per maand. Wil je er helemaal niet naar omkijken, dan is dat €${PRIJS.alles} per maand.` },
              { q: "Kan ik de website ook gewoon afkopen?", a: `Dat kan, voor €${PRIJS.afkoop} eenmalig. Eerlijk gezegd raad ik het de meesten af: je hebt dan het ontwerp, maar niemand die 'm live houdt, vult en vindbaar maakt. Een site die stilstaat levert niets op.` },
              { q: "Wat moet ik zelf doen?", a: "Je bedrijfsnaam en plaats invullen. De rest — het ontwerp, de teksten, de beelden — staat er al. Weet je niet hoe je het bestand zelf draaiend krijgt? Dan leg ik dat gratis uit." },
              { q: "Hoe snel zie ik iets?", a: "Meteen. Je voorbeeld staat er zodra je op de knop drukt, met jouw naam erin." },
              { q: `Moet ik al een website hebben?`, a: `Nee. De meeste ${nicheLower} die dit invullen hebben nog niets, of iets van jaren geleden. Je hebt alleen je bedrijfsnaam en plaats nodig.` },
            ].map((f) => (
              <details key={f.q} className="group rounded-xl border border-foreground-accent/15 bg-white/5 p-5">
                <summary className="cursor-pointer font-semibold list-none flex items-center justify-between gap-4">
                  {f.q}<span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-foreground-accent">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLOT ─────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Klaar om 'm op je eigen naam te zien?</h2>
          <p className="text-foreground-accent mb-6">
            Kies hierboven een ontwerp. Een halve minuut invullen en je kijkt naar je eigen website.
          </p>
          <button onClick={() => { setStep(1); document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-primary text-black font-bold px-7 py-3.5 rounded-full">
            Naar de ontwerpen <BsArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
}
