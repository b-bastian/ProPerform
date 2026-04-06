import { BookOpen, Activity, Trophy, ArrowRight } from 'lucide-react';

const modules = [
  {
    icon: BookOpen,
    badge: 'Planung',
    title: 'Smarte Trainingspläne',
    description: 'Erstelle individuelle Trainingspläne und weise sie deinen Athleten direkt zu. Strukturiere jede Einheit nach Übung, Sets und Wiederholungen – alles an einem Ort.',
    imageSrc: '/images/feature1.jpeg',
    imageSrc2: '/images/feature4.jpeg',
    reverse: false,
  },
  {
    icon: Activity,
    badge: 'Tracking',
    title: 'Live Workout Tracking',
    description: 'Hake deine Sets live ab, verfolge deine Wiederholungen und behalte den Timer im Blick. Kein Papierkram mehr – nur noch reiner Fokus auf die Leistung.',
    imageSrc: '/images/feature2.jpeg',
    reverse: true,
  },
  {
    icon: Trophy,
    badge: 'Motivation',
    title: 'Erfolge & Streaks',
    description: 'Bleib motiviert! Verfolge deine wöchentlichen Ziele, sammle Streaks für aktive Tage und sieh deinen Fortschritt auf einen Blick. Jede Einheit zählt.',
    imageSrc: '/images/feature3.jpeg',
    reverse: false,
  },
];

export default function Features() {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A]">

      {/* Hero */}
      <section className="max-w-275 mx-auto px-5 md:px-10 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Activity size={12} />
          Unsere Funktionen
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] dark:text-white leading-tight mb-4">
          Alles, was du für dein<br />Training brauchst
        </h1>
        <p className="text-base text-[#64748b] dark:text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          ProPerform kombiniert smarte Trainingspläne mit präzisem Tracking, damit du dich voll auf deine Leistung konzentrieren kannst.
        </p>
      </section>

      {/* Feature Modules */}
      <section className="max-w-275 mx-auto px-5 md:px-10 pb-24 flex flex-col gap-6">
        {modules.map(({ icon: Icon, badge, title, description, imageSrc, imageSrc2, reverse }) => (
          <div
            key={title}
            className={`bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            {/* Text */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-10">
              <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-5">
                <Icon size={12} />
                {badge}
              </span>
              <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-white mb-3">{title}</h2>
              <p className="text-sm text-[#64748b] dark:text-[#94A3B8] leading-relaxed mb-6">{description}</p>
              <div className="h-0.5 w-10 bg-[#F97316] rounded-full" />
            </div>

            {/* Image */}
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-8 relative min-h-72">
              <img
                src={imageSrc}
                className="h-72 w-auto rounded-xl object-contain shadow-lg"
                alt={title}
              />
              {imageSrc2 && (
                <img
                  src={imageSrc2}
                  className="h-72 w-auto rounded-xl object-contain absolute top-10 left-10 -z-10 opacity-60"
                  alt={title}
                />
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1524]">
        <div className="max-w-275 mx-auto px-5 md:px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-[#1E3A8A] dark:text-white mb-1">
              Bereit loszulegen?
            </h3>
            <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
              Lade ProPerform herunter und starte dein erstes Workout.
            </p>
          </div>
          <a
            href="/download"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors no-underline"
          >
            App herunterladen
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
