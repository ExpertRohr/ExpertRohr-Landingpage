import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "sonner";
import CookieBanner from "./CookieBanner";

/* Bilder */
import expertRohrLogo from "./assets/ExpertRohr-min.webp";
import heroBackground from "./assets/HeroHintergrund.webp";
import auto2 from "./assets/auto2.webp";
import cameraImage from "./assets/Kamera.webp";

/* Referenzen */
import ref14 from "./assets/ref14.webp";
import ref13 from "./assets/ref13.webp";
import ref9 from "./assets/ref9.webp";
import ref2 from "./assets/ref2.webp";
import ref7 from "./assets/ref7.webp";
import ref15 from "./assets/ref15.webp";
import ref17 from "./assets/ref17.webp";
import ref8 from "./assets/ref8.webp";
import ref5 from "./assets/ref5.webp";
import ref18 from "./assets/ref18.webp";



/* ===========================
   FAQ ITEM KOMPONENTE
=========================== */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="border-b border-gray-200">
      <div
        className="cursor-pointer flex justify-between items-center py-4 px-4 sm:px-6 bg-gray-100 rounded-lg shadow-sm"
        onClick={toggle}
      >
        <h3 className="text-xl font-semibold text-gray-800">{question}</h3>
        <span className="text-lg text-gray-500">{isOpen ? "-" : "+"}</span>
      </div>
      <div className={`faq-answer ${isOpen ? "open" : ""}`}>
        <p className="px-4 sm:px-6 text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

/* ===========================
   TOP NOTICE BAR
=========================== */
function TopNoticeBar() {
  return (
    <div className="sticky top-0 z-[100] w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white text-center py-2 px-4 font-semibold shadow-lg">
      <span role="img" aria-label="clock">
        🕖
      </span>{" "}
      HEUTE: Anfahrt kostenlos für Rohrreinigung Notdienst
    </div>
  );
}

/* ===========================
   HEADER / NAVIGATION
=========================== */
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Name */}
          <div className="flex items-center">
            <div
              className="w-10 h-10 bg-cover bg-center rounded-lg flex items-center justify-center mr-3"
              style={{ backgroundImage: `url(${expertRohrLogo})` }}
            />
            <h1 className="text-xl font-bold text-gray-900">ExpertRohr</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {/* Warum wir → Warum ExpertRohrreinigung */}
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition-colors nav-link"
            >
              Warum wir
            </a>

            {/* Leistungen → ServicesSection */}
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 transition-colors nav-link"
            >
              Leistungen
            </a>

            {/* Fragen? → FAQ-Section */}
            <a
              href="#faq"
              className="text-gray-700 hover:text-blue-600 transition-colors nav-link"
            >
              Fragen?
            </a>

            {/* Kontakt → ContactSection */}
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors nav-link"
            >
              Kontakt
            </a>
          </nav>

          {/* Notdienst-Button rechts */}
          <div className="flex items-center">
            <a
              href="tel:030-23323873"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              📞 Notdienst
            </a>
          </div>
        </div>
      </div>

      {/* Kleine Hover-Optimierung */}
      <style>
        {`
          .nav-link {
            font-weight: 500;
            color: #374151;
            transition: color .2s;
          }
          .nav-link:hover {
            color: #2563eb;
          }
        `}
      </style>
    </header>
  );
}

/* ===========================
   HERO SECTION
=========================== */

function HeroSection() {
  const [location, setLocation] = useState("Berlin & Brandenburg");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county;

            setLocation(city || "Berlin & Brandenburg");
          } catch {
            setLocation("Berlin & Brandenburg");
          }
        },
        () => {
          setLocation("Berlin & Brandenburg");
        }
      );
    }
  }, []);

return (
  <section
    id="hero-section"
    className="
      relative
      py-16 lg:py-20
      overflow-hidden
      bg-cover bg-center bg-no-repeat
      text-white
    "
    style={{
  backgroundImage: `url(${heroBackground})`,
    }}
  >
    {/* dunkles Overlay */}
    <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px] z-0" />

    {/* Shine-Effekt */}
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      <div
        className="
          absolute top-0 left-0
          h-full w-1/2
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          mix-blend-screen
          animate-shine
        "
      />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* LINKER BEREICH – TEXT */}
        <div>
          <div className="inline-flex items-center bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-400/30">
            🚨 24/7 Notdienst · Schnell vor Ort in Berlin &amp; Brandenburg
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Rohrreinigung{" "}
            <span className="text-blue-400">vom Fachbetrieb</span>
            <br />
            in {location}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed max-w-xl">
            Verstopfte Rohre, Überschwemmung oder übler Geruch? Wir kommen
            schnell, arbeiten sauber und nennen Ihnen den Preis vorab – ohne
            versteckte Kosten.
          </p>

          <ul className="space-y-2 text-gray-300 text-sm sm:text-base mb-8">
            <li>• Schnelle Anfahrt in Berlin &amp; Brandenburg</li>
            <li>• Moderne Technik für schonende Rohrreinigung</li>
            <li>• Privat, Gewerbe &amp; Hausverwaltungen</li>
            <li>• In 30–60 Min. meist vor Ort*</li>
          </ul>

{/* CTAs */}
<div className="flex flex-col sm:flex-row gap-4">
  {/* PREMIUM CALL CTA — ICON ENTFERNT */}
  <a
    id="hero-call"
    href="tel:030-23323873"
    className="
      bg-gradient-to-r from-blue-600 to-blue-500
      hover:from-blue-700 hover:to-blue-600
      text-white px-10 py-5
      rounded-2xl font-bold
      transition-all shadow-xl hover:shadow-2xl hover:scale-[1.05]
      flex flex-col items-center justify-center
      border border-blue-400/30
      text-center
    "
  >
    <span className="text-sm font-semibold opacity-90">
      Notdienst anrufen:
    </span>
    <span className="text-2xl font-extrabold tracking-wide mt-1">
      030-23323873
    </span>
  </a>

  {/* ONLINE TERMIN CTA */}
  <a
    href="#contact"
    className="
      bg-white/10 text-blue-300
      px-10 py-5 rounded-2xl font-bold text-lg
      border-2 border-blue-400/40
      hover:bg-white/20 hover:border-blue-300
      transition-all shadow-lg hover:shadow-xl hover:scale-[1.03]
      flex items-center justify-center
      text-center
    "
  >
    Online Termin &amp; Angebot
  </a>
          </div>
        </div>

