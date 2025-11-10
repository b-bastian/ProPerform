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
          { to: "/api/users/adminLogin", label: "POST /users/adminLogin" },
          { to: "/api/users/createUser", label: "POST /users/createUser" },
          { to: "/api/users/getAll", label: "GET /users/getAll" },
          { to: "/api/users/getAllOwners", label: "GET /users/getAllOwners" },
          {
            to: "/api/users/getAllTrainers",
            label: "GET /users/getAllTrainers",
          },
          {
            to: "/api/users/getNumberOfUsers",
            label: "GET /users/getNumberOfUsers",
          },
          {
            to: "/api/users/getNumberOfTrainers",
            label: "GET /users/getNumberOfTrainers",
          },
          { to: "/api/users/deleteUser", label: "DELETE /users/:uid" },
        ],
      },
      {
        label: "Trainers",
        subLinks: [
          {
            to: "/api/trainers/createTrainer",
            label: "POST /trainers/createTrainer",
          },
          {
            to: "/api/trainers/verifyCode",
            label: "POST /trainers/verifyCode",
          },
          {
            to: "/api/trainers/linkAthlete",
            label: "POST /trainers/linkAthlete",
          },
          {
            to: "/api/trainers/regenerateCode",
            label: "PATCH /trainers/:id/regenerateCode",
          },
        ],
      },
    ],
  },
  { to: "/settings", icon: <Settings size={20} />, label: "Einstellungen" },
];

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
