import { Link, useLocation } from "react-router-dom";
import { useState, type JSX } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { navLinks, type NavLink, type SubLink } from "../data/navigation";

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
    } py-3 rounded-lg mb-1 transition-colors duration-200 ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-blue-900"
    }`;

  const subLinkClass = (path: string, isButton = false) =>
    `flex items-center justify-start gap-3 pl-12 pr-4 py-2.5 rounded-lg mb-1 transition-colors duration-200 ${
      isButton ? "cursor-pointer" : ""
    } ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:bg-blue-900 hover:text-gray-200"
    }`;

  const subSubLinkClass = (path: string) =>
    `flex items-center justify-start gap-3 pl-12 pr-4 py-2 rounded-lg mb-1 transition-colors duration-200 ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-500 hover:bg-blue-900 hover:text-gray-300"
    }`;

  const renderSubSubLinks = (subLink: SubLink, parentLabel: string) => {
    const id = `${parentLabel}-${subLink.label}`;

    if (subLink.subLinks) {
      return (
        <div key={id}>
          <button
            onClick={() => toggleExpanded(id)}
            className={`w-full ${subLinkClass("", true)}`}
          >
            <span className="flex-1 text-left text-sm font-medium">
              {subLink.label}
            </span>
            {expandedItems.includes(id) ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>

          {expandedItems.includes(id) && (
            <div className="mt-1">
              {subLink.subLinks.map((subSub) => (
                <Link
                  key={subSub.to}
                  to={subSub.to}
                  className={subSubLinkClass(subSub.to)}
                >
                  <span className="text-xs font-mono">{subSub.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={subLink.to}
        to={subLink.to!}
        className={subLinkClass(subLink.to!)}
      >
        <span className="text-sm">{subLink.label}</span>
      </Link>
    );
  };

  return (
    <div
      className={`relative h-screen bg-gray-900 border-r border-gray-800 p-4 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-8 text-white transition-opacity duration-300 ${
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ProPerform
      </h1>

      <div className="flex-1 overflow-y-auto">
        {navLinks.map((link: NavLink) => (
          <div key={link.to} className="mb-2">
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
                  <div className="mt-1">
                    {link.subLinks.map((sub) =>
                      renderSubSubLinks(sub, link.label)
                    )}
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
