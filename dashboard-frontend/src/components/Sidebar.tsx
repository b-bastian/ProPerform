import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg mb-2 transition ${
      pathname === path ? "bg-blue-600 text-white" : "hover:bg-blue-900"
    }`;

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 border-r">
      <h1 className="text-2xl font-bold mb-6 text-white">ProPerform</h1>
      <Link to="/" className={linkClass("/")}>
        🏠 Home
      </Link>
      <Link to="/users" className={linkClass("/users")}>
        👥 Users
      </Link>
      <Link to="/stats" className={linkClass("/stats")}>
        📊 Stats
      </Link>
    </div>
  );
}
