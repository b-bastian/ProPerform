export default function Stats() {
  const stats = [
    { label: "Aktive Nutzer", value: 324 },
    { label: "Trainings heute", value: 87 },
    { label: "Gesamttrainings", value: 5421 },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white rounded-3xl shadow-2xl p-10 max-w-3xl w-[90%] text-center">
        <h1 className="text-4xl font-bold mb-8">📊 Statistiken</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/20 rounded-2xl p-6 shadow-md hover:bg-white/30 transition transform hover:-translate-y-1"
            >
              <p className="text-5xl font-bold">{s.value}</p>
              <p className="text-lg opacity-90 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
