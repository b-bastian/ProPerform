import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useIsMobile } from "../hooks/useIsMobile";

function NavItem({
  label,
  active,
  onClick,
  isMobile,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  isMobile?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`${isMobile ? "py-3 text-base" : "py-2 text-sm"} px-4 rounded-lg border-0 cursor-pointer transition-colors ${isMobile ? "mb-1 w-full text-left" : ""} ${active ? "bg-[#F97316]/20 text-[#F97316] font-semibold" : "text-slate-300 hover:text-white font-medium bg-transparent hover:bg-white/10"}`}
    >
      {label}
    </button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`h-16 flex items-center justify-between ${isMobile ? "px-5" : "px-10"} bg-[#1E3A8A] dark:bg-[#0F172A] border-b border-white/10 sticky top-0 z-100`}
      >
        <button
          onClick={() => handleNavigation("/")}
          className="text-white text-xl font-bold tracking-tight bg-transparent border-0 cursor-pointer p-0"
        >
          ProPerform
        </button>

        {!isMobile ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <NavItem
                label="Home"
                active={isActive("/")}
                onClick={() => handleNavigation("/")}
              />
              <NavItem
                label="Features"
                active={isActive("/features")}
                onClick={() => handleNavigation("/features")}
              />
              <NavItem
                label="Download"
                active={isActive("/download")}
                onClick={() => handleNavigation("/download")}
              />
              <NavItem
                label="Über uns"
                active={isActive("/about")}
                onClick={() => handleNavigation("/about")}
              />
            </div>

            <div className="w-px h-6 bg-white/20 mx-2" />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border-0 cursor-pointer text-white transition-colors"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-500 text-white font-semibold text-sm px-4 py-2 rounded-lg border-0 cursor-pointer transition-colors ml-1"
              onClick={() => handleNavigation("/login")}
            >
              Trainer Login
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 border-0 cursor-pointer text-white"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-white/10 rounded-lg border-0 cursor-pointer text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        )}
      </nav>

      {isMobile && isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-99 bg-[#1E3A8A] dark:bg-[#0F172A] border-b border-white/10 p-4 shadow-xl">
          <div className="flex flex-col gap-1">
            <NavItem
              label="Home"
              active={isActive("/")}
              onClick={() => handleNavigation("/")}
              isMobile
            />
            <NavItem
              label="Features"
              active={isActive("/features")}
              onClick={() => handleNavigation("/features")}
              isMobile
            />
            <NavItem
              label="Download"
              active={isActive("/download")}
              onClick={() => handleNavigation("/download")}
              isMobile
            />
            <NavItem
              label="Über uns"
              active={isActive("/about")}
              onClick={() => handleNavigation("/about")}
              isMobile
            />
          </div>
          <div className="h-px bg-white/10 my-3" />
          <button
            className="w-full bg-[#F97316] hover:bg-orange-500 text-white font-semibold py-3 rounded-xl border-0 cursor-pointer transition-colors"
            onClick={() => handleNavigation("/login")}
          >
            Trainer Login
          </button>
        </div>
      )}
    </>
  );
}