{/* RECHTER BEREICH – AUTO + BADGES (neu platziert) */}
<div className="relative flex flex-col items-end gap-4">
  {/* Auto – responsive Größen & Position + FLOAT */}
  <div className="relative w-full flex justify-center lg:justify-end">
    <div className="relative lg:animate-float">
      <img
        src={auto2}
        alt="Expert Rohr Einsatzfahrzeug"
        className="
          w-[420px]          /* Mobile */
          sm:w-[340px]
          md:w-[460px]
          lg:w-[760px]       /* Desktop */
          xl:w-[860px]
          2xl:w-[920px]

          max-w-none
          object-contain
          drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]
          -mt-2
          translate-x-0
          lg:translate-x-[80px]
          xl:translate-x-[200px]
        "
      />
    </div>
  </div>

          {/* kompakte Badge-Leiste direkt unter dem Auto */}
          <div
            className="
              flex items-center justify-center lg:justify-end
              gap-6
              px-5 sm:px-6 lg:px-8
              py-3
              bg-black/60 backdrop-blur-xl
              rounded-2xl border border-white/10 shadow-xl

              w-full
              max-w-[380px] sm:max-w-[420px] md:max-w-[500px]
              lg:max-w-[600px] xl:max-w-[680px]

              mx-auto lg:mx-0
              -mt-1 lg:-mt-4

              lg:translate-x-[40px]
              xl:translate-x-[80px]
            "
          >
            <div className="flex items-center gap-2 text-gray-200 text-xs sm:text-sm">
              <span className="text-yellow-400 text-base">⭐</span>
              <span className="pl-1 sm:pl-1.5 lg:pl-2">4,9 / 5 Kunden</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/20" />

            <div className="flex items-center gap-2 text-gray-200 text-xs sm:text-sm">
              <span className="text-blue-300 text-base">🛡️</span>
              <span className="pl-1 sm:pl-1.5 lg:pl-2">Schadenfrei</span>
            </div>

            <div className="hidden md:block w-px h-4 bg-white/20" />

            <div className="flex items-center gap-2 text-gray-200 text-xs sm:text-sm">
              <span className="text-green-300 text-base">💰</span>
              <span className="pl-1 sm:pl-1.5 lg:pl-2">Festpreis</span>
            </div>

            <div className="hidden lg:block w-px h-4 bg-white/20" />

            <div className="flex items-center gap-2 text-gray-200 text-xs sm:text-sm">
              <span className="text-red-300 text-base">📞</span>
              <span className="pl-1 sm:pl-1.5 lg:pl-2">24/7 Notdienst</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

