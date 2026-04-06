import { useNavigate } from 'react-router-dom';
import { Dumbbell, Activity, Users, ArrowRight, Quote } from 'lucide-react';

const features = [
  {
    icon: Dumbbell,
    title: 'Individuelle Pläne',
    desc: 'Erstelle maßgeschneiderte Trainingspläne für jeden Athleten – flexibel, strukturiert und auf Ziele ausgerichtet.',
  },
  {
    icon: Activity,
    title: 'Live Tracking',
    desc: 'Erfasse Sets, Reps und Gewichte in Echtzeit. Behalte deinen Fortschritt immer im Blick.',
  },
  {
    icon: Users,
    title: 'Trainer-Link',
    desc: 'Verbinde dich direkt mit deinen Athleten für Feedback, Übungsanpassungen und Motivation.',
  },
];

const testimonials = [
  {
    text: 'Als Trainer habe ich endlich einen perfekten Überblick über alle meine Athleten. ProPerform hat meine Arbeit komplett verändert.',
    author: 'Markus T.',
    role: 'Personal Trainer',
  },
  {
    text: 'Ich sehe genau meine Schwächen und Fortschritte. Das Tracking ist genial einfach – kein Papierkram mehr.',
    author: 'Sarah K.',
    role: 'Athletin',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A]">

      {/* Hero */}
      <section className="max-w-275 mx-auto px-5 md:px-10 pt-20 pb-24">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Activity size={12} />
              Die Trainings-App für Profis
            </span>
            <h1 className="text-5xl font-bold text-[#1E3A8A] dark:text-white leading-tight mb-5">
              Werde stärker.<br />Trainiere smarter.
            </h1>
            <p className="text-base text-[#64748b] dark:text-[#94A3B8] leading-relaxed mb-8 max-w-md">
              Die All-in-One Plattform für Athleten und Trainer. Optimiere dein Training mit maßgeschneiderten Plänen und präzisem Live-Tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl border-0 cursor-pointer transition-colors"
                onClick={() => navigate('/download')}
              >
                Jetzt herunterladen
                <ArrowRight size={16} />
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-slate-200 dark:border-slate-700 text-[#1E3A8A] dark:text-white font-semibold px-6 py-3 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => navigate('/features')}
              >
                Features entdecken
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/images/phone-pro.png"
              className="w-62.5 md:w-75 object-contain drop-shadow-2xl"
              alt="ProPerform App"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1524]">
        <div className="max-w-275 mx-auto px-5 md:px-10 py-20">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Dumbbell size={12} />
              Was ProPerform bietet
            </span>
            <h2 className="text-3xl font-bold text-[#1E3A8A] dark:text-white mb-3">
              Alles, was du brauchst
            </h2>
            <p className="text-[#64748b] dark:text-[#94A3B8] max-w-md mx-auto text-sm leading-relaxed">
              Von der Planung bis zur Auswertung – ProPerform begleitet dich durch jede Phase deines Trainings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#f8fafc] dark:bg-[#1E293B] rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#F97316]" />
                </div>
                <h3 className="text-base font-semibold text-[#1E3A8A] dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-[#64748b] dark:text-[#94A3B8] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-275 mx-auto px-5 md:px-10 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#1E3A8A] dark:text-white mb-3">
            Was unsere Nutzer sagen
          </h2>
          <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
            Echte Erfahrungen von Trainern und Athleten
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(({ text, author, role }) => (
            <div key={author} className="bg-[#1E3A8A] dark:bg-[#1E293B] rounded-2xl p-7 border border-[#2d4fa8] dark:border-slate-700">
              <Quote size={24} className="text-[#F97316] mb-4 opacity-80" />
              <p className="text-white text-sm leading-relaxed mb-5">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F97316]/20 flex items-center justify-center">
                  <span className="text-[#F97316] text-sm font-bold">{author[0]}</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{author}</p>
                  <p className="text-slate-400 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1524]">
        <div className="max-w-275 mx-auto px-5 md:px-10 py-20 text-center">
          <h2 className="text-3xl font-bold text-[#1E3A8A] dark:text-white mb-3">
            Bereit für dein nächstes Level?
          </h2>
          <p className="text-sm text-[#64748b] dark:text-[#94A3B8] mb-8 max-w-md mx-auto leading-relaxed">
            Lade die App kostenlos herunter und starte heute noch mit deinem ersten strukturierten Workout.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl border-0 cursor-pointer transition-colors"
            onClick={() => navigate('/download')}
          >
            App herunterladen
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

    </div>
  );
}
