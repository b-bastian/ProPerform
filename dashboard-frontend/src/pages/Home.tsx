export default function Home() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-md w-[90%]">
        <h1 className="text-5xl font-bold mb-4 text-blue-400">
          🏠 Dashboard Home
        </h1>
        <p className="text-gray-300 mb-6">
          Willkommen im <span className="font-semibold">ProPerform</span>
          -Adminbereich.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
          Übersicht öffnen
        </button>
      </div>
    </div>
  );
}