/* ===========================
   2) LEISTUNGEN
   "Unsere Services – Schnell & Professionell"
=========================== */
function ServicesSection() {
  const services = [
    {
      title: "Abflussreinigung",
      icon: "🚿",
      points: ["Schnelle Hilfe", "Schonend & sauber", "Festpreis garantiert"],
    },
    {
      title: "WC-Verstopfung",
      icon: "🚽",
      points: ["Ohne Überschwemmung", "Diskret & zuverlässig", "In 30–60 Min. vor Ort*"],
    },
    {
      title: "Rohrreinigung",
      icon: "🛠️",
      points: ["Moderne Technik", "Ohne Schäden", "Transparente Preise"],
    },
    {
      title: "Rohrinspektion",
      icon: "📹",
      points: ["Kamerabefund", "Exakte Diagnose", "Bevor Folgeschäden entstehen"],
    },
    {
      title: "Hausanschluss",
      icon: "🏠",
      points: ["Reinigung bis zum Kanal", "Für Eigentümer & Verwaltungen", "Langfristige Sicherheit"],
    },
    {
      title: "Notdienst 24/7",
      icon: "🚨",
      points: ["Rund um die Uhr", "Auch an Wochenenden & Feiertagen", "Soforthilfe garantiert"],
    },
  ];

  return (
    <section id="services" className="py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section-Label */}
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-blue-500 mb-2">
          LEISTUNGEN
        </p>

        {/* Überschrift */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
          Unsere Services – Schnell &amp; Professionell
        </h2>

        <p className="max-w-2xl mx-auto text-center text-gray-500 mb-12 text-sm sm:text-base">
          Ob verstopfter Abfluss, WC-Probleme oder komplette Rohrreinigung:
          wir kümmern uns schnell, sauber und zuverlässig um Ihr Anliegen.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`
   group relative flex flex-col
    bg-white
    rounded-2xl border border-gray-200/80
    shadow-sm
    transition-all duration-300
    overflow-hidden
    transform-gpu
    animate-fade-up

    hover:shadow-2xl
    hover:border-blue-500/60
    hover:-translate-y-2
    hover:scale-[1.03]
    group-hover:animate-push-forward
  `}
  style={{
    animationDelay: `${index * 90}ms`,
  }}
            >
              <div className="p-6 lg:p-7 flex-1 flex flex-col">
                {/* Icon + Titel */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="
                      flex items-center justify-center
                      h-11 w-11 rounded-xl
                      bg-blue-50 text-blue-600
                      text-2xl
                      group-hover:bg-blue-600 group-hover:text-white
                      transition-colors duration-300
                    "
                  >
                    <span aria-hidden="true">{service.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-1.5 text-sm text-gray-600 mb-5 flex-1">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-[2px]">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  type="button"
                  className="
                    mt-auto
                    w-full
                    inline-flex items-center justify-center
                    rounded-xl
                    bg-blue-600 text-white
                    font-semibold text-sm sm:text-base
                    py-3
                    shadow-sm
                    group-hover:bg-blue-700
                    group-hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  Soforthilfe anfordern
                </button>
              </div>

              {/* dezenter Glanz oben */}
              <div
                className="
                  pointer-events-none
                  absolute inset-x-0 top-0 h-10
                  bg-gradient-to-b from-white/40 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   3) WARUM EXPERTROHRREINIGUNG
=========================== */
function WhyExpertSection() {
  return (
    <section id="about" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LINKES PANEL – LOGO / TRUST-CARD */}
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-xl border border-slate-100 p-10 lg:p-12">
              <div className="flex items-center justify-center h-full">
                <img
                  src={expertRohrLogo}
                  alt="ExpertRohr Logo"
                  className="w-full max-w-md object-contain"
                />
              </div>
            </div>

            {/* Jahre Erfahrung Badge */}
            <div className="absolute -bottom-6 left-6">
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl shadow-xl shadow-blue-500/40">
                <div className="text-lg font-bold leading-none">5+ Jahre</div>
                <div className="text-xs opacity-90">
                  Erfahrung im Notdienst
                </div>
              </div>
            </div>
          </div>

          {/* RECHTES PANEL – TEXT / USPs */}
          <div>
            <p
              className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-blue-600 uppercase mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Warum ExpertRohr?
            </p>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ihre erste Wahl bei Rohrverstopfung
              <br className="hidden sm:block" />
              <span className="sm:ml-1"> in Berlin &amp; Brandenburg.</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
              Seit über 5 Jahren helfen wir täglich bei Rohrverstopfungen,
              Überschwemmungen und Notfällen. Schnell vor Ort, fair im Preis
              und mit maximaler Sorgfalt – damit Sie das Thema sofort abhaken
              können.
            </p>

            {/* USPs / Bullet Points */}
            <div className="space-y-6">
              {/* USP 1 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600 text-xl">
                  ⏱️
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Soforthilfe in 30–60 Min. vor Ort*
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Im Notfall sind unsere Techniker meist innerhalb einer
                    Stunde bei Ihnen – auch abends und am Wochenende.
                  </p>
                </div>
              </div>

              {/* USP 2 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-xl">
                  💰
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Feste Preise – keine versteckten Kosten
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Sie kennen den Preis, bevor wir starten. Keine
                    Anfahrtsfallen, keine dubiosen Zuschläge – transparent &amp;
                    fair.
                  </p>
                </div>
              </div>

              {/* USP 3 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 text-xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Schonende &amp; schadenfreie Rohrreinigung
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Moderne Technik und geschulte Fachkräfte sorgen dafür, dass
                    Leitungen frei werden – ohne unnötige Beschädigungen.
                  </p>
                </div>
              </div>

              {/* USP 4 */}
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 text-xl">
                  ⭐
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Über 5,0 / 5,0 ⭐ zufriedene Kunden
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Viele Stammkunden, Empfehlungen und Top-Bewertungen
                    sprechen für sich – ExpertRohr gehört zu den
                    zuverlässigsten Anbietern der Region.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-gray-400">
              *Einsatzzeit abhängig von Tageszeit, Verkehrslage und
              Einsatzgebiet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



/* ===========================
   4) GOOGLE BEWERTUNGEN
=========================== */
function ReviewsSection() {
  const reviews = [
    {
      name: "Markus B.",
      stars: 5,
      date: "April 2024",
      text: "Sehr schnelle und gute Arbeit!",
    },
    {
      name: "Julia K.",
      stars: 5,
      date: "März 2024",
      text: "Zuverlässig und effizient, immer wieder gerne.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header / Trust-Zeile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-yellow-600 uppercase mb-1">
              Social Proof
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Google Bewertungen
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-md">
              Echte Meinungen von Kunden, die unseren Rohrreinigungs-Notdienst
              bereits genutzt haben.
            </p>
          </div>

          {/* Rating-Badge rechts */}
          <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-md border border-gray-200">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4285F4] text-white font-bold text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">5,0 / 5,0</span>
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
              <p className="text-xs text-gray-500 leading-snug">
                Basierend auf allen Google-Bewertungen
              </p>
            </div>
          </div>
        </div>

        {/* Rahmen / Card für den ganzen Bewertungsbereich */}
        <div className="bg-white/90 border border-gray-200 rounded-3xl shadow-lg px-4 sm:px-6 py-6 sm:py-8 relative overflow-hidden">
          {/* Highlight-Leiste */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />

          {/* Fade-Ränder */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white to-transparent z-10" />

          {/* Marquee mit Review-Karten */}
          <div className="mt-2 overflow-hidden">
            <div className="flex animate-marquee gap-6">
              {reviews.concat(reviews).map((review, idx) => (
                <article
                  key={idx}
                  className="min-w-[260px] max-w-xs bg-white border border-gray-100 rounded-2xl shadow-sm px-4 py-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mr-2">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm leading-tight">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-sm">
                      {Array.from({ length: review.stars }).map((_, i) => "★")}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {review.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* kleines Trust-Detail unten */}
          <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
            <span className="text-yellow-500">★</span>
            <span>
              Wir zeigen nur echte Bewertungen von verifizierten Kunden, die unseren
              Service tatsächlich genutzt haben.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   5) NOTDIENST SECTION
   "Verstopftes Rohr? Wir kommen sofort."
=========================== */
function EmergencyNotdienstSection() {
  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-r from-sky-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline / Hook */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Rohrreinigung Notdienst · Berlin &amp; Brandenburg
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Verstopftes Rohr?{" "}
            <span className="text-blue-700">Wir kommen sofort.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            24/7 Notdienst für akute Rohr- &amp; Abflussprobleme – schnell vor Ort,
            faire Festpreise und saubere Ausführung, damit bei Ihnen alles wieder
            zuverlässig abläuft.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Linke Seite – Nutzen & Versprechen */}
          <div className="text-gray-700">
            <p className="text-lg mb-5">
              <span className="font-semibold">
                Rohrverstopfungen, Überschwemmungen oder Abwasserprobleme
              </span>{" "}
              treten immer dann auf, wenn man sie am wenigsten gebrauchen kann.
              Unser Notdienst ist deshalb{" "}
              <span className="font-semibold">
                rund um die Uhr – 24 Stunden an 7 Tagen
              </span>{" "}
              für Sie im Einsatz.
            </p>

            <p className="text-lg mb-6">
              Wir arbeiten mit{" "}
              <span className="font-semibold">festen, transparenten Preisen</span>{" "}
              ohne versteckte Kosten. Notdienstzuschläge werden vorab klar genannt –
              Sie wissen genau, womit Sie rechnen müssen.
            </p>

            {/* Unsere Versprechen */}
            <div className="bg-white/85 backdrop-blur rounded-2xl border border-slate-100 shadow-md p-5 mb-6">
              <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-[0.18em] uppercase mb-4">
                Ihre Vorteile mit ExpertRohr
              </p>

              <ul className="space-y-2.5 text-sm sm:text-base">
                <li className="flex gap-2">
                  <span className="mt-[3px] text-green-500">✔</span>
                  <span>
                    <span className="font-semibold">
                      In der Regel in 45–90 Minuten vor Ort*
                    </span>{" "}
                    – auch abends &amp; am Wochenende
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-[3px] text-green-500">✔</span>
                  <span>
                    <span className="font-semibold">Klare Festpreise</span> statt
                    Lockangeboten und Kostenfallen
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-[3px] text-green-500">✔</span>
                  <span>
                    <span className="font-semibold">Moderne Kameratechnik</span> für
                    exakte Schadensdiagnose
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-[3px] text-green-500">✔</span>
                  <span>
                    <span className="font-semibold">
                      Saubere &amp; schonende Arbeitsweise
                    </span>{" "}
                    – wir hinterlassen alles ordentlich
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="mt-[3px] text-green-500">✔</span>
                  <span>
                    <span className="font-semibold">Erfahrene Fachkräfte</span> mit
                    langjähriger Notdienst-Erfahrung
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA-Zeile */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Primärer Call CTA */}
              <a
                href="tel:030-23323873"
                className="
                  group
                  flex-1
                  inline-flex items-center justify-center sm:justify-start gap-3
                  bg-gradient-to-r from-[#FF6B35] to-[#FF3B2F]
                  text-white
                  px-6 sm:px-7 py-3.5
                  rounded-xl
                  shadow-[0_18px_35px_rgba(0,0,0,0.35)]
                  hover:shadow-[0_24px_45px_rgba(0,0,0,0.45)]
                  hover:-translate-y-[2px]
                  transition-all duration-300
                  lg:animate-push-forward
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 group-hover:bg-white/20 transition-colors">
                  📞
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                    Notdienst jetzt anrufen
                  </span>
                  <span className="text-[11px] sm:text-xs md:text-sm opacity-90">
                    Sofort mit einem Techniker sprechen – kostenlos &amp; unverbindlich
                  </span>
                </span>
              </a>

              {/* Sekundärer CTA – Online Anfrage */}
              <a
                href="#contact"
                className="
                  flex-1
                  inline-flex items-center justify-center sm:justify-start gap-3
                  bg-white
                  text-blue-700
                  px-6 sm:px-7 py-3.5
                  rounded-xl
                  border border-blue-200
                  hover:border-blue-500
                  hover:bg-blue-50/70
                  shadow-sm hover:shadow-md
                  transition-all duration-300
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  📩
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">
                    Online Anfrage senden
                  </span>
                  <span className="text-[11px] sm:text-xs md:text-sm opacity-90">
                    Angebot innerhalb kurzer Zeit erhalten – kostenlos &amp; unverbindlich
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              *Einsatzzeit abhängig von Tageszeit, Verkehrslage und Einsatzgebiet.
            </p>
          </div>

          {/* Rechte Seite – Image / Visual */}
          <div className="flex justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white max-w-md w-full animate-float">
              <img
                src={cameraImage}
                alt="Rohrinspektion mit moderner Kameratechnik"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/65 text-white text-xs sm:text-sm rounded-xl px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  <span className="font-semibold">
                    Rohrinspektion mit HD-Kamera
                  </span>
                  <span className="text-[11px] sm:text-xs opacity-90">
                    Schaden exakt lokalisieren · unnötiges Aufstemmen vermeiden
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


/* ===========================
   6) LIVE-EINSATZ SECTION
   "Unsere Arbeit im Live-Einsatz"
=========================== */
import React, { useRef, useState } from "react";

type LiveShot = {
  src: string;
  alt: string;
  label: string;
};

const LIVE_SHOTS: LiveShot[] = [
  {
    src: ref14,
    alt: "Grundstücksleitung im Außenbereich",
    label: "Grundstücksleitung im Außenbereich",
  },
  {
    src: ref13,
    alt: "Dachleitung mit Rohrsanierung",
    label: "Dachleitung mit Rohrsanierung",
  },
  {
    src: ref9,
    alt: "Kellerleitung im Mehrfamilienhaus",
    label: "Kellerleitung im Mehrfamilienhaus",
  },
  {
    src: ref2,
    alt: "Küche – Rohrverstopfung gelöst",
    label: "Küche – Rohrverstopfung gelöst",
  },
  {
    src: ref7,
    alt: "Freigelegte Leitung im Außenbereich",
    label: "Freigelegte Leitung im Außenbereich",
  },
  {
    src: ref15,
    alt: "Sanierung im Kellerbereich",
    label: "Sanierung im Kellerbereich",
  },
  {
    src: ref17,
    alt: "Zugangsschacht mit Rohrleitung",
    label: "Zugangsschacht mit Rohrleitung",
  },
  {
    src: ref8,
    alt: "Rohrsystem im Innenbereich",
    label: "Rohrsystem im Innenbereich",
  },
  {
    src: ref5,
    alt: "Sanierung im Wohnungsbereich",
    label: "Sanierung im Wohnungsbereich",
  },
  {
    src: ref18,
    alt: "Abwasserleitung im Technikraum",
    label: "Abwasserleitung im Technikraum",
  },
];


const LiveEinsatzSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeShot, setActiveShot] = useState<LiveShot | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ESC schließt Modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveShot(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const updateScrollButtons = () => {
    const slider = scrollRef.current;
    if (!slider) return;
    const { scrollLeft, scrollWidth, clientWidth } = slider;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    updateScrollButtons();
    const onScroll = () => updateScrollButtons();
    slider.addEventListener("scroll", onScroll);
    return () => slider.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollByDirection = (direction: "left" | "right") => {
    const slider = scrollRef.current;
    if (!slider) return;

    const step = slider.clientWidth * 0.7;
    const target =
      direction === "left"
        ? slider.scrollLeft - step
        : slider.scrollLeft + step;

    slider.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titel */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Unsere Arbeit im <span className="text-blue-700">Live-Einsatz</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Echte Einsätze – keine Stockfotos. Auf dem Handy wischen, am Desktop mit Pfeilen blättern.
          </p>
        </div>

        {/* Galerie / Slider */}
        <div className="relative">
          {/* Fade-Ränder */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-blue-50 via-blue-50/60 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-blue-50 via-blue-50/60 to-transparent" />

          {/* Pfeile – nur Desktop */}
          <button
            type="button"
            onClick={() => scrollByDirection("left")}
            disabled={!canScrollLeft}
            className="
              hidden lg:flex
              items-center justify-center
              absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
              h-10 w-10 rounded-full
              bg-white shadow-md border border-slate-200
              text-slate-700 text-xl font-semibold
              hover:bg-slate-50 hover:shadow-lg
              disabled:opacity-30 disabled:cursor-default
              z-10
            "
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => scrollByDirection("right")}
            disabled={!canScrollRight}
            className="
              hidden lg:flex
              items-center justify-center
              absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
              h-10 w-10 rounded-full
              bg-white shadow-md border border-slate-200
              text-slate-700 text-xl font-semibold
              hover:bg-slate-50 hover:shadow-lg
              disabled:opacity-30 disabled:cursor-default
              z-10
            "
          >
            ›
          </button>

          {/* Scroll-Container – nur native Scroll-Physik */}
          <div
            ref={scrollRef}
            className="
              overflow-x-auto lg:overflow-hidden
              pb-4
              no-scrollbar
              touch-pan-x
            "
          >
            <div className="flex gap-6 select-none">
              {LIVE_SHOTS.map((shot) => (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => setActiveShot(shot)}
                  className="
                    relative flex-shrink-0
                    w-72 h-72 sm:w-80 sm:h-80
                    rounded-2xl overflow-hidden
                    bg-slate-100 shadow-md
                    transition-transform duration-300 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500/70
                  "
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full h-full object-cover"
                  />

                  {/* Label unten mittig */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
                    <span
                      className="
                        inline-block px-3 py-1
                        rounded-full
                        text-[11px] sm:text-xs font-semibold
                        bg-black/70 text-white
                        shadow-sm
                      "
                    >
                      {shot.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* kleiner Indikator */}
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-28 rounded-full bg-blue-100 relative overflow-hidden">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 rounded-full bg-blue-500" />
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            Echte Einsätze · Keine Stockfotos · Aufnahmen direkt von unseren Technikern
          </p>
        </div>
      </div>

      {/* Modal / Lightbox */}
      {activeShot && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 sm:px-6"
          onClick={() => setActiveShot(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeShot.src}
              alt={activeShot.alt}
              className="w-full h-full max-h-[90vh] object-contain bg-black"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3 flex items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-white">
                <div className="font-semibold">{activeShot.label}</div>
                <div className="text-[11px] sm:text-xs opacity-80">
                  Aufnahme direkt aus einem echten Einsatz von ExpertRohr
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveShot(null)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/90 text-gray-800 text-sm font-bold hover:bg-white"
                aria-label="Schließen"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};



/* ===========================
   7) FAQ SECTION
=========================== */
function FAQSection() {
  const faqItems = [
    {
      question: "Wie schnell sind Sie wirklich vor Ort?",
      answer:
        "Im Notdienst sind wir in den meisten Fällen innerhalb von 30–60 Minuten bei Ihnen. Unsere Techniker sind in ganz Berlin & Brandenburg strategisch verteilt, damit wir schnell reagieren können – auch nachts, am Wochenende und an Feiertagen.",
    },
    {
      question: "Mit welchen Kosten muss ich rechnen?",
      answer:
        "Wir arbeiten mit festen, transparenten Preisen ohne versteckte Gebühren. Eine Standard-Rohrreinigung beginnt ab 89 €. Vor Arbeitsbeginn erhalten Sie immer eine klare Preisauskunft – garantiert ohne Überraschungen.",
    },
    {
      question: "Muss ich vorab etwas vorbereiten?",
      answer:
        "Nein – Sie müssen nichts vorbereiten. Entfernen Sie lediglich, wenn möglich, Gegenstände rund um den betroffenen Bereich. Unsere Techniker bringen alle Geräte und Werkzeuge vollständig mit.",
    },
    {
      question: "Welche Methoden nutzen Sie zur Rohrreinigung?",
      answer:
        "Je nach Art der Verstopfung setzen wir mechanische Spiralen, Hochdruckspülung, Kamerabefahrungen oder umweltschonende Spezialverfahren ein. Alle Methoden sind sicher, effektiv und schonend für Ihre Leitungen.",
    },
    {
      question: "Gibt es eine Garantie auf die Arbeit?",
      answer:
        "Ja. Auf jede Rohrreinigung geben wir eine Funktionsgarantie. Sollte das Problem unerwartet erneut auftreten, kommen wir selbstverständlich noch einmal kostenfrei vorbei.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Titel */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Häufig gestellte Fragen
          <span className="block mt-1 text-blue-600 text-xl font-semibold">
            Antworten auf die wichtigsten Notfall-Fragen
          </span>
        </h2>

        {/* FAQ Container */}
        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   8) KONTAKT SECTION
   "Kontakt aufnehmen"
=========================== */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    problem: "",
    urgent: false,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSuccessMessage(null);

  try {
    // 👇 Lokal (DEV): API über localhost:5000
    // 👇 Live (PROD): gleiches Origin -> leere Base-URL, wir rufen einfach /send-email auf
    const API_BASE_URL = import.meta.env.DEV
      ? (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000")
      : "";

    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Fehler beim Senden der E-Mail");
    }

    setSuccessMessage(
      "Vielen Dank! Ihre Anfrage ist bei uns eingegangen – ein Monteur meldet sich in Kürze telefonisch bei Ihnen."
    );

    setTimeout(() => setSuccessMessage(null), 10000);

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      problem: "",
      urgent: false,
    });
  } catch (error) {
    console.error("Fehler:", error);
    alert(
      "Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es später noch einmal oder rufen Sie uns direkt an."
    );
  }
};

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-14">
          <p className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Kostenlos & unverbindlich
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Kontakt aufnehmen
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Schildern Sie uns Ihr Problem – wir melden uns schnell mit einem
            fairen Festpreis-Vorschlag zurück.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LINKER BLOCK – FORMULAR */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Kostenvoranschlag anfordern
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Dauerhaft faire Preise, echte Monteure – kein Callcenter.
              </p>

              {successMessage && (
                <div className="mb-5 rounded-xl bg-green-50 border border-green-300 text-green-800 px-4 py-3 text-sm">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="z. B. 030-23323873"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Wir melden uns nur zu dieser Anfrage – kein Spam, kein
                      Callcenter.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail (optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="ihre@email.de"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Straße, Hausnummer, PLZ Ort"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Problem beschreiben *
                    </label>
                    <span className="text-xs text-gray-400">
                      Je genauer, desto schneller können wir helfen.
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={formData.problem}
                    onChange={(e) =>
                      setFormData({ ...formData, problem: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder='z. B. „WC läuft über, Wasser steigt in der Dusche hoch, Mehrfamilienhaus, 3. OG“'
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={formData.urgent}
                    onChange={(e) =>
                      setFormData({ ...formData, urgent: e.target.checked })
                    }
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                    🚨 Notfall – sofortige Hilfe gewünscht
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Jetzt Rückruf & Kostenvoranschlag anfordern
                </button>

                <p className="text-[11px] text-gray-400 text-center">
  Mit dem Absenden des Formulars erkläre ich mich damit einverstanden,
  dass meine Angaben zur Kontaktaufnahme und Bearbeitung meiner Anfrage
  verarbeitet werden. Weitere Informationen finde ich in der Datenschutzerklärung.
</p>
              </form>
            </div>
          </div>

          {/* RECHTER BLOCK – NOTFALL, KONTAKT, GARANTIE */}
          <div className="space-y-8">
            {/* Notfall-Box */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl p-8 shadow-2xl">
              {/* Light-Glow */}
              <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

              <h3 className="text-2xl font-bold mb-2 relative z-[1]">
                🚨 Notfall? Rohr verstopft?
              </h3>

              <ul className="relative z-[1] space-y-1.5 text-sm sm:text-base mb-5">
                <li>
                  • In der Regel in <strong>45–90 Minuten</strong> bei Ihnen vor
                  Ort
                </li>
                <li>• 24/7 erreichbar – auch an Wochenenden & Feiertagen</li>
                <li>• Direkter Kontakt zu einem Monteur, kein Callcenter</li>
              </ul>

              <a
                href="tel:030-23323873"
                className="relative z-[1] group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white text-red-600 px-6 py-3.5 text-base sm:text-lg font-bold shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-all duration-200 hover:shadow-[0_16px_35px_rgba(0,0,0,0.35)] hover:scale-[1.03]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-lg">
                  📞
                </span>
                <span>Sofort-Notdienst anrufen: 030-23323873</span>
              </a>

              <div className="mt-4 text-xs sm:text-sm opacity-95 relative z-[1]">
                Direkt mit einem Monteur sprechen • Keine versteckten
                Notdienstgebühren • Schnelle Anfahrt in Berlin & Brandenburg
              </div>
            </div>

            {/* Kontaktdaten */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Kontaktdaten
              </h3>
              <div className="space-y-4 text-gray-800 text-sm sm:text-base">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-lg">📞</span>
                  <span>030-23323873</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-lg">📧</span>
                  <span>info@expertrohr.de</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-lg">📍</span>
                  <span>Berlin & Brandenburg</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600 text-lg">🕒</span>
                  <span>24/7 Notdienst verfügbar</span>
                </div>
              </div>
            </div>

            {/* Garantie / Trust-Box */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-3">
                ✅ Unsere Garantie bei jedem Einsatz
              </h3>
              <ul className="space-y-2 text-green-800 text-sm sm:text-base">
                <li>• Transparente Festpreise – keine versteckten Kosten</li>
                <li>• Lösung in den allermeisten Fällen direkt vor Ort</li>
                <li>• Saubere, sorgfältige Arbeitsweise</li>
                <li>• Erfahrene Fachkräfte, keine Subunternehmer-Ketten</li>
              </ul>
              <p className="mt-3 text-xs sm:text-sm text-green-700/80">
                So wissen Sie genau, womit Sie rechnen können – vor und nach der
                Reinigung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ===========================
   9) FOOTER
=========================== */
type FooterProps = {
  onImpressumClick?: () => void;
  onDatenschutzClick?: () => void;
  onAgbClick?: () => void;
};

function Footer({
  onImpressumClick,
  onDatenschutzClick,
  onAgbClick,
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ÖFFNUNGSZEITEN */}
        <div className="text-center mb-10">
          <h4 className="text-lg font-semibold mb-2">Öffnungszeiten</h4>
          <p className="text-gray-400">24/7 Notdienst – immer erreichbar</p>
        </div>

        {/* GRID – 3 SPALTEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:items-start md:justify-items-start">

          {/* SPALTE 1 – Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">

              {/* Logo Image statt BackgroundImage */}
              <img
                src={expertRohrLogo}
                alt="ExpertRohr Logo"
                className="w-10 h-10 rounded-lg mr-3 object-cover"
              />

              <h3 className="text-xl font-bold">ExpertRohr</h3>
            </div>

            <p className="text-gray-400 mb-4 text-center md:text-left">
              Ihr zuverlässiger Partner für professionelle Rohrreinigung in
              Berlin und Brandenburg.
            </p>

            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Google
              </a>
            </div>
          </div>

          {/* SPALTE 2 – Zahlungsarten */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Zahlungsarten</h4>
            <ul className="space-y-2 text-gray-400">
              <li>✔ Barzahlung</li>
              <li>✔ EC-Karte</li>
              <li>✔ Kreditkarte</li>
              <li>✔ PayPal</li>
              <li>✔ Rechnung (Gewerbe)</li>
            </ul>
          </div>

          {/* SPALTE 3 – Kontakt */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-gray-400">
              <div>📞 030-23323873</div>
              <div>📧 info@expertrohr.de</div>
              <div>🕒 24/7 Notdienst</div>

              <div className="mt-4 flex justify-center md:justify-start">
                <a
                  href="tel:030-23323873"
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all inline-block"
                >
                  Jetzt anrufen
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* UNTERE LEISTE */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 ExpertRohr. Alle Rechte vorbehalten.
          </div>

          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <button
              type="button"
              onClick={onImpressumClick}
              className="hover:text-white transition-colors"
            >
              Impressum
            </button>

            <button
              type="button"
              onClick={onDatenschutzClick}
              className="hover:text-white transition-colors"
            >
              Datenschutz
            </button>

            <button
              type="button"
              onClick={onAgbClick}
              className="hover:text-white transition-colors"
            >
              AGB
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===========================
   APP KOMPONENTE
=========================== */
export default function App() {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);
  const [isAgbOpen, setIsAgbOpen] = useState(false);

  // 🔸 Steuert den Sticky-Call-Button unten
  const [showStickyCall, setShowStickyCall] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
          setShowStickyCall(false);
          return;
        }

        const ratio = entry.intersectionRatio;
        // ⬇️ Zeig den Sticky-Button, wenn Hero-Section <= 30% sichtbar ist
        setShowStickyCall(ratio <= 0.3);
      },
      {
        threshold: [0, 0.3, 1],
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleImpressum = () => setIsImpressumOpen((prev) => !prev);
  const toggleDatenschutz = () => setIsDatenschutzOpen((prev) => !prev);
  const toggleAgb = () => setIsAgbOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <TopNoticeBar />
        <Header />
      </div>

      <main className="pt-[120px]">
        {/* 1) Rohrreinigung vom Fachbetrieb */}
        <HeroSection />

        {/* 2) Unsere Services – Schnell & Professionell */}
        <ServicesSection />

        {/* 3) Warum ExpertRohrreinigung */}
        <WhyExpertSection />

        {/* 4) Google Bewertungen */}
        <ReviewsSection />

        {/* 5) Verstopftes Rohr? Wir kommen sofort. */}
        <EmergencyNotdienstSection />

        {/* 6) Unsere Arbeit im Live-Einsatz */}
        <LiveEinsatzSection />

        {/* 7) FAQ */}
        <FAQSection />

        {/* 8) Kontakt aufnehmen */}
        <ContactSection />
      </main>

      {/* 🟠 Mobile Sticky Call Button unten – PREMIUM VERSION */}
      {showStickyCall && (
        <div className="fixed inset-x-0 bottom-3 z-50 px-4 md:hidden">
          <a
            href="tel:030-23323873"
            aria-label="Jetzt Notdienst anrufen"
            className="group w-full flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-5 py-3.5 text-white shadow-[0_12px_30px_rgba(249,115,22,0.45)] hover:shadow-[0_16px_40px_rgba(220,38,38,0.6)] transition-all duration-200 active:scale-[0.97]"
          >
            {/* Icon-Bubble */}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">
              📞
            </span>

            {/* Textblock */}
            <span className="flex flex-col text-left">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase leading-none text-orange-100">
                Notdienst jetzt anrufen
              </span>
              <span className="text-sm sm:text-base font-bold leading-tight">
                03023323873
              </span>
            </span>

            {/* Status rechts */}
            <span className="ml-auto text-[11px] font-medium opacity-80 group-hover:opacity-100 flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-lime-300 animate-pulse" />
              <span>24/7 erreichbar</span>
            </span>
          </a>
        </div>
      )}

      {/* 9) Footer */}
      <Footer
        onImpressumClick={toggleImpressum}
        onDatenschutzClick={toggleDatenschutz}
        onAgbClick={toggleAgb}
      />

      {/* Impressum Popup */}
      {isImpressumOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative">
            {/* Schließen */}
            <button
              onClick={toggleImpressum}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✖
            </button>

            {/* Überschrift */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Impressum
            </h2>

            {/* Inhalt */}
            <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
              <div>
                <p className="font-semibold">Angaben gemäß § 5 TMG</p>
                <p>
                  ExpertRohr – Rohrreinigung
                  <br />
                  Inhaber: <span className="font-medium">Marius Labitzke</span>
                  <br />
                  Lüdersdorfer Dorfstraße 3c
                  <br />
                  16269 Wriezen
                </p>
              </div>

              <div>
                <p className="font-semibold">Kontakt</p>
                <p>
                  Telefon:{" "}
                  <span className="font-medium">030 233 23 873</span>
                  <br />
                  E-Mail:{" "}
                  <span className="font-medium">info@expertrohr.de</span>
                  <br />
                  Website:{" "}
                  <span className="font-medium">
                    https://www.expertrohr.de
                  </span>
                </p>
              </div>

              <div>
                <p className="font-semibold">Umsatzsteuer-ID</p>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
                  <br />
                  <span className="font-medium">DE350030975</span>
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Verantwortlich nach § 18 Abs. 2 MStV
                </p>
                <p>
                  <span className="font-medium">Marius Labitzke</span>
                  <br />
                  Anschrift wie oben.
                </p>
              </div>

              <div>
                <p className="font-semibold">
                  Hinweis auf EU-Streitschlichtung / Verbraucherschlichtung
                </p>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:
                  <br />
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  <br />
                  Wir sind nicht verpflichtet und nicht bereit, an einem
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Datenschutz Popup */}
      {isDatenschutzOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Datenschutzerklärung</h2>

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              <p>
                Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz
                Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen.
                Nachfolgend informieren wir Sie über die Verarbeitung Ihrer
                Daten gemäß Art. 13 DSGVO.
              </p>

              <h3 className="text-lg font-semibold mt-4">1. Verantwortlicher</h3>
              <p>
                ExpertRohr
                <br />
                Inhaber: Marius Labitzke
                <br />
                Lüdersdorfer Dorfstraße 3c
                <br />
                16269 Wriezen
                <br />
                Telefon: 030 233 23 873
                <br />
                E-Mail: info@expertrohr.de
              </p>

              <h3 className="text-lg font-semibold mt-4">
                2. Zugriffsdaten & Logfiles
              </h3>
              <p>
                Beim Besuch dieser Website werden durch den Hostinganbieter
                automatisch Server-Logfiles (z. B. IP-Adresse, Datum, Uhrzeit,
                Browsertyp) erhoben. Diese Daten sind technisch erforderlich, um
                die Website bereitzustellen. Rechtsgrundlage ist Art. 6 Abs. 1
                lit. f DSGVO (berechtigtes Interesse).
              </p>

              <h3 className="text-lg font-semibold mt-4">3. Kontaktformular</h3>
              <p>
                Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die dort
                eingegebenen Daten (Name, Telefonnummer, Adresse,
                Problembeschreibung) zur Bearbeitung Ihrer Anfrage.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertrag bzw.
                vorvertragliche Maßnahmen).
              </p>
              <p>
                Die E-Mail-Zustellung erfolgt über unseren E-Mail-Dienstleister
                (z. B. IONOS). Mit diesem besteht ein Vertrag zur
                Auftragsverarbeitung gemäß Art. 28 DSGVO.
              </p>

              <h3 className="text-lg font-semibold mt-4">
                4. Telegram-Benachrichtigung
              </h3>
              <p>
                Für besonders dringende Anfragen können wir Ihr Anliegen
                zusätzlich automatisiert an einen internen Telegram-Kanal
                weiterleiten, um schnell reagieren zu können. Rechtsgrundlage
                ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
              </p>

              <h3 className="text-lg font-semibold mt-4">
                5. Cookies & Einwilligung
              </h3>
              <p>
                Wir setzen technisch notwendige Cookies ein, um grundlegende
                Funktionen der Website bereitzustellen sowie Ihre
                Einwilligungsentscheidung zu speichern. Rechtsgrundlage ist Art.
                6 Abs. 1 lit. c DSGVO in Verbindung mit Art. 6 Abs. 1 lit. f
                DSGVO.
              </p>

              <h3 className="text-lg font-semibold mt-4">6. Ihre Rechte</h3>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
                Einschränkung der Verarbeitung, Widerspruch gegen die
                Verarbeitung sowie Datenübertragbarkeit gemäß Art. 15–21 DSGVO.
                Zudem haben Sie das Recht auf Beschwerde bei einer
                Datenschutzaufsichtsbehörde.
              </p>

              <h3 className="text-lg font-semibold mt-4">
                7. Kontakt zum Datenschutz
              </h3>
              <p>
                Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten
                kontaktieren Sie uns bitte unter:
                <br />
                E-Mail: info@expertrohr.de
              </p>
            </div>

            <button
              onClick={toggleDatenschutz}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* AGB Popup */}
      {isAgbOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              Allgemeine Geschäftsbedingungen (AGB)
            </h2>

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
  <p>
    Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen
    der ExpertRohr – Rohrreinigung, Inhaber Marius Labitzke, gegenüber
    Verbrauchern und Unternehmern. Abweichende Bedingungen des Kunden finden
    keine Anwendung, sofern wir ihrer Geltung nicht ausdrücklich zustimmen.
  </p>

  <h3 className="text-lg font-semibold mt-4">1. Leistungsumfang</h3>
  <p>
    Wir erbringen Dienstleistungen im Bereich Rohr-, Abfluss- und Kanalreinigung,
    Notdiensteinsätze, Kamerauntersuchungen sowie damit verbundene Arbeiten.
    Art und Umfang der Leistung ergeben sich aus unserem Angebot, dem telefonisch
    vereinbarten Auftrag oder der Anfrage über das Kontaktformular.
  </p>

  <h3 className="text-lg font-semibold mt-4">2. Auftragsbestätigung</h3>
  <p>
    Ein Auftrag gilt als verbindlich erteilt, sobald der Kunde:
  </p>
  <ul className="list-disc ml-6 space-y-1">
    <li>seine Kontaktdaten telefonisch gegenüber dem Monteur mitteilt, oder</li>
    <li>über das Kontaktformular Hilfe anfordert und die Anfrage absendet.</li>
  </ul>
  <p>
    Bei Firmenkunden ist zusätzlich eine schriftliche Auftragsbestätigung
    (E-Mail ausreichend) erforderlich.
  </p>

  <h3 className="text-lg font-semibold mt-4">3. Stornierung</h3>
  <p>
    Eine Stornierung des Einsatzes ist kostenfrei möglich, solange sich der
    Monteur noch nicht auf der Anfahrt befindet.
  </p>
  <p>
    Erfolgt die Stornierung nach erfolgter Anfahrt oder bereits begonnenem
    Einsatz, wird eine angemessene Anfahrtspauschale berechnet. Die Höhe der
    Pauschale richtet sich nach Entfernung, Einsatzzeit und entstandenen Kosten.
  </p>

  <h3 className="text-lg font-semibold mt-4">4. Preise & Zahlungen</h3>
  <p>
    Unsere Preise verstehen sich inklusive gesetzlicher Mehrwertsteuer, sofern
    nicht anders angegeben. Notdienstzuschläge, Materialkosten sowie
    Zusatzleistungen können gesondert berechnet werden.
  </p>
  <p>
    Die Zahlung erfolgt direkt nach Abschluss der Arbeiten in bar, per EC-/Kreditkarte
    oder – bei gewerblichen Kunden nach Vereinbarung – auf Rechnung.
  </p>

  <h3 className="text-lg font-semibold mt-4">5. Mitwirkungspflichten des Kunden</h3>
  <p>
    Der Kunde sorgt dafür, dass der Einsatzort zugänglich ist und relevante
    Informationen (z. B. bekannte Vorschäden, verdeckte Leitungsführungen)
    mitgeteilt werden. Unterbleiben diese Angaben, können hieraus entstehende
    Mehrkosten separat berechnet werden.
  </p>

  <h3 className="text-lg font-semibold mt-4">6. Haftung</h3>
  <p>
    Wir haften für Schäden nur bei Vorsatz oder grober Fahrlässigkeit sowie bei
    Verletzung wesentlicher Vertragspflichten. Bei leicht fahrlässiger Verletzung
    einer wesentlichen Pflicht ist die Haftung auf den typischerweise
    vorhersehbaren Schaden begrenzt.
  </p>
  <p>
    Für Schäden an bereits vorgeschädigten, maroden oder falsch installierten
    Rohren übernehmen wir keine Haftung, sofern der Schaden auf den Vorschaden
    oder die bauliche Situation zurückzuführen ist.
  </p>

  <h3 className="text-lg font-semibold mt-4">7. Gewährleistung</h3>
  <p>
    Es gelten die gesetzlichen Gewährleistungsrechte. Offensichtliche Mängel
    sind unverzüglich, spätestens innerhalb von 7 Tagen nach Abschluss der
    Arbeiten, anzuzeigen.
  </p>

  <h3 className="text-lg font-semibold mt-4">8. Eigentumsvorbehalt</h3>
  <p>
    Bis zur vollständigen Bezahlung verbleiben von uns eingebaute Materialien
    in unserem Eigentum, sofern eine Trennung ohne Beschädigung möglich ist.
  </p>

  <h3 className="text-lg font-semibold mt-4">9. Gerichtsstand</h3>
  <p>
    Für Unternehmer ist der Gerichtsstand unser Geschäftssitz. Für Verbraucher
    gilt der gesetzliche Gerichtsstand.
  </p>

  <h3 className="text-lg font-semibold mt-4">10. Schlussbestimmungen</h3>
  <p>
    Es gilt das Recht der Bundesrepublik Deutschland. Sollte eine Bestimmung
    dieser AGB unwirksam sein oder werden, bleibt die Gültigkeit der übrigen
    Bestimmungen unberührt.
  </p>
            </div>

            <button
              onClick={toggleAgb}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      <Toaster />

      {/* Cookie Banner */}
      <CookieBanner />

      {/* Inline Style für Animationen & FAQ */}
      <style>
        {`
/* ============================= */
/* GLOBAL ANIMATIONS */
/* ============================= */

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  display: flex;
  animation: marquee 20s linear infinite;
}

/* FAQ Styles */
.faq-answer {
  max-height: 0;
  padding: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;
}

.faq-answer.open {
  max-height: 1000px;
  padding: 10px 0;
  overflow: visible;
}

/* Optional: Image-Carousel-Klassen (falls du sie später nutzen willst) */
.carousel-container {
  overflow: hidden;
}
.carousel-container .flex {
  display: flex;
  animation: marquee 40s linear infinite;
}
.carousel-item {
  flex-shrink: 0;
  width: 320px;
  height: 320px;
  margin-right: 16px;
}
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.carousel-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
}
@media (max-width: 768px) {
  .carousel-item {
    width: 250px;
    height: 250px;
  }
}

/* ExpertRohr Logo + Google Button (Reserve-Klassen) */
.expert-google-container {
  text-align: center;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.expert-rohr-logo img {
  width: 250px;
  height: auto;
  margin-bottom: 20px;
}
.google-rating-button {
  margin-top: 20px;
}
.google-rating-button a {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  background-color: #fff;
  border-radius: 10px;
  padding: 12px 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.google-rating-button a:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.18);
}
.google-rating-img {
  width: 180px;
  margin-right: 12px;
}
.google-rating-text {
  font-size: 16px;
  color: #333;
}
        `}
      </style>
    </div>
  );
}
