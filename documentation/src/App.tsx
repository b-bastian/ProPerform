import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="flex min-h-screen w-screen bg-gray-900 text-white">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />

        <main className="flex-1 overflow-y-auto px-8 py-8 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
