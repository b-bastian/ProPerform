import { useState } from "react";

export default function Stats() {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfTrainers, setNumberOfTrainers] = useState(0);

  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const [usersRes, trainersRes] = await Promise.all([
        fetch("https://api.properform.app/users/getNumberOfUsers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://api.properform.app/users/getNumberOfTrainers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setNumberOfUsers(usersData.userCount || 0);
      }

      if (trainersRes.ok) {
        const trainersData = await trainersRes.json();
        setNumberOfTrainers(trainersData.trainerCount || 0);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useState(() => {
    fetchStats();
  });

  const stats = [
    { label: "Gesamtanzahl der Benutzer", value: numberOfUsers },
    { label: "Gesamtanzahl der Trainer", value: numberOfTrainers },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 text-white rounded-3xl shadow-2xl p-10 max-w-3xl w-[90%] text-center">
        <h1 className="text-4xl font-bold mb-8">Statistiken</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
