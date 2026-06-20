import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Users,
  PlaneTakeoff,
  ShieldCheck,
  Euro,
  Clock,
  Lock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { SectionHeading, Eyebrow, Stat } from "@/components/bits";
import { MediaPlaceholder } from "@/components/media";
import { CTASection } from "@/components/cta";
import { STATS } from "@/lib/seed";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Hoe het werkt · Van aanvraag tot luchtbeeld | Skylens",
      description:
        "In drie stappen naar geverifieerde dronebeelden: plaats je gratis aanvraag, ontvang matches met verzekerde EASA-piloten bij jou in de buurt en kies op prijs en reviews. Beelden binnen 48–72 uur.",
    },
    en: {
      title: "How it works · From request to aerial footage | Skylens",
      description:
        "Three steps to verified drone footage: post your free request, get matches with insured EASA-certified pilots near you and choose on price and reviews. Footage within 48–72 hours.",
    },
    de: {
      title: "So funktioniert's · Von der Anfrage zur Luftaufnahme | Skylens",
      description:
        "In drei Schritten zu geprüften Drohnenaufnahmen: kostenlose Anfrage stellen, Matches mit versicherten EASA-Piloten in Ihrer Nähe erhalten und nach Preis und Bewertungen wählen. Aufnahmen in 48–72 Stunden.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/hoe-het-werkt`,
        "en-GB": `${SITE.url}/en/hoe-het-werkt`,
        de: `${SITE.url}/de/hoe-het-werkt`,
      },
    },
  };
}

