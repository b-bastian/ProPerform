import { useNavigate, useLocation } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const linkCls = (path: string) =>
    `mb-3 text-[15px] font-medium bg-transparent border-0 cursor-pointer p-0 text-left flex items-center gap-1.5 transition-colors ${
      pathname === path ? "text-[#F97316]" : "text-[#94A3B8] hover:text-white"
    }`;
  const textCls = "text-[#94A3B8] mb-[6px] text-sm leading-5";
  const titleCls = "font-bold mb-5 text-white text-lg";

  return (
    <div className="bg-[#0F172A] w-full flex flex-col items-center pt-15">
      <div className="w-full max-w-300 px-7.5 pb-10 flex flex-col md:flex-row justify-between gap-10 md:gap-5">
        {/* Brand Column */}
        <div className="w-full md:w-[30%]">
          <p className="text-white text-2xl font-bold mb-2">ProPerform</p>
          <div className="h-0.75 w-10 bg-[#F97316] rounded-sm mb-4" />
          <p className="text-[#94A3B8] leading-6">
            Die All-in-One Plattform für Athleten und Trainer. Werde stärker,
            trainiere smarter und verfolge deinen Fortschritt.
          </p>
        </div>

        {/* Links */}
        <div className="w-full md:w-[65%] flex flex-col md:flex-row justify-between gap-7.5">
          <div className="flex-1 min-w-30">
            <p className={titleCls}>Entdecken</p>
            <button className={linkCls("/")} onClick={() => navigate("/")}>
              {pathname === "/" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Home
            </button>
            <button className={linkCls("/features")} onClick={() => navigate("/features")}>
              {pathname === "/features" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Features
            </button>
            <button className={linkCls("/download")} onClick={() => navigate("/download")}>
              {pathname === "/download" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Download
            </button>
            <button className={linkCls("/about")} onClick={() => navigate("/about")}>
              {pathname === "/about" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Über uns
            </button>
          </div>

          <div className="flex-1 min-w-30">
            <p className={titleCls}>Portal</p>
            <button className={linkCls("/login")} onClick={() => navigate("/login")}>
              {pathname === "/login" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Trainer Login
            </button>
          </div>

          <div className="flex-1 min-w-30">
            <p className={titleCls}>Rechtliches</p>
            <button className={linkCls("/impressum")} onClick={() => navigate("/impressum")}>
              {pathname === "/impressum" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Impressum
            </button>
            <button className={linkCls("/datenschutz")} onClick={() => navigate("/datenschutz")}>
              {pathname === "/datenschutz" && <span className="w-1 h-1 rounded-full bg-[#F97316] shrink-0" />}
              Datenschutz
            </button>
          </div>

          <div className="flex-1 min-w-30">
            <p className={titleCls}>Kontakt</p>
            <p className={textCls}>Karl-Vogt-Straße 21</p>
            <p className={textCls}>5700 Zell am See</p>
            <p className={textCls}>Österreich</p>
            <p className={textCls}>contact@properform.app</p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-white/10 py-5 flex items-center justify-center">
        <p className="text-[#64748B] text-sm text-center">
          {new Date().getFullYear()} © ProPerform. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  );
}
