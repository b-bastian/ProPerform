import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
