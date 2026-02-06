import { useState } from "react";

import { CircleQuestionMark } from "lucide-react";
import authFetch from "../../functions/authFetch";

export default function AddExercise() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [sportId, setSportId] = useState("");
  const [diffLevelId, setDiffLevelId] = useState("");
  const [duration, setDuration] = useState("");
  const [equipment, setEquipment] = useState("");

  async function handleCreateExercise(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Kein Token vorhanden – bitte zuerst anmelden.");
      return;
    }

    const video_url = videoUrl;
    const thumbnail_url = thumbnailUrl;
    const sid = Number(sportId);
    const dlid = Number(diffLevelId);
    const duration_minutes = Number(duration);
    const equipment_needed = equipment;

    const res = await authFetch(
      "https://api.properform.app/admin/exercises/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          instructions,
          video_url,
          thumbnail_url,
          sid,
          dlid,
          duration_minutes,
          equipment_needed,
        }),
      },
    );

    const data = await res.json();

    if (res.ok) {
      alert(`✅ Übung ${name} wurde erfolgreich erstellt!`);
      setName("");
      setDescription("");
      setInstructions("");
      setVideoUrl("");
      setThumbnailUrl("");
      setSportId("");
      setDiffLevelId("");
      setDuration("");
      setEquipment("");
    } else {
      alert(data?.error ?? "Fehler beim Erstellen der Übung");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-6 py-16">
      <div className="bg-[#1C2541]/70 backdrop-blur-md border border-white/10 p-12 rounded-3xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-blue-400 tracking-wide flex items-center justify-center gap-3 col-span-2">
          Create Exercise
        </h1>

        <form
          onSubmit={handleCreateExercise}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 text-gray-200"
        >
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Titel
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="Chest Press"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Duration (in mins)
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="10"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={2}
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition resize-none"
              placeholder="Description..."
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows={2}
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition resize-none"
              placeholder="Instructions..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Video URL
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="youtube.com/watch?v=..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Thumbnail URL
            </label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="Thumbnail-URL"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-400 tracking-wide flex items-center gap-2">
              Sport-ID
              <div className="relative group">
                <CircleQuestionMark className="w-4 h-4 text-gray-400 cursor-pointer" />

                {/* Tooltip */}
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2
                      w-56 rounded-lg bg-[#1E2747] px-3 py-2 text-xs text-white
                      opacity-0 group-hover:opacity-100 transition
                      pointer-events-none shadow-lg"
                >
                  Eindeutige ID der Sportart. Beispiel: 1 = Gym, 2 = Basketball
                </div>
              </div>
            </label>

            <input
              type="text"
              value={sportId}
              onChange={(e) => setSportId(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="1"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-400 tracking-wide flex items-center gap-2">
              Difficulty-Level-ID
              <div className="relative group">
                <CircleQuestionMark className="w-4 h-4 text-gray-400 cursor-pointer" />

                {/* Tooltip */}
                <div
                  className="absolute left-6 top-1/2 -translate-y-1/2
                      w-56 rounded-lg bg-[#1E2747] px-3 py-2 text-xs text-white
                      opacity-0 group-hover:opacity-100 transition
                      pointer-events-none shadow-lg"
                >
                  Eindeutige ID des Difficulty-Level. Beispiel: 1 = Beginner, 2
                  = Intermediate, 3 = Advanced, 4 = Expert.
                </div>
              </div>
            </label>

            <input
              type="text"
              value={diffLevelId}
              onChange={(e) => setDiffLevelId(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="3"
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm mb-2 text-gray-400 tracking-wide">
              Equipment
            </label>
            <input
              type="text"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-[#2A3558] text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400 transition"
              placeholder="Chest Machine"
            />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white py-4 px-12 text-lg rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-blue-700/40 w-full cursor-pointer"
            >
              Übung erstellen
            </button>
          </div>

          <p className="md:col-span-2 text-center text-gray-500 text-sm">
            Nur Admins dürfen Übungen erstellen.
          </p>
        </form>
      </div>
    </div>
  );
}
