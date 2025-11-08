import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="flex min-h-screen w-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Hauptbereich */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Header />

        {/* Content scrollable */}
        <main className="flex-1 overflow-y-auto px-8 py-8 ml-64">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
