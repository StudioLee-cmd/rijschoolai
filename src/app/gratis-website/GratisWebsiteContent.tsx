"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BsGlobe, BsPerson, BsEnvelope, BsTelephone, BsGeoAlt, BsArrowRight, BsArrowLeft, BsEye } from "react-icons/bs";
import { siteDetails } from "@/data/siteDetails";
import { LOOKS, DIENSTEN, type LookId } from "./lookConfig";

const niche = siteDetails.niche || "Bedrijven";
const nicheLower = niche.toLowerCase();
const nicheSingular = nicheLower.endsWith("s") ? nicheLower.slice(0, -1) : nicheLower;

const WEBHOOK_URL = "https://n8n.aireclamestudio.nl/webhook/freewebsite";

// Mini-mockup per look: puur CSS, geen assets, zodat de keuzekaarten altijd renderen.
function LookMini({ look }: { look: LookId }) {
  if (look === "premium") {
    return (
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0B0E13] p-4 flex flex-col justify-between relative">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FFD84D]/20 blur-2xl" />
        <div className="flex items-center justify-between">
          <div className="text-[#FFD84D] text-[10px] font-bold tracking-[0.2em] uppercase">Jouw Rijschool</div>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        </div>
        <div>
          <div className="text-white font-bold text-lg leading-tight mb-2">Haal je rijbewijs<br />met vertrouwen.</div>
          <div className="inline-block bg-[#FFD84D] text-black text-[10px] font-bold px-3 py-1.5 rounded-full">Plan een proefles</div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 flex-1 rounded-md bg-white/5 border border-white/10" />
          <div className="h-8 flex-1 rounded-md bg-white/5 border border-white/10" />
          <div className="h-8 flex-1 rounded-md bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }
  if (look === "warm") {
    return (
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF5EC] p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="text-[#2A2419] text-[10px] font-bold" style={{ fontFamily: "Georgia, serif" }}>Jouw Rijschool</div>
          <div className="flex gap-2 text-[8px] text-[#6B6154]">
            <span>Lessen</span><span>Tarieven</span><span>Contact</span>
          </div>
        </div>
        <div>
          <div className="text-[#2A2419] font-bold text-lg leading-tight mb-2" style={{ fontFamily: "Georgia, serif" }}>Rijles die bij<br />jou past.</div>
          <div className="inline-block bg-[#C0563A] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">Gratis proefles</div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 flex-1 rounded-lg bg-white border border-[#E8DFD0]" />
          <div className="h-8 flex-1 rounded-lg bg-[#40604C]/10 border border-[#E8DFD0]" />
          <div className="h-8 flex-1 rounded-lg bg-white border border-[#E8DFD0]" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-black/10 p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-black pb-2">
        <div className="text-black text-[10px] font-black tracking-tight uppercase">Jouw Rijschool</div>
        <div className="text-[#E8402A] text-[10px] font-black">MENU</div>
      </div>
      <div>
        <div className="text-black font-black text-xl leading-none uppercase tracking-tight mb-2">Rijbewijs.<br /><span className="text-[#E8402A]">Geregeld.</span></div>
        <div className="inline-block border-2 border-black text-black text-[10px] font-black px-3 py-1 uppercase">Proefles →</div>
      </div>
      <div className="grid grid-cols-3 gap-px bg-black/20">
        <div className="h-8 bg-white" />
        <div className="h-8 bg-white" />
        <div className="h-8 bg-white" />
      </div>
    </div>
  );
}

export default function GratisWebsiteContent() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [look, setLook] = useState<LookId | null>(null);
  const [services, setServices] = useState<string[]>(["auto", "theorie"]);
  const [formData, setFormData] = useState({
    clientName: "", city: "", website: "", domainWish: "", contactName: "", email: "", phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (id: string) => {
    setServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const chooseLook = (id: LookId) => {
    setLook(id);
    setStep(2);
    setTimeout(() => document.getElementById("gratis-website-wizard")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const buildPreviewPath = () => {
    const params = new URLSearchParams({
      look: look || "premium",
      bedrijf: formData.clientName,
      plaats: formData.city,
      diensten: services.join(","),
      domein: formData.domainWish,
      naam: formData.contactName,
    });
    return `/gratis-website/voorbeeld?${params.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.clientName || !formData.city || !formData.contactName || !formData.email) {
      setError("Vul alle verplichte velden in.");
      return;
    }
    setIsSubmitting(true);
    const previewPath = buildPreviewPath();
    const previewUrl = `${window.location.origin}${previewPath}`;
    try {
      const payload = {
        clientName: formData.clientName,
        domain: formData.website || formData.domainWish || "",
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        niche,
        look,
        services: services.map((id) => DIENSTEN.find((d) => d.id === id)?.label || id),
        domainWish: formData.domainWish,
        previewUrl,
      };
      const res = await fetch(WEBHOOK_URL, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Verzenden mislukt");
      router.push(previewPath);
    } catch {
      setError("Er ging iets mis met verzenden. Mail tim@studiolee.nl en ik help je direct.");
      setFallbackUrl(previewPath);
      setIsSubmitting(false);
    }
  };

  const faqs = [
    { q: "Is het echt gratis?", a: "Ja, 100% gratis. Je kiest een design, vult je gegevens in en ziet direct een voorbeeld van je nieuwe website met je eigen bedrijfsnaam. Geen kosten, geen verplichtingen." },
    { q: "Kan ik het bestand krijgen?", a: "Ja. De website bestanden zijn van jou. Vraag het aan en we sturen ze door." },
    { q: "Wat kost het als ik de website wil kopen?", a: "De website kost €800 eenmalig plus €200 per jaar voor hosting, onderhoud en blogs. Geen abonnement nodig voor alleen de website." },
    { q: "Wat is het 25-in-1 AI platform?", a: `Voor €79/maand krijg je naast de website ook een AI chatbot, Voice AI telefonist, SEO automatisering, review management, social media planner en meer. Alles wat je nodig hebt om je ${nicheSingular}sbedrijf te laten groeien. Maandelijks opzegbaar.` },
    { q: "Hoe snel is het klaar?", a: "Je online voorbeeld staat er direct, met je eigen naam en plaats in het design dat jij kiest. Wil je de website echt live? Dan bouwen we hem volledig af en ontvang je binnen 48 uur je eigen preview-link." },
    { q: "Moet ik al een website hebben?", a: "Nee, ook zonder bestaande website zie je direct je voorbeeld. We vragen alleen je bedrijfsnaam en wat informatie over je diensten." },
  ];

  return (
    <main className="pt-24 md:pt-32">
      {/* Intro */}
      <section className="pt-12 md:pt-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-green-500/10 text-green-500 text-sm font-bold px-4 py-1.5 rounded-full mb-4"
          >
            100% Gratis — Geen Verplichtingen
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 !leading-tight"
          >
            Gratis Website voor {niche}: kies, vul in, bekijk direct
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-accent"
          >
            Kies een design, vul je bedrijfsgegevens in en zie meteen een gepersonaliseerd
            voorbeeld van je nieuwe website. Met jouw naam, jouw plaats en jouw diensten.
          </motion.p>
        </div>
      </section>

      {/* Wizard */}
      <section id="gratis-website-wizard" className="py-12 md:py-16 px-4 scroll-mt-28">
        <div className="max-w-5xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[{ n: 1, t: "Kies je design" }, { n: 2, t: "Vul je gegevens in" }, { n: 3, t: "Bekijk je voorbeeld" }].map((s, i) => (
              <React.Fragment key={s.n}>
                {i > 0 && <div className={`h-px w-8 md:w-16 ${step >= s.n ? "bg-primary" : "bg-[var(--card-border)]"}`} />}
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.n ? "bg-primary text-black" : "bg-[var(--card-background)] border border-[var(--card-border)] text-foreground-accent"}`}>
                    {s.n}
                  </span>
                  <span className={`hidden md:inline text-sm font-semibold ${step >= s.n ? "text-foreground" : "text-foreground-accent"}`}>{s.t}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Welk design past bij jouw rijschool?</h2>
                <p className="text-foreground-accent text-center mb-8">Klik op een stijl. In de volgende stap maken we hem persoonlijk.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {LOOKS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => chooseLook(l.id)}
                      className="text-left group bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl p-4 hover:border-primary hover:shadow-xl transition-all"
                    >
                      <LookMini look={l.id} />
                      <div className="flex items-center justify-between mt-4 mb-1">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{l.naam}</h3>
                        <BsArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-sm text-foreground-accent">{l.tagline}</p>
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-foreground-accent mt-6">
                  Twijfel je? Je kunt in het voorbeeld altijd nog wisselen van design.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-sm text-foreground-accent hover:text-primary transition-colors mb-4"
                >
                  <BsArrowLeft /> Ander design kiezen
                </button>
                <div className="bg-[var(--card-background)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold">Maak je voorbeeld persoonlijk</h2>
                    <span className="text-xs font-bold bg-primary/15 text-foreground px-3 py-1 rounded-full">
                      Design: {LOOKS.find((l) => l.id === look)?.naam}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-accent mb-6">Duurt minder dan een minuut. Daarna zie je direct je voorbeeld.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg">
                        {error}
                        {fallbackUrl && (
                          <Link href={fallbackUrl} className="block mt-2 font-semibold underline">
                            Bekijk alvast je voorbeeld →
                          </Link>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Bedrijfsnaam <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <BsPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Bijv. Rijschool Jansen" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Plaats <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <BsGeoAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="city" value={formData.city} onChange={handleChange} placeholder="Bijv. Utrecht" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Welke lessen geef je?</label>
                      <div className="flex flex-wrap gap-2">
                        {DIENSTEN.map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => toggleService(d.id)}
                            className={`px-3 py-2 rounded-full text-sm font-semibold border transition-all ${services.includes(d.id) ? "bg-primary text-black border-primary" : "bg-background text-foreground-accent border-[var(--card-border)] hover:border-primary"}`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Huidige website <span className="text-foreground-accent">(optioneel)</span></label>
                        <div className="relative">
                          <BsGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="website" value={formData.website} onChange={handleChange} placeholder="https://jouwwebsite.nl" type="url" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Domein-wens <span className="text-foreground-accent">(optioneel)</span></label>
                        <div className="relative">
                          <BsGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="domainWish" value={formData.domainWish} onChange={handleChange} placeholder="bijv. rijschooljansen.nl" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Jouw naam <span className="text-red-500">*</span></label>
                        <input name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Voornaam Achternaam" className="w-full px-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">E-mail <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <BsEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                          <input name="email" value={formData.email} onChange={handleChange} placeholder="jouw@email.nl" type="email" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" required />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Telefoon <span className="text-foreground-accent">(optioneel)</span></label>
                      <div className="relative">
                        <BsTelephone className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-accent" />
                        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="06 12345678" type="tel" className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-[var(--card-border)] focus:border-primary focus:outline-none transition-colors" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-black py-3.5 rounded-xl font-bold hover:bg-primary-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      <BsEye />
                      {isSubmitting ? "Voorbeeld wordt gemaakt..." : "Bekijk direct mijn voorbeeld"}
                    </button>

                    <p className="text-xs text-foreground-accent text-center">
                      100% gratis · Geen verplichtingen · Je voorbeeld staat er direct
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Hoe het werkt</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Kies je design", desc: "Drie stijlen, speciaal gemaakt voor rijscholen. Premium, Warm of Editorial." },
              { step: "2", title: "Vul je gegevens in", desc: "Bedrijfsnaam, plaats en je diensten. Duurt minder dan een minuut." },
              { step: "3", title: "Bekijk direct je voorbeeld", desc: "Je ziet meteen je eigen website in het gekozen design. Bevalt het? Dan bouwen we hem volledig af, binnen 48 uur op je eigen preview-link." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-foreground-accent text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing after */}
          <div className="max-w-xl mx-auto mt-12 bg-background border border-[var(--card-border)] rounded-xl p-5">
            <p className="font-semibold mb-3">En daarna? Jij kiest:</p>
            <div className="space-y-2 text-sm text-foreground-accent">
              <div className="flex justify-between">
                <span>Website kopen (eenmalig)</span>
                <span className="font-semibold text-foreground">€800</span>
              </div>
              <div className="flex justify-between">
                <span>Hosting + onderhoud + blogs</span>
                <span className="font-semibold text-foreground">€200/jaar</span>
              </div>
              <div className="flex justify-between border-t border-[var(--card-border)] pt-2 mt-2">
                <span>Of: compleet AI platform (25-in-1)</span>
                <span className="font-semibold text-primary">€79/mnd</span>
              </div>
            </div>
            <a href="/tarieven" className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-3 hover:underline">
              Bekijk alle tarieven <BsArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Why free section - SEO content */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Waarom bieden wij gratis website designs aan voor {niche}?
          </h2>
          <div className="text-foreground-accent space-y-4 text-base leading-relaxed">
            <p>
              De meeste {niche} hebben geen website, of een verouderde site die niet gevonden wordt in Google.
              Een traditioneel webbureau rekent al snel €3.000 tot €10.000 voor een nieuwe website. Dat is voor
              veel {niche} simpelweg niet haalbaar.
            </p>
            <p>
              Wij geloven dat elk {nicheSingular}sbedrijf een professionele online aanwezigheid verdient, ongeacht
              het budget. Daarom laten we je niet wachten op een offerte of een schets: je kiest een design en ziet
              direct hoe je nieuwe website eruitziet, met je eigen naam en plaats erin. Bevalt het? Dan koop je de
              volledig afgebouwde website voor €800 eenmalig, een fractie van wat een bureau vraagt.
            </p>
            <p>
              En wil je meer dan alleen een website? Met ons 25-in-1 AI platform voor €79/maand krijg je ook
              een chatbot, Voice AI telefonist, SEO automatisering, review management en social media tools.
              Agency-kwaliteit voor een tiende van de prijs, inclusief strategie en consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6">Combineer met andere AI-tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/chatbot" className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all">
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">AI Chatbot</h3>
              <p className="text-foreground-accent text-sm mb-3">Vangt website-bezoekers op die liever typen dan bellen. Direct boekbaar via chat.</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
            </Link>
            <Link href="/seo" className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all">
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">SEO voor Rijscholen</h3>
              <p className="text-foreground-accent text-sm mb-3">Een SEO-geoptimaliseerde site is alleen het begin. Combineer met lokale SEO automatisering.</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
            </Link>
            <Link href="/voice-ai" className="group border border-[var(--card-border)] rounded-2xl p-6 bg-[var(--card-background)] hover:border-primary/40 transition-all">
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">Voice AI Telefonist</h3>
              <p className="text-foreground-accent text-sm mb-3">Vangt telefoontjes op die via je nieuwe website binnenkomen. 24/7 bereikbaar.</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold">Bekijk <BsArrowRight size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-[var(--card-background)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Veelgestelde Vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-[var(--card-border)] rounded-xl">
                <summary className="cursor-pointer p-5 font-semibold flex justify-between items-center">
                  {faq.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <div className="px-5 pb-5 text-foreground-accent">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Klaar om je voorbeeld te zien?</h2>
          <p className="text-foreground-accent mb-8">
            Kies bovenaan je design en bekijk binnen een minuut hoe jouw nieuwe website eruitziet. Gratis, vrijblijvend.
          </p>
          <a
            href="#gratis-website-wizard"
            onClick={(e) => { e.preventDefault(); document.getElementById("gratis-website-wizard")?.scrollIntoView({ behavior: "smooth" }); }}
            className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary-accent transition-all inline-block"
          >
            Kies je design ↑
          </a>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question", name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
