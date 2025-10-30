import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  House,
  Users,
  ChartColumn,
  UserPlus,
} from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = (path: string) =>
    `flex items-center ${
      collapsed ? "justify-center" : "justify-start gap-3 px-4"
    } py-3 rounded-lg mb-2 transition-colors duration-200 ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-blue-900"
    }`;

  const links = [
    { to: "/", icon: <House size={20} />, label: "Home" },
    { to: "/users", icon: <Users size={20} />, label: "Users" },
    { to: "/stats", icon: <ChartColumn size={20} />, label: "Stats" },
    {
      to: "/create-trainer",
      icon: <Dumbbell size={20} />,
      label: "Trainer erstellen",
    },
    {
      to: "/create-owner",
      icon: <UserPlus size={20} />,
      label: "Owner erstellen",
    },
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

      <div className="flex-1">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={linkClass(link.to)}>
            <span className="text-xl">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </Link>
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
