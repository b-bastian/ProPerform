import { Smartphone, CheckCircle, Download } from 'lucide-react';

const perks = [
  'Kostenlos herunterladen',
  'Keine versteckten Kosten',
  'Sofort loslegen',
];

export default function DownloadPage() {
  const openStore = () => {
    window.open('https://apps.apple.com', '_blank');
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A]">

      {/* Hero */}
      <section className="max-w-275 mx-auto px-5 md:px-10 pt-20 pb-8 text-center">
        <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Smartphone size={12} />
          Hol dir die App
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] dark:text-white leading-tight mb-4">
          Bereit für dein<br />nächstes Level?
        </h1>
        <p className="text-base text-[#64748b] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          ProPerform ist kostenlos verfügbar. Starte noch heute mit deinem ersten strukturierten Workout.
        </p>
      </section>

      {/* Download Card */}
      <section className="max-w-275 mx-auto px-5 md:px-10 py-10">
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">

          {/* Phone Preview */}
          <div className="bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-10 md:w-72">
            <img
              src="/images/phone-pro.png"
              className="h-80 w-auto object-contain drop-shadow-xl"
              alt="ProPerform App"
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone size={16} className="text-[#F97316]" />
              <span className="text-xs font-semibold text-[#F97316] uppercase tracking-wide">iOS App</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-white mb-3">
              ProPerform für iOS
            </h2>
            <p className="text-sm text-[#64748b] dark:text-[#94A3B8] leading-relaxed mb-6">
              Lade dir die App jetzt im App Store herunter und starte dein erstes strukturiertes Workout. Verbinde dich mit deinem Trainer und verfolge deinen Fortschritt in Echtzeit.
            </p>

            <div className="flex flex-col gap-2 mb-8">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-[#F97316] shrink-0" />
                  <span className="text-sm text-[#64748b] dark:text-[#94A3B8]">{perk}</span>
                </div>
              ))}
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl border-0 cursor-pointer transition-colors w-fit"
              onClick={openStore}
            >
              <Download size={16} />
              Im App Store laden
            </button>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </div>
  );
}
