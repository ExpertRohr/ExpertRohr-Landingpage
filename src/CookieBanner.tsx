import { useEffect, useState } from "react";

const STORAGE_KEY = "expertrohr_cookie_consent_v2";

type ConsentCategories = {
  necessary: true;        // immer true, nicht abschaltbar
  analytics: boolean;
  marketing: boolean;
  externalMedia: boolean;
};

type ViewMode = "banner" | "settings";

const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  externalMedia: false,
};

function loadConsent(): ConsentCategories | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // minimale Sicherheitsprüfung
    if (typeof parsed === "object" && parsed !== null) {
      return {
        necessary: true,
        analytics: !!parsed.analytics,
        marketing: !!parsed.marketing,
        externalMedia: !!parsed.externalMedia,
      };
    }
    return null;
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentCategories) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<ViewMode>("banner");
  const [consent, setConsent] = useState<ConsentCategories>(DEFAULT_CONSENT);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existing = loadConsent();
    if (!existing) {
      // Kein Consent → Banner anzeigen und Scrollen blockieren
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setConsent(existing);
      setVisible(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const acceptNecessaryOnly = () => {
    const newConsent: ConsentCategories = {
      necessary: true,
      analytics: false,
      marketing: false,
      externalMedia: false,
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    setVisible(false);
    document.body.style.overflow = "";
  };

  const acceptAll = () => {
    const newConsent: ConsentCategories = {
      necessary: true,
      analytics: true,
      marketing: true,
      externalMedia: true,
    };
    saveConsent(newConsent);
    setConsent(newConsent);
    setVisible(false);
    document.body.style.overflow = "";
  };

  const saveSettings = () => {
    saveConsent(consent);
    setVisible(false);
    document.body.style.overflow = "";
  };

  const toggleCategory = (key: keyof ConsentCategories) => {
    if (key === "necessary") return; // nicht abschaltbar
    setConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-10">
      <div className="w-full max-w-3xl mx-4 rounded-2xl bg-white shadow-2xl p-6 md:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Cookies &amp; externe Dienste
            </h2>
            <p className="text-sm md:text-base text-gray-700 mt-1 leading-relaxed">
              Wir nutzen Cookies und vergleichbare Technologien, um unsere
              Website technisch bereitzustellen sowie optionale Funktionen
              (z.&nbsp;B. Statistik, Karten, externe Inhalte) zu ermöglichen.
              Sie können selbst entscheiden, welche Kategorien Sie zulassen.
            </p>
          </div>

          {/* „Einstellungen“-Switcher */}
          <button
            type="button"
            onClick={() => setView(view === "banner" ? "settings" : "banner")}
            className="text-xs md:text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2"
          >
            {view === "banner" ? "Einstellungen" : "Zurück"}
          </button>
        </div>

        {view === "banner" ? (
          <>
            {/* Kurzinfo */}
            <p className="text-xs md:text-sm text-gray-500 mb-5">
              Notwendige Cookies setzen wir immer, da sie für den Betrieb der
              Seite erforderlich sind (z.&nbsp;B. Sicherheitsfunktionen,
              Formularübermittlung). Weitere Cookies (Statistik, Marketing,
              externe Medien) setzen wir nur mit Ihrer Zustimmung.
            </p>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={acceptNecessaryOnly}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Nur erforderliche Cookies
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Alle akzeptieren
              </button>
            </div>

            <p className="mt-3 text-[11px] text-gray-400">
              Ihre Auswahl können Sie jederzeit in der Datenschutzerklärung
              oder über den entsprechenden Link im Footer ändern.
            </p>
          </>
        ) : (
          <>
            {/* Detail-Einstellungen */}
            <div className="space-y-4 mb-5">
              {/* Necessary */}
              <ConsentRow
                title="Erforderliche Cookies"
                description="Für den Betrieb der Website notwendig (z.B. Sicherheit, Session, Cookie-Einwilligung, Kontaktformular)."
                checked={true}
                disabled
                onToggle={() => {}}
              />

              <ConsentRow
                title="Statistik / Analyse"
                description="Ermöglicht anonyme Auswertung der Seitennutzung, z.B. über Tools wie Google Analytics."
                checked={consent.analytics}
                onToggle={() => toggleCategory("analytics")}
              />

              <ConsentRow
                title="Marketing"
                description="Nutzung von Marketing- und Trackingtechnologien, um z.B. Werbemaßnahmen zu optimieren."
                checked={consent.marketing}
                onToggle={() => toggleCategory("marketing")}
              />

              <ConsentRow
                title="Externe Medien & Dienste"
                description="Lädt Inhalte von Drittanbietern wie Google Maps, Google Places (Bewertungen), eingebettete Inhalte etc."
                checked={consent.externalMedia}
                onToggle={() => toggleCategory("externalMedia")}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={acceptNecessaryOnly}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Nur erforderliche Cookies
              </button>
              <button
                type="button"
                onClick={saveSettings}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Auswahl speichern
              </button>
            </div>

            <p className="mt-3 text-[11px] text-gray-400">
              Ihre Auswahl wird gespeichert und bei zukünftigen Besuchen
              automatisch berücksichtigt.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* Kleine Unterkomponente für die Toggle-Reihen */
type ConsentRowProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
};

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onToggle,
}: ConsentRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 px-4 py-3">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <button
        type="button"
        onClick={!disabled ? onToggle : undefined}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full border transition ${
          disabled
            ? "bg-gray-200 border-gray-300 cursor-not-allowed"
            : checked
            ? "bg-blue-600 border-blue-600"
            : "bg-gray-200 border-gray-300"
        }`}
        aria-pressed={checked}
        aria-disabled={disabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
