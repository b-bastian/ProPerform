import type { JSX } from "react";
import { House, BookOpen, Code, Settings } from "lucide-react";

export type SubSubLink = {
  to: string;
  label: string;
};

export type SubLink = {
  to?: string;
  label: string;
  subLinks?: SubSubLink[];
};

export type NavLink = {
  to: string;
  icon: JSX.Element;
  label: string;
  subLinks?: SubLink[];
};

export const navLinks: NavLink[] = [
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
      {
        label: "Endpoints",
        subLinks: [
          { to: "/api/auth/register", label: "POST /auth/register" },
          { to: "/api/auth/login", label: "POST /auth/login" },
          { to: "/api/auth/check", label: "GET /auth/checkToken" },
        ],
      },
      {
        label: "Users",
        subLinks: [
          { to: "/api/users/get", label: "GET /users/:id" },
          { to: "/api/users/update", label: "PUT /users/:id" },
          { to: "/api/users/delete", label: "DELETE /users/:id" },
        ],
      },
      { to: "/api/authentication", label: "Authentication" },
      { to: "/api/examples", label: "Beispiele" },
    ],
  },
  { to: "/settings", icon: <Settings size={20} />, label: "Einstellungen" },
];

/* ✅ Automatische flache Search-Liste */
export const searchLinks = (() => {
  const items: { to: string; label: string; category: string }[] = [];

  const walk = (links: NavLink[]) => {
    for (const link of links) {
      // Hauptlink
      items.push({
        to: link.to,
        label: link.label,
        category: "Navigation",
      });

      if (link.subLinks) {
        for (const sub of link.subLinks) {
          if (sub.to) {
            items.push({
              to: sub.to,
              label: sub.label,
              category: link.label,
            });
          }

          if (sub.subLinks) {
            for (const subsub of sub.subLinks) {
              items.push({
                to: subsub.to,
                label: subsub.label,
                category: sub.label,
              });
            }
          }
        }
      }
    }
  };

  walk(navLinks);

  return items;
})();
