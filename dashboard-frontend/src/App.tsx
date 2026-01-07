import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900 text-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 py-4 scroll-smooth">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
