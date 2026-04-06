import { Users, Target, Heart } from "lucide-react";

const team = [
  {
    name: "Can",
    role: "Frontend Developer",
    imageSrc: "/images/can.png",
    initial: "C",
  },
  {
    name: "Bastian",
    role: "Fullstack Developer",
    imageSrc: "/images/basti.png",
    initial: "B",
  },
  {
    name: "Ljubomir",
    role: "Web Developer",
    imageSrc: "/images/ljubo.png",
    initial: "L",
  },
];

const values = [
  {
    icon: Target,
    title: "Fokus auf Leistung",
    desc: "Wir bauen Tools, die Athleten helfen, ihr volles Potenzial zu entfalten.",
  },
  {
    icon: Users,
    title: "Trainer & Athlet",
    desc: "Die Verbindung zwischen Coach und Sportler steht bei uns im Mittelpunkt.",
  },
  {
    icon: Heart,
    title: "Mit Leidenschaft",
    desc: "ProPerform entstand aus eigener Erfahrung im Leistungssport.",
  },
];

export default function About() {
  return (
    <div className="bg-[#f8fafc] dark:bg-[#0F172A]">
      {/* Hero */}
      <section className="max-w-275 mx-auto px-5 md:px-10 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Users size={12} />
          Das Team hinter ProPerform
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] dark:text-white leading-tight mb-4">
          Über uns
        </h1>
        <p className="text-base text-[#64748b] dark:text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          Wir sind drei Entwickler mit einer gemeinsamen Vision: Training
          smarter, strukturierter und messbarer zu machen.
        </p>
      </section>

      {/* Mission */}
      <section className="border-t border-slate-100 dark:border-slate-800 bg-[#1E3A8A] dark:bg-[#1E293B]">
        <div className="max-w-275 mx-auto px-5 md:px-10 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              Unsere Mission
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
              ProPerform wurde entwickelt, um Training einfacher, strukturierter
              und nachvollziehbarer zu machen. Unser Ziel ist es, eine Plattform
              zu schaffen, die Athleten und Trainer verbindet und echten
              Fortschritt sichtbar macht.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/10 rounded-xl p-5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F97316]/20 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-[#F97316]" />
                </div>
                <h3 className="text-white text-sm font-semibold mb-1">
                  {title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-275 mx-auto px-5 md:px-10 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-[#1E3A8A] dark:text-white mb-3">
            Das Team
          </h2>
          <p className="text-sm text-[#64748b] dark:text-[#94A3B8]">
            Drei Entwickler, eine Vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map(({ name, role, imageSrc, initial }) => (
            <div
              key={name}
              className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
            >
              <div className="bg-slate-50 dark:bg-slate-800/50 h-72 flex items-end justify-center">
                <img
                  src={imageSrc}
                  className="h-full w-full object-contain"
                  alt={name}
                />
              </div>
              <div className="p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F97316]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#F97316] text-sm font-bold">
                    {initial}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E3A8A] dark:text-white">
                    {name}
                  </p>
                  <p className="text-xs text-[#64748b] dark:text-[#94A3B8]">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
