import type { JSX } from "react";
import { House, BookOpen, Code, Settings } from "lucide-react";

export type SubSubLink = {
  to: string;
  label: string;
};

export type SubLink =
  | {
      label: string;
      to: string;
    }
  | {
      label: string;
      subLinks: SubSubLink[];
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
      {
        label: "Allgemein",
        subLinks: [
          { to: "/docs/getting-started", label: "Getting Started" },
          { to: "/docs/error-responses", label: "Error Responses" },
        ],
      },
    ],
  },

  {
    to: "/api",
    icon: <Code size={20} />,
    label: "API Reference",
    subLinks: [
      {
        label: "Auth",
        subLinks: [
          { to: "/api/auth/login", label: "POST /auth/login" },
          { to: "/api/auth/register", label: "POST /auth/register" },
          {
            to: "/api/auth/admin/register",
            label: "POST /auth/admin/register",
          },
          {
            to: "/api/auth/admin/login",
            label: "POST /auth/admin/login",
          },
          {
            to: "/api/auth/trainers/login",
            label: "POST /auth/trainers/login",
          },
          {
            to: "/api/auth/check-verification-code",
            label: "POST /auth/check-verification-code",
          },
        ],
      },
      {
        label: "Users",
        subLinks: [
          { to: "/api/users", label: "GET /users" },
          {
            to: "/api/users/deleteUser/:uid",
            label: "DELETE /users/deleteUser/:uid",
          },
          { to: "/api/users/me", label: "GET /users/me" },
          { to: "/api/logs/weight", label: "POST /logs/weight" },
          { to: "/api/logs/weight/all", label: "GET /logs/weight" },
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
            to: "/api/trainers/verify-code",
            label: "POST /trainers/verify-code",
          },
          {
            to: "/api/trainers/link-athlete",
            label: "POST /trainers/link-athlete",
          },
          {
            to: "/api/trainers/:id/regenerateCode",
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
      items.push({
        to: link.to,
        label: link.label,
        category: "Navigation",
      });

      if (link.subLinks) {
        for (const sub of link.subLinks) {
          if ("subLinks" in sub) {
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
