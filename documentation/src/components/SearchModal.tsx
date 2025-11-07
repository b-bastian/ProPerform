import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

import { searchLinks } from "../data/navigation";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredResults = query.trim()
    ? searchLinks.filter(
        (link) =>
          link.label.toLowerCase().includes(query.toLowerCase()) ||
          link.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (to: string) => {
    navigate(to);
    onClose();
    setQuery("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        setQuery("");
      }
    };

    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-800">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search navigation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
            autoFocus
          />

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {query.trim() && (
          <div className="max-h-96 overflow-y-auto">
            {filteredResults.length > 0 ? (
              <div className="py-2">
                {filteredResults.map((res, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(res.to)}
                    className="w-full px-4 py-3 hover:bg-blue-900 transition-colors text-left flex flex-col gap-1"
                  >
                    <span className="text-white font-medium">{res.label}</span>
                    <span className="text-gray-400 text-sm">
                      {res.category}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                Keine Ergebnisse gefunden
              </div>
            )}
          </div>
        )}

        {!query.trim() && (
          <div className="px-4 py-8 text-center text-gray-500">
            Gib etwas ein um zu suchen...
          </div>
        )}
      </div>
    </div>
  );
}
