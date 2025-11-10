import { useState } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-64 right-0 z-40 bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center transition-all duration-300">
        <h2 className="text-lg font-semibold">Dokumentation</h2>
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
        >
          <Search size={18} />
          <span className="text-sm">Search</span>
        </button>
      </header>

      <div className="h-16" />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