export default async function HoeHetWerktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const T = pick(locale, {
    nl: {
      heroEyebrow: "Hoe het werkt",
      heroTitle1: "Van aanvraag tot luchtbeeld, ",
      heroTitle2: "zonder gedoe",
      heroLead:
        "Geen offertes najagen of onbekende freelancers vergelijken. Eén gratis aanvraag, geverifieerde matches bij jou in de buurt en vaste prijzen. Zo werkt Skylens van begin tot eind.",
      heroCta: "Plaats je aanvraag",
      heroFaqLink: "Naar de veelgestelde vragen",
      stepsEyebrow: "Voor klanten",
      stepsTitle: "Drie stappen naar je luchtbeelden",
      stepsIntro: "Helder, snel en zonder verplichtingen. Zo ziet het traject er voor jou uit.",
      steps: [
        {
          eyebrow: "Stap 1",
          title: "Plaats je aanvraag",
          text: "Vertel ons in zo'n 60 seconden wat je nodig hebt: de toepassing, de locatie, je gewenste datum en een indicatie van je budget. Gratis en vrijblijvend — je hoeft geen account aan te maken en je betaalt niets om matches te ontvangen.",
          points: [
            "Kies je toepassing (vastgoed, marketing, inspectie, mapping …)",
            "Vul je locatie en gewenste datum in",
            "Geef een budgetindicatie — handig voor de juiste piloot",
          ],
          label: "Aanvraagformulier",
        },
        {
          eyebrow: "Stap 2",
          title: "Ontvang je matches",
          text: "Onze matching koppelt je aanvraag automatisch aan piloten die binnen hun vliegbereik vallen, de juiste apparatuur hebben en het vereiste EASA-certificaat en de verzekering voor jouw klus bezitten. Doorgaans heb je binnen enkele uren passende profielen.",
          points: [
            "Alleen geverifieerde, verzekerde piloten in jouw regio",
            "Gematcht op apparatuur en certificering per toepassing",
            "Geen reiskosten — altijd een piloot dicht bij de locatie",
          ],
          label: "Gematchte piloten",
        },
        {
          eyebrow: "Stap 3",
          title: "Kies & vlieg",
          text: "Vergelijk de profielen op prijs, portfolio en reviews en kies de piloot die bij je past. Je maakt rechtstreeks afspraken over de vluchtdatum. Na de vlucht ontvang je je bewerkte beelden — standaard binnen 48 tot 72 uur.",
          points: [
            "Vergelijk profielen, vaste pakketprijzen en beoordelingen",
            "Plan de vlucht op een moment dat jou uitkomt",
            "Bewerkte beelden geleverd binnen 48–72 uur",
          ],
          label: "Oplevering · 4K",
        },
      ],
      trustEyebrow: "Waarom via Skylens",
      trustTitle: "Vertrouwen ingebouwd, vanaf de eerste klik",
      trustIntro:
        "Je kunt zelf niet zien of een piloot legaal vliegt, goed verzekerd is en het juiste certificaat heeft. Wij controleren het vooraf, zodat jij met een gerust hart kunt boeken.",
      trust: [
        { title: "Geverifieerd & verzekerd", text: "Elke piloot is gecontroleerd op RDW-registratie, EASA-certificering (A1/A3, A2 of STS) en een aansprakelijkheidsverzekering van minimaal €1 miljoen. Jij hoeft niets te controleren." },
        { title: "Vaste, transparante prijzen", text: "Geen vage offertetrajecten of verborgen bureaumarges. Je ziet vooraf per pakket wat je betaalt, zodat je appels met appels vergelijkt. Alle prijzen zijn exclusief BTW." },
        { title: "Snel geregeld", text: "Matches binnen enkele uren, beelden doorgaans binnen 48–72 uur. Omdat we altijd de dichtstbijzijnde geschikte piloot koppelen, betaal je geen onnodige reiskosten." },
        { title: "AVG-proof & veilig", text: "Je gegevens delen we alleen met de piloten die op jouw aanvraag matchen, en uitsluitend om je opdracht uit te voeren. Conform de AVG, zonder doorverkoop aan derden." },
      ],
      pilotsEyebrow: "Ben je dronepiloot?",
      pilotsTitle: "Ontvang betaalde klussen in jouw regio",
      pilotsText:
        "Sta je aan de andere kant en wil je opdrachten ontvangen? Meld je gratis aan, bouw je profiel en betaal alleen voor de leads die je accepteert.",
      pilotsCta: "Word piloot",
      pilotsLeads: "Hoe leads werken",
      pilotsStat1: "Aanmelden",
      pilotsStat2: "Meer leads als verified",
      pilotsStat3: "Reactietijd toppers",
      faqEyebrow: "Veelgestelde vragen",
      faqTitle: "Alles wat je wilt weten",
      faqIntro: "Staat je vraag er niet bij? Neem gerust contact op — we helpen je graag op weg.",
      faq: [
        { q: "Wat kost het om een aanvraag te plaatsen?", a: "Niets. Een aanvraag plaatsen en matches ontvangen is volledig gratis en vrijblijvend. Je betaalt pas wanneer je een piloot kiest en een opdracht bevestigt. De pakketprijzen staan vooraf vast, zodat je nooit voor verrassingen komt te staan. Alle bedragen zijn exclusief BTW." },
        { q: "Hoe snel ontvang ik mijn beelden?", a: "Voor de meeste opdrachten leveren piloten de bewerkte beelden binnen 48 tot 72 uur na de vlucht. Voor technische opdrachten zoals inspectierapporten, 3D-modellen of LiDAR-karteringen geldt een langere doorlooptijd — doorgaans 3 tot 15 werkdagen, afhankelijk van het pakket. De match zelf heb je meestal al binnen enkele uren." },
        { q: "Zijn de piloten verzekerd?", a: "Ja. We verifiëren bij elke piloot een geldige aansprakelijkheidsverzekering van minimaal €1 miljoen, specifiek voor het vliegen met drones. Daarmee ben je gedekt voor eventuele schade tijdens de vlucht. Piloten zonder geldige verzekering ontvangen geen leads." },
        { q: "Wat betekenen de certificeringen A1/A3, A2 en STS?", a: "Dit zijn de EASA-bewijzen die bepalen waar en hoe dicht bij mensen een piloot mag vliegen. A1/A3 is de basis voor lichte drones en vluchten op afstand van mensen — prima voor veel vastgoed- en landschapsopnames. Met A2 mag dichter bij omstanders worden gevlogen, nodig voor marketing in bebouwd gebied en de meeste inspecties. STS (Standaardscenario, STS-01/STS-02) en operationele autorisaties horen bij de 'specific'-categorie voor complexere of risicovollere vluchten, zoals mapping en infraprojecten. Wij koppelen je automatisch aan een piloot met het juiste certificaat voor jouw klus." },
        { q: "Van wie zijn de gebruiksrechten op de footage?", a: "Na betaling van de opdracht ontvang jij de gebruiksrechten op de opgeleverde beelden voor het afgesproken doel — bijvoorbeeld je listing, website of campagne. Maak je vooraf duidelijke afspraken over breder commercieel gebruik, dan leggen jij en de piloot dat samen vast. De piloot mag het werk doorgaans tonen in zijn eigen portfolio, tenzij anders afgesproken." },
        { q: "Kan ik een opdracht annuleren of verzetten?", a: "Ja. Het verzetten van een vlucht is meestal kosteloos mogelijk tot kort voor de geplande datum; drone-opnames zijn sowieso weersafhankelijk, dus piloten zijn gewend om te schuiven. Annuleren kan ook — de exacte voorwaarden en eventuele kosten spreek je af met de gekozen piloot voordat je bevestigt. Een aanvraag die nog geen bevestigde opdracht is, kun je altijd zonder kosten laten vervallen." },
        { q: "Mag je overal in Nederland vliegen?", a: "Niet overal. Rond luchthavens, in natuurgebieden en boven bepaalde zones gelden vlieg- en no-flyrestricties. Geverifieerde piloten kennen de regels en regelen waar nodig vooraf toestemming, bijvoorbeeld via een vluchtaanvraag. Valt jouw locatie in een beperkt gebied, dan laat de piloot dat weten en bekijkt hij wat wél mogelijk is." },
        { q: "Welke regio's dekken jullie?", a: `Skylens werkt landelijk. We hebben ${formatNumber(STATS.activePilots, "nl")} actieve piloten in het netwerk, verspreid over heel Nederland en met dekking in ${STATS.citiesCovered}+ steden. Omdat we matchen op vliegbereik vinden we ook buiten de grote steden vrijwel altijd een geschikte piloot bij jou in de buurt.` },
        { q: "Hoe werkt de matching precies?", a: "Op basis van je toepassing en locatie filteren we het netwerk op piloten die binnen hun servicegebied vallen, de juiste apparatuur bezitten en het vereiste certificaat en de verzekering voor die klus hebben. Geverifieerde en hoger gewaardeerde piloten worden hoger getoond. Vervolgens zie jij een korte lijst met passende profielen om uit te kiezen — wij dwingen niets af, de keuze is aan jou." },
        { q: "Wat als ik niet weet welk pakket ik nodig heb?", a: "Geen probleem. Geef bij je aanvraag globaal aan wat je wilt bereiken en welk budget je in gedachten hebt; de gematchte piloten denken met je mee en adviseren het juiste pakket. Twijfel je tussen toepassingen, bekijk dan de pakketpagina — daar staat per niveau (Brons tot Platinum) wat je krijgt en voor welke situaties het bedoeld is." },
      ],
    },
    en: {
      heroEyebrow: "How it works",
      heroTitle1: "From request to aerial footage, ",
      heroTitle2: "without the hassle",
      heroLead:
        "No chasing quotes or vetting unknown freelancers. One free request, verified matches near you and fixed prices. That's how Skylens works from start to finish.",
      heroCta: "Post your request",
      heroFaqLink: "Jump to the FAQs",
      stepsEyebrow: "For clients",
      stepsTitle: "Three steps to your aerial footage",
      stepsIntro: "Clear, fast and no strings attached. Here's how the process looks for you.",
      steps: [
        {
          eyebrow: "Step 1",
          title: "Post your request",
          text: "Tell us in about 60 seconds what you need: the use case, the location, your preferred date and a rough budget. Free and no obligation — you don't need to create an account and you pay nothing to receive matches.",
          points: [
            "Choose your use case (real estate, marketing, inspection, mapping …)",
            "Enter your location and preferred date",
            "Give a budget indication — it helps find the right pilot",
          ],
          label: "Request form",
        },
        {
          eyebrow: "Step 2",
          title: "Get your matches",
          text: "Our matching automatically connects your request to pilots within their flight range who have the right kit and hold the required EASA certificate and insurance for your job. You'll usually have suitable profiles within hours.",
          points: [
            "Only verified, insured pilots in your area",
            "Matched on kit and certification per use case",
            "No travel costs — always a pilot close to the location",
          ],
          label: "Matched pilots",
        },
        {
          eyebrow: "Step 3",
          title: "Choose & fly",
          text: "Compare the profiles on price, portfolio and reviews and pick the pilot who suits you. You arrange the flight date directly. After the flight you receive your edited footage — typically within 48 to 72 hours.",
          points: [
            "Compare profiles, fixed package prices and ratings",
            "Schedule the flight whenever suits you",
            "Edited footage delivered within 48–72 hours",
          ],
          label: "Delivery · 4K",
        },
      ],
      trustEyebrow: "Why via Skylens",
      trustTitle: "Trust built in, from the first click",
      trustIntro:
        "You can't tell on your own whether a pilot flies legally, is properly insured and holds the right certificate. We check it up front, so you can book with peace of mind.",
      trust: [
        { title: "Verified & insured", text: "Every pilot is checked for CAA registration, EASA/CAA certification (A1/A3, A2 or GVC) and public liability cover of at least £1 million. You don't have to check anything." },
        { title: "Fixed, transparent prices", text: "No vague quoting processes or hidden agency markups. You see what you'll pay up front, per package, so you compare like for like. All prices are exclusive of VAT." },
        { title: "Sorted fast", text: "Matches within hours, footage usually within 48–72 hours. Because we always connect the nearest suitable pilot, you pay no unnecessary travel costs." },
        { title: "GDPR-compliant & secure", text: "We only share your details with the pilots who match your request, and solely to carry out your job. In line with UK GDPR, with no resale to third parties." },
      ],
      pilotsEyebrow: "Are you a drone pilot?",
      pilotsTitle: "Get paid jobs in your area",
      pilotsText:
        "On the other side of the fence and want to receive work? Sign up for free, build your profile and pay only for the leads you accept.",
      pilotsCta: "Become a pilot",
      pilotsLeads: "How leads work",
      pilotsStat1: "To sign up",
      pilotsStat2: "More leads when verified",
      pilotsStat3: "Top pilots' response time",
      faqEyebrow: "Frequently asked questions",
      faqTitle: "Everything you want to know",
      faqIntro: "Can't find your question? Do get in touch — we're happy to help.",
      faq: [
        { q: "What does it cost to post a request?", a: "Nothing. Posting a request and receiving matches is entirely free and without obligation. You only pay when you choose a pilot and confirm a job. Package prices are fixed in advance, so you're never caught out. All amounts are exclusive of VAT." },
        { q: "How quickly will I receive my footage?", a: "For most jobs, pilots deliver edited footage within 48 to 72 hours of the flight. Technical jobs such as inspection reports, 3D models or LiDAR surveys take longer — typically 3 to 15 working days, depending on the package. The match itself you'll usually have within hours." },
        { q: "Are the pilots insured?", a: "Yes. For every pilot we verify valid public liability cover of at least £1 million, specifically for drone operations. That means you're covered for any damage during the flight. Pilots without valid insurance receive no leads." },
        { q: "What do the A1/A3, A2 and GVC certifications mean?", a: "These are the certificates that govern where and how close to people a pilot may fly. A1/A3 is the basis for light drones and flights away from people — fine for many property and landscape shoots. The A2 Certificate of Competency allows flying closer to bystanders, needed for marketing in built-up areas and most inspections. The GVC (General VLOS Certificate) and operational authorisations sit in the 'specific' category for more complex or higher-risk flights, such as mapping and infrastructure projects. We automatically match you with a pilot holding the right certificate for your job." },
        { q: "Who owns the usage rights to the footage?", a: "Once the job is paid, you receive the usage rights to the delivered footage for the agreed purpose — for example your listing, website or campaign. If you want broader commercial use, you and the pilot set that out together in advance. The pilot may usually show the work in their own portfolio unless agreed otherwise." },
        { q: "Can I cancel or reschedule a job?", a: "Yes. Rescheduling a flight is usually free up until shortly before the planned date; drone shoots are weather-dependent anyway, so pilots are used to moving things around. Cancelling is also possible — you agree the exact terms and any costs with your chosen pilot before you confirm. A request that isn't yet a confirmed job can always be dropped at no cost." },
        { q: "Can you fly anywhere in the UK?", a: "Not everywhere. Around airports, in protected areas and over certain zones, flight and no-fly restrictions apply. Verified pilots know the rules and, where needed, arrange permission in advance, for example via a flight request. If your location falls within a restricted area, the pilot will let you know and look at what is possible." },
        { q: "Which regions do you cover?", a: `Skylens operates nationwide. We have ${formatNumber(STATS.activePilots, "en")} active pilots in the network, spread across the whole country with coverage in ${STATS.citiesCovered}+ cities. Because we match on flight range, we can almost always find a suitable pilot near you, even outside the major cities.` },
        { q: "How exactly does the matching work?", a: "Based on your use case and location, we filter the network to pilots within their service area who own the right kit and hold the required certificate and insurance for that job. Verified and higher-rated pilots are shown higher up. You then see a short list of suitable profiles to choose from — we don't force anything, the choice is yours." },
        { q: "What if I don't know which package I need?", a: "No problem. In your request, roughly indicate what you want to achieve and the budget you have in mind; the matched pilots will think along with you and recommend the right package. If you're unsure between use cases, take a look at the packages page — it shows what you get at each level (Bronze to Platinum) and which situations it's meant for." },
      ],
    },
    de: {
      heroEyebrow: "So funktioniert's",
      heroTitle1: "Von der Anfrage zur Luftaufnahme, ",
      heroTitle2: "ganz ohne Aufwand",
      heroLead:
        "Kein Jagen nach Angeboten oder Vergleichen unbekannter Freelancer. Eine kostenlose Anfrage, geprüfte Matches in Ihrer Nähe und feste Preise. So funktioniert Skylens von Anfang bis Ende.",
      heroCta: "Anfrage stellen",
      heroFaqLink: "Zu den häufigen Fragen",
      stepsEyebrow: "Für Kunden",
      stepsTitle: "Drei Schritte zu Ihren Luftaufnahmen",
      stepsIntro: "Klar, schnell und unverbindlich. So sieht der Ablauf für Sie aus.",
      steps: [
        {
          eyebrow: "Schritt 1",
          title: "Anfrage stellen",
          text: "Sagen Sie uns in rund 60 Sekunden, was Sie brauchen: die Anwendung, den Standort, Ihren Wunschtermin und eine grobe Budgetangabe. Kostenlos und unverbindlich — Sie müssen kein Konto anlegen und zahlen nichts, um Matches zu erhalten.",
          points: [
            "Wählen Sie Ihre Anwendung (Immobilien, Marketing, Inspektion, Mapping …)",
            "Geben Sie Standort und Wunschtermin an",
            "Geben Sie eine Budgetangabe — hilft, den richtigen Piloten zu finden",
          ],
          label: "Anfrageformular",
        },
        {
          eyebrow: "Schritt 2",
          title: "Matches erhalten",
          text: "Unser Matching verbindet Ihre Anfrage automatisch mit Piloten, die in ihrem Flugbereich liegen, die passende Ausrüstung haben und das erforderliche EASA-Zertifikat sowie die Versicherung für Ihren Auftrag besitzen. In der Regel haben Sie passende Profile innerhalb weniger Stunden.",
          points: [
            "Nur geprüfte, versicherte Piloten in Ihrer Region",
            "Gematcht nach Ausrüstung und Zertifizierung je Anwendung",
            "Keine Anfahrtskosten — immer ein Pilot nahe am Standort",
          ],
          label: "Gematchte Piloten",
        },
        {
          eyebrow: "Schritt 3",
          title: "Auswählen & fliegen",
          text: "Vergleichen Sie die Profile nach Preis, Portfolio und Bewertungen und wählen Sie den passenden Piloten. Den Flugtermin vereinbaren Sie direkt. Nach dem Flug erhalten Sie Ihre bearbeiteten Aufnahmen — standardmäßig innerhalb von 48 bis 72 Stunden.",
          points: [
            "Profile, feste Paketpreise und Bewertungen vergleichen",
            "Den Flug planen, wann es Ihnen passt",
            "Bearbeitete Aufnahmen in 48–72 Stunden geliefert",
          ],
          label: "Lieferung · 4K",
        },
      ],
      trustEyebrow: "Warum über Skylens",
      trustTitle: "Vertrauen von Anfang an eingebaut",
      trustIntro:
        "Sie können selbst nicht erkennen, ob ein Pilot legal fliegt, gut versichert ist und das richtige Zertifikat hat. Wir prüfen es vorab, damit Sie beruhigt buchen können.",
      trust: [
        { title: "Geprüft & versichert", text: "Jeder Pilot wird auf LBA-Registrierung, EASA-Zertifizierung (A1/A3, A2 oder STS) und eine Haftpflichtversicherung von mindestens 1 Mio. € geprüft. Sie müssen nichts kontrollieren." },
        { title: "Feste, transparente Preise", text: "Keine vagen Angebotsprozesse oder versteckten Agenturaufschläge. Sie sehen vorab pro Paket, was Sie zahlen, und vergleichen so Äpfel mit Äpfeln. Alle Preise verstehen sich zzgl. MwSt." },
        { title: "Schnell geregelt", text: "Matches innerhalb weniger Stunden, Aufnahmen meist in 48–72 Stunden. Da wir immer den nächstgelegenen geeigneten Piloten vermitteln, zahlen Sie keine unnötigen Anfahrtskosten." },
        { title: "DSGVO-konform & sicher", text: "Ihre Daten teilen wir nur mit den Piloten, die auf Ihre Anfrage passen, und ausschließlich zur Durchführung Ihres Auftrags. DSGVO-konform, ohne Weiterverkauf an Dritte." },
      ],
      pilotsEyebrow: "Sind Sie Drohnenpilot?",
      pilotsTitle: "Erhalten Sie bezahlte Aufträge in Ihrer Region",
      pilotsText:
        "Sie stehen auf der anderen Seite und möchten Aufträge erhalten? Melden Sie sich kostenlos an, bauen Sie Ihr Profil auf und zahlen Sie nur für die Leads, die Sie annehmen.",
      pilotsCta: "Pilot werden",
      pilotsLeads: "Wie Leads funktionieren",
      pilotsStat1: "Anmeldung",
      pilotsStat2: "Mehr Leads als verifiziert",
      pilotsStat3: "Reaktionszeit Top-Piloten",
      faqEyebrow: "Häufige Fragen",
      faqTitle: "Alles, was Sie wissen möchten",
      faqIntro: "Ihre Frage ist nicht dabei? Nehmen Sie gerne Kontakt auf — wir helfen Ihnen weiter.",
      faq: [
        { q: "Was kostet es, eine Anfrage zu stellen?", a: "Nichts. Eine Anfrage zu stellen und Matches zu erhalten ist völlig kostenlos und unverbindlich. Sie zahlen erst, wenn Sie einen Piloten wählen und einen Auftrag bestätigen. Die Paketpreise stehen vorab fest, sodass es keine Überraschungen gibt. Alle Beträge verstehen sich zzgl. MwSt." },
        { q: "Wie schnell erhalte ich meine Aufnahmen?", a: "Bei den meisten Aufträgen liefern Piloten die bearbeiteten Aufnahmen innerhalb von 48 bis 72 Stunden nach dem Flug. Bei technischen Aufträgen wie Inspektionsberichten, 3D-Modellen oder LiDAR-Vermessungen gilt eine längere Bearbeitungszeit — meist 3 bis 15 Werktage, je nach Paket. Das Match selbst haben Sie in der Regel schon innerhalb weniger Stunden." },
        { q: "Sind die Piloten versichert?", a: "Ja. Bei jedem Piloten verifizieren wir eine gültige Haftpflichtversicherung von mindestens 1 Mio. €, speziell für den Drohnenbetrieb. Damit sind Sie für eventuelle Schäden während des Flugs abgesichert. Piloten ohne gültige Versicherung erhalten keine Leads." },
        { q: "Was bedeuten die Zertifizierungen A1/A3, A2 und STS?", a: "Das sind die EASA-Nachweise, die festlegen, wo und wie nah an Menschen ein Pilot fliegen darf. A1/A3 ist die Basis für leichte Drohnen und Flüge mit Abstand zu Menschen — ideal für viele Immobilien- und Landschaftsaufnahmen. Mit A2 darf näher an Unbeteiligten geflogen werden, nötig für Marketing in bebauten Gebieten und die meisten Inspektionen. STS (Standardszenario, STS-01/STS-02) und Betriebsgenehmigungen gehören zur Kategorie 'speziell' für komplexere oder risikoreichere Flüge wie Mapping und Infrastrukturprojekte. Wir vermitteln Ihnen automatisch einen Piloten mit dem passenden Zertifikat für Ihren Auftrag." },
        { q: "Wem gehören die Nutzungsrechte an den Aufnahmen?", a: "Nach Bezahlung des Auftrags erhalten Sie die Nutzungsrechte an den gelieferten Aufnahmen für den vereinbarten Zweck — zum Beispiel Ihr Inserat, Ihre Website oder Kampagne. Wenn Sie eine breitere kommerzielle Nutzung möchten, legen Sie und der Pilot das vorab gemeinsam fest. Der Pilot darf die Arbeit in der Regel in seinem eigenen Portfolio zeigen, sofern nichts anderes vereinbart ist." },
        { q: "Kann ich einen Auftrag stornieren oder verschieben?", a: "Ja. Das Verschieben eines Flugs ist meist bis kurz vor dem geplanten Termin kostenlos möglich; Drohnenaufnahmen sind ohnehin wetterabhängig, daher sind Piloten das Verschieben gewohnt. Stornieren ist ebenfalls möglich — die genauen Bedingungen und etwaige Kosten vereinbaren Sie vor der Bestätigung mit dem gewählten Piloten. Eine Anfrage, die noch kein bestätigter Auftrag ist, können Sie jederzeit kostenlos verfallen lassen." },
        { q: "Darf man überall in Deutschland fliegen?", a: "Nicht überall. Rund um Flughäfen, in Naturschutzgebieten und über bestimmten Zonen gelten Flug- und Flugverbotsbeschränkungen. Geprüfte Piloten kennen die Regeln und holen bei Bedarf vorab eine Genehmigung ein, etwa über einen Flugantrag. Liegt Ihr Standort in einem beschränkten Gebiet, sagt der Pilot Ihnen das und prüft, was möglich ist." },
        { q: "Welche Regionen decken Sie ab?", a: `Skylens arbeitet bundesweit. Wir haben ${formatNumber(STATS.activePilots, "de")} aktive Piloten im Netzwerk, verteilt über ganz Deutschland und mit Abdeckung in ${STATS.citiesCovered}+ Städten. Da wir nach Flugbereich matchen, finden wir auch außerhalb der großen Städte fast immer einen geeigneten Piloten in Ihrer Nähe.` },
        { q: "Wie genau funktioniert das Matching?", a: "Auf Basis Ihrer Anwendung und Ihres Standorts filtern wir das Netzwerk nach Piloten, die in ihrem Servicegebiet liegen, die richtige Ausrüstung besitzen und das erforderliche Zertifikat sowie die Versicherung für diesen Auftrag haben. Geprüfte und besser bewertete Piloten werden weiter oben angezeigt. Anschließend sehen Sie eine kurze Liste passender Profile zur Auswahl — wir erzwingen nichts, die Wahl liegt bei Ihnen." },
        { q: "Was, wenn ich nicht weiß, welches Paket ich brauche?", a: "Kein Problem. Geben Sie in Ihrer Anfrage grob an, was Sie erreichen möchten und welches Budget Sie im Kopf haben; die gematchten Piloten denken mit und empfehlen das passende Paket. Sind Sie zwischen Anwendungen unsicher, werfen Sie einen Blick auf die Paketseite — dort steht je Stufe (Bronze bis Platin), was Sie erhalten und für welche Situationen es gedacht ist." },
      ],
    },
  });

  const stepIcons = [ClipboardList, Users, PlaneTakeoff];
  const stepSeeds = ["hiw-step-1", "hiw-step-2", "hiw-step-3"];
  const trustIcons = [ShieldCheck, Euro, Clock, Lock];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>{T.heroEyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.heroTitle1}
              <span className="text-brand-600">{T.heroTitle2}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {T.heroLead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localized(locale, "/aanvraag")} className="btn btn-lg btn-primary">
                {T.heroCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#faq" className="btn btn-lg btn-outline">
                {T.heroFaqLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3-step explanation for clients ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow={T.stepsEyebrow}
          title={T.stepsTitle}
          intro={T.stepsIntro}
        />
        <div className="mt-16 space-y-16 sm:space-y-24">
          {T.steps.map((step, i) => {
            const flip = i % 2 === 1;
            const Icon = stepIcons[i];
            return (
              <div
                key={step.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div className={flip ? "lg:order-2" : undefined}>
                  <Eyebrow>{step.eyebrow}</Eyebrow>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <h3 className="text-2xl font-bold sm:text-3xl">{step.title}</h3>
                  </div>
                  <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">{step.text}</p>
                  <ul className="mt-6 space-y-3">
                    {step.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-ink-soft">
                        <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                        </span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={flip ? "lg:order-1" : undefined}>
                  <MediaPlaceholder
                    seed={stepSeeds[i]}
                    aspect="video"
                    label={step.label}
                    isVideo={i === 2}
                    className="rounded-2xl shadow-card"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Why via Skylens (trust block) ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={T.trustEyebrow}
              title={T.trustTitle}
              intro={T.trustIntro}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {T.trust.map((t, i) => {
                const Icon = trustIcons[i];
                return (
                  <div key={t.title} className="card card-pad">
                    <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.7} />
                    <h3 className="mt-4 font-bold">{t.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── For pilots cross-link band ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="card relative overflow-hidden">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow>{T.pilotsEyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold">{T.pilotsTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                {T.pilotsText}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={localized(locale, "/voor-piloten")} className="btn btn-lg btn-dark">
                  {T.pilotsCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={localized(locale, "/voor-piloten#leads")} className="btn btn-lg btn-ghost">
                  {T.pilotsLeads}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Stat value={formatCurrency(0, locale)} label={T.pilotsStat1} />
              <Stat value="3,5×" label={T.pilotsStat2} />
              <Stat value="< 1u" label={T.pilotsStat3} />
            </div>
          </div>
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-24 border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow={T.faqEyebrow}
            title={T.faqTitle}
            intro={T.faqIntro}
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {T.faq.map((item) => (
              <details
                key={item.q}
                className="group card overflow-hidden [&_summary]:list-none"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display text-lg font-semibold text-ink transition-colors hover:text-brand-700">
                  {item.q}
                  <Plus
                    className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-45"
                    strokeWidth={2}
                  />
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="leading-relaxed text-ink-muted pretty">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
