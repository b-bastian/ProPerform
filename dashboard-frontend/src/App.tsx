import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Hauptbereich */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Content-Bereich zentriert */}
        <main className="flex-1 flex items-center justify-center overflow-hidden">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
