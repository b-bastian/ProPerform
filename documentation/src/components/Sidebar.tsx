import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  House,
  BookOpen,
  Code,
  Settings,
} from "lucide-react";

type SubLink = {
  to: string;
  label: string;
};

type NavLink = {
  to: string;
  icon: JSX.Element;
  label: string;
  subLinks?: SubLink[];
};

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const linkClass = (path: string) =>
    `flex items-center ${
      collapsed ? "justify-center" : "justify-start gap-3 px-4"
    } py-3 rounded-lg mb-2 transition-colors duration-200 ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-blue-900"
    }`;

  const subLinkClass = (path: string) =>
    `flex items-center justify-start gap-3 py-2 rounded-lg mb-1 transition-colors duration-200 ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-blue-900"
    }`;

  const links: NavLink[] = [
    { to: "/", icon: <House size={20} />, label: "Home" },
    {
      to: "/docs",
      icon: <BookOpen size={20} />,
      label: "Dokumentation",
      subLinks: [
        { to: "/docs/getting-started", label: "Getting Started" },
        { to: "/docs/installation", label: "Installation" },
        { to: "/docs/configuration", label: "Konfiguration" },
      ],
    },
    {
      to: "/api",
      icon: <Code size={20} />,
      label: "API Reference",
      subLinks: [
        { to: "/api/endpoints", label: "Endpoints" },
        { to: "/api/authentication", label: "Authentication" },
        { to: "/api/examples", label: "Beispiele" },
      ],
    },
    { to: "/settings", icon: <Settings size={20} />, label: "Einstellungen" },
  ];

  return (
    <div
      className={`relative h-screen bg-gray-900 border-r border-gray-800 p-4 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-6 text-white transition-opacity duration-300 ${
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ProPerform
      </h1>

      <div className="flex-1 overflow-y-auto">
        {links.map((link) => (
          <div key={link.to}>
            {link.subLinks && !collapsed ? (
              <>
                <button
                  onClick={() => toggleExpanded(link.label)}
                  className={`w-full ${linkClass(link.to)} cursor-pointer`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{link.label}</span>
                      {expandedItems.includes(link.label) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </>
                  )}
                </button>
                {expandedItems.includes(link.label) && !collapsed && (
                  <div className="ml-8 mb-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.to}
                        to={subLink.to}
                        className={subLinkClass(subLink.to)}
                      >
                        <span className="text-sm">{subLink.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link to={link.to} className={linkClass(link.to)}>
                <span className="text-xl">{link.icon}</span>
                {!collapsed && <span>{link.label}</span>}
              </Link>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="cursor-pointer absolute bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
}
