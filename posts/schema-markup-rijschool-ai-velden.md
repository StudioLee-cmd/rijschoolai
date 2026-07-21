---
title: "Schema markup voor rijscholen: 3 velden die AI echt leest"
slug: schema-markup-rijschool-ai-velden
excerpt: "Leerlingen vragen ChatGPT om een rijschool in hun stad. Met deze 3 schema markup velden lezen AI-zoekmachines je rijschool wel mee. Uitleg zonder tech-taal."
date: "2026-07-21"
authorSlug: "tim-van-der-lee"
image: "/images/blog/schema-markup-rijschool-ai-velden.jpg"
tags: ["Schema Markup", "Vindbaarheid", "AI Search", "Rijschool"]
cluster: "vindbaarheid"
---

Een 17-jarige uit jouw stad typt vanavond in ChatGPT: "wat is een goede rijschool in de buurt die ook automaat doet?" Het antwoord noemt drie rijscholen. Die van jou staat er niet tussen, terwijl jij betere reviews hebt dan alle drie. De reden is meestal niet je website, niet je prijzen en niet je slagingspercentage. De reden is dat AI-systemen jouw site niet kunnen uitlezen zoals ze dat bij je concurrent wel kunnen.

Denk aan het L-bord op je lesauto. Zonder dat bord ben je gewoon een auto in het verkeer; met dat bord weet iedereen in een halve seconde precies wat je bent. Schema markup is het L-bord van je website: een klein, onzichtbaar stukje code dat tegen Google en AI-zoekmachines zegt "dit is een rijschool, hier lest ze, dit vinden leerlingen ervan". Goede [seo voor rijscholen](/seo) begint bij content, maar dit technische bordje bepaalt steeds vaker of je in AI-antwoorden wordt genoemd of niet.

In dit stuk krijg je geen gids van 4.000 woorden voor SEO-specialisten. Je krijgt de drie velden die voor een rijschool het verschil maken, plus hoe je ze live zet zonder zelf te programmeren.

**In het kort:**

- Schema markup is code die zoekmachines en AI vertelt wat je pagina betekent.
- Voor rijscholen bestaat geen eigen schema-type: je combineert LocalBusiness met EducationalOrganization.
- De 3 velden die tellen: areaServed (waar je lest), aggregateRating (je reviews) en openingHoursSpecification (wanneer je bereikbaar bent).
- Toevoegen kost een websitebouwer minder dan een uur; testen doe je gratis met Google.

## Wat is schema markup precies?

Schema markup is een stukje gestructureerde code, meestal in het JSON-LD-formaat, dat aan zoekmachines vertelt wat een pagina betekent in plaats van alleen wat er staat. Een mens leest "Rijschool Jansen, al 15 jaar in Utrecht, 4,9 sterren" en begrijpt dat meteen. Een machine ziet zonder schema alleen losse woorden. Met schema wordt het: naam = Rijschool Jansen, plaats = Utrecht, beoordeling = 4,9. Geen interpretatie meer nodig.

Voor rijscholen is er een kleine verrassing: schema.org, de standaard achter deze code, heeft geen apart type "rijschool". Wat wel werkt, en wat wij bij RijschoolAI standaard toepassen, is een combinatie van twee typen: LocalBusiness (je bent een lokaal bedrijf) en EducationalOrganization (je leidt mensen op). Die combinatie geeft je toegang tot precies de velden die hieronder komen.

## Waarom AI-zoekmachines je schema wel lezen en je mooie website niet

ChatGPT, Perplexity en Google AI Overviews bouwen hun antwoorden op bronnen die ze snel en betrouwbaar kunnen uitlezen. Een pagina met gestructureerde data is voor zulke systemen een gedekte tafel: alles staat klaar, niets hoeft geraden. Een pagina zonder structuur is een doos ongesorteerde papieren. Beide kunnen gelezen worden, maar raad eens welke bron een AI-systeem citeert als het in twee seconden een antwoord moet vormen.

Daar komt bij dat AI-antwoorden vaak maar twee of drie bedrijven noemen, niet tien blauwe links zoals de klassieke zoekpagina. Wie niet uitleesbaar is, doet niet mee. Hoe die verschuiving precies werkt en [hoe leerlingen je rijschool via ChatGPT vinden](/blog/rijschool-vindbaar-chatgpt-ai-search) hebben we eerder uitgebreid beschreven; vandaag gaat het over het technische fundament eronder.

Belangrijk om erbij te zeggen: schema markup is geen toverstaf. Het maakt bestaande signalen leesbaar, het verzint er geen. Heb je geen reviews, dan valt er niets te markeren. Maar heb je ze wel, dan is het zonde als geen enkele machine ze ziet.

## Veld 1: areaServed vertelt AI waar je lest

De meeste vragen die leerlingen aan AI stellen over rijles komen neer op een variant van "rijschool in [stad]". Het veld areaServed beantwoordt precies die vraag. Hier zet je niet alleen je vestigingsplaats in, maar elke plaats waar je daadwerkelijk lest: de stad zelf, de randgemeenten, dat dorp waar je elke week drie leerlingen ophaalt.

![Handen klikken een magnetisch L-dakbord op het dak van een lesauto in de ochtendzon](/images/blog/schema-markup-rijschool-ai-velden-2.jpg)

