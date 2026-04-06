import { FileText } from "lucide-react";

const entries = [
  { label: "Webseitenbetreiber", content: "Bastian Brugger" },
  {
    label: "Anschrift",
    content: "Karl-Vogt-Straße 21, 5700 Zell am See, Österreich",
  },
  { label: "Kontakt", content: "contact@properform.app" },
  { label: "Tätigkeitsbereich", content: "Betrieb einer Online-Plattform für Trainingsplanung und Fitness" },
  {
    label: "Urheberrecht",
    content: "Inhalte dieser Webseite sind urheberrechtlich geschützt.",
  },
  {
    label: "Haftungsausschluss",
    content:
      "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
  },
];

export default function Impressum() {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A] min-h-screen">
      <div className="max-w-150 mx-auto px-5 md:px-10 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#F97316]/10 flex items-center justify-center">
            <FileText size={16} className="text-[#F97316]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1E3A8A] dark:text-white">
            Impressum
          </h1>
        </div>

        <p className="text-xs text-[#64748b] dark:text-[#94A3B8] mb-5">
          Informationen gemäß §5 (1) ECG, § 25 MedienG, § 63 GewO und § 14 UGB
        </p>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
          {entries.map(({ label, content }, i) => (
            <div
              key={label}
              className={`flex gap-4 px-5 py-3.5 ${i !== entries.length - 1 ? "border-b border-slate-100 dark:border-slate-700" : ""}`}
            >
              <span className="text-xs font-semibold text-[#F97316] w-36 shrink-0 pt-0.5">
                {label}
              </span>
              <span className="text-sm text-[#64748b] dark:text-[#94A3B8]">
                {content}
              </span>
            </div>
          ))}

          <div className="flex gap-4 px-5 py-3.5 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-semibold text-[#F97316] w-36 shrink-0 pt-0.5">
              Rechtsvorschrift
            </span>
            <button
              className="text-sm text-[#F97316] hover:underline cursor-pointer bg-transparent border-0 p-0 text-left"
              onClick={() => window.open("https://www.ris.bka.gv.at", "_blank")}
            >
              www.ris.bka.gv.at
            </button>
          </div>

          <div className="flex gap-4 px-5 py-3.5 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-semibold text-[#F97316] w-36 shrink-0 pt-0.5">
              Streitbeilegung
            </span>
            <button
              className="text-sm text-[#F97316] hover:underline cursor-pointer bg-transparent border-0 p-0 text-left"
              onClick={() =>
                window.open("https://ec.europa.eu/consumers/odr", "_blank")
              }
            >
              ec.europa.eu/consumers/odr
            </button>
          </div>

          <div className="flex gap-4 px-5 py-3.5 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-semibold text-[#F97316] w-36 shrink-0 pt-0.5">
              Quelle
            </span>
            <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
              <button
                className="text-[#F97316] hover:underline cursor-pointer bg-transparent border-0 p-0"
                onClick={() =>
                  window.open(
                    "https://fairesrecht.at/kostenlos-impressum-erstellen-generator.php",
                    "_blank",
                  )
                }
              >
                Impressum Generator
              </button>{" "}
              in Kooperation mit{" "}
              <button
                className="text-[#F97316] hover:underline cursor-pointer bg-transparent border-0 p-0"
                onClick={() =>
                  window.open("https://rechtsanwaltwien.com/baurecht", "_blank")
                }
              >
                Rechtsanwalt Baurecht Wien
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