Samen met het veld address (je fysieke adres) vormt dit je geografische identiteit. Het verschil is subtiel maar belangrijk: address is waar je zit, areaServed is waar je werkt. Een rijschool uit Nieuwegein die ook in Utrecht en Zeist lest, wordt zonder areaServed alleen aan Nieuwegein gekoppeld. Met areaServed doe je in alle drie de plaatsen mee. Wil je per stad ook echt gevonden worden, dan hoort daar overigens meer bij dan alleen dit veld; een aparte pagina per stad blijft de sterkste basis.

## Veld 2: aggregateRating maakt je reviews citeerbaar

Je sterren zijn je sterkste verkoopargument, en juist die staan op de meeste rijschoolwebsites als los plaatje of als tekst in een slider. Onleesbaar voor machines. Het veld aggregateRating zet je gemiddelde score en het aantal beoordelingen in een formaat dat Google in zoekresultaten kan tonen en dat AI-systemen letterlijk kunnen citeren: "Rijschool Jansen, 4,9 sterren op basis van 127 reviews".

Twee spelregels. Eén: de cijfers moeten kloppen met reviews die echt op je site of profiel zichtbaar zijn. Verzonnen scores vallen door de mand en kosten je vertrouwen bij Google. Twee: dit veld werkt pas als er iets te markeren valt, dus een gestage stroom nieuwe beoordelingen blijft de motor. Wie het [google reviews verzamelen als rijschool](/reviews) automatiseert na elk examen, heeft elke maand verse cijfers om te tonen.

## Veld 3: openingHoursSpecification vangt de avondzoeker

Leerlingen appen en zoeken vooral na schooltijd en na werktijd. Wanneer een AI-assistent om "een rijschool die vanavond bereikbaar is" wordt gevraagd, kan die vraag alleen beantwoord worden met gestructureerde openingstijden. Het veld openingHoursSpecification legt per dag vast wanneer je bereikbaar bent, en het veld telephone koppelt daar direct je nummer aan.

Wees hier eerlijk in plaats van optimistisch. Zet niet 08:00 tot 21:00 neer als je tijdens rijlessen nooit opneemt. Of beter: maak van je bereikbaarheid geen knelpunt. Een rijschool die haar telefoon door AI laat aannemen is feitelijk altijd bereikbaar, en dan mag dat veld ook gewoon ruim ingevuld staan. Zo versterken techniek en marketing elkaar, wat de kern is van [ai seo voor rijscholen](/seo): niet slimmer roepen, maar beter uitleesbaar zijn.

## Zo zet je het live

Voor de volledigheid, zo ziet de kern eruit in JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "name": "Rijschool Jansen",
  "address": { "@type": "PostalAddress", "addressLocality": "Utrecht" },
  "areaServed": ["Utrecht", "Nieuwegein", "Zeist"],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
  "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:30", "closes": "20:00" },
  "telephone": "+31301234567"
}
```

De volledige lijst met mogelijke velden vind je op [schema.org](https://schema.org/EducationalOrganization), maar laat je daar niet door afleiden: de drie hierboven doen het meeste werk.

### Werk je met een websitebouwer?

Stuur dit artikel door en vraag om precies deze drie velden in de genoemde type-combinatie. Het is minder dan een uur werk. Draait je site op WordPress, dan kan een SEO-plugin een deel invullen, maar controleer altijd of areaServed en je echte reviewcijfers erin staan; standaardplugins slaan die vaak over.

### Testen doe je gratis

Plak je pagina-URL in de [Rich Results Test van Google](https://search.google.com/test/rich-results). Binnen een halve minuut zie je of je markup gelezen wordt en welke velden ontbreken of fouten bevatten. Groen vinkje betekent: machines kunnen je nu uitlezen.

### Hoe snel zie je resultaat van schema markup?

Google verwerkt nieuwe markup meestal binnen enkele weken na de eerstvolgende crawl van je site. Reken dus niet op een sprong volgende week, maar op een fundament dat elke volgende zoekopdracht en elk AI-antwoord in jouw voordeel laat meewegen. Schema is geen campagne die je aanzet, het is een bord dat je ophangt en dat daarna blijft hangen.

<div class="container"><div class="row justify-content-center"><div class="col-lg-10 col-xl-8 mx-auto"><p class="lees-ook my-5 px-4 py-3 rounded-3 fs-6 text-dark" style="background-color: rgba(193, 255, 114, 0.18);"><strong class="text-dark">Lees ook:</strong> <a href="/blog/lokale-seo-rijschool-paginas-per-stad" class="text-dark fw-semibold">Rijschool in meerdere steden vindbaar: lokale SEO</a> →</p></div></div></div>

## Onzichtbaar of geciteerd, dat is de keuze

Terug naar die 17-jarige met zijn telefoon. Volgende maand stelt hij die vraag opnieuw, en het antwoord wordt weer gebouwd uit de rijscholen die machines kunnen uitlezen. Het L-bord hangt op je lesauto omdat je wilt dat iedereen in één blik snapt wat je bent. Hang datzelfde bord op je website.

Je hoeft hier zelf geen techneut voor te worden. Bij RijschoolAI zetten we schema markup, reviews en vindbaarheid als één systeem neer, met een Groei-of-Geld-Terug Garantie, zodat jij gewoon lesgeeft terwijl je rijschool ook in AI-antwoorden verschijnt. Benieuwd wat machines nu van jouw site kunnen lezen? Vraag de [gratis ai scan voor rijscholen](/gratis-scan) aan en je ziet binnen een dag waar je staat.
