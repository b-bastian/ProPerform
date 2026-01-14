import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [trainers, setTrainers] = useState<any[]>([]);

  const deleteUser = async (uid: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Kein Token vorhanden – bitte zuerst anmelden.");
      return;
    }

    const response = confirm(
      `Möchten Sie den Benutzer mit UID ${uid} wirklich löschen?`
    );
    if (!response) return;

    try {
      const res = await fetch(
        `https://api.properform.app/users/deleteUser/${uid}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        alert(`✅ Benutzer mit UID ${uid} erfolgreich gelöscht!`);
        fetchUsers();
        fetchTrainers();
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim Löschen des Benutzers");
      }
    } catch (error) {
      alert("Netzwerkfehler beim Löschen");
      console.error(error);
    }
  };

  const deleteTrainer = async (tid: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Kein Token vorhanden – bitte zuerst anmelden.");
      return;
    }

    const response = confirm(
      `Möchten Sie den Trainer mit TID ${tid} wirklich löschen?`
    );
    if (!response) return;

    try {
      const res = await fetch(
        `https://api.properform.app/trainers/deleteTrainer/${tid}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        alert(`✅ Trainer mit TID ${tid} erfolgreich gelöscht!`);
        fetchTrainers();
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim Löschen des Trainers");
      }
    } catch (error) {
      alert("Netzwerkfehler beim Löschen");
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("https://api.properform.app/users/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    setUsers(data.users || []);
  };

  const fetchTrainers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("https://api.properform.app/users/trainers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    setTrainers(data.users || []);
  };

  useEffect(() => {
    fetchUsers();
    fetchTrainers();
  }, []);

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-[90%] max-w-6xl text-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400 mx-auto">
            Benutzerverwaltung
          </h1>
        </div>

        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-sm">
              <th className="px-4">ID</th>
              <th className="px-4">Vorname</th>
              <th className="px-4">Geburtsdatum</th>
              <th className="px-4">E-Mail</th>
              <th className="px-4">Rolle</th>
              <th className="px-4">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="group transition">
                <td className="px-4 py-3 text-gray-200 font-bold bg-gray-700 group-hover:bg-gray-600 rounded-l-lg">
                  {u.uid}
                </td>
                <td className="px-4 py-3 text-gray-200 font-medium bg-gray-700 group-hover:bg-gray-600">
                  {u.firstname}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600">
                  {u.birthdate ? formatDate(u.birthdate) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600">
                  {u.email}
                </td>
                <td className="px-4 py-3 text-green-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  Nutzer
                </td>
                <td className="px-4 py-3 bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  <div className="flex items-center justify-center w-full h-full">
                    <button
                      onClick={() => deleteUser(u.uid)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TRAINER TABLE */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-[90%] mt-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-blue-400 mb-6 text-center">
          Trainerverwaltung
        </h1>

        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-sm">
              <th className="px-4">ID</th>
              <th className="px-4">Vorname</th>
              <th className="px-4">Geburtsdatum</th>
              <th className="px-4">E-Mail</th>
              <th className="px-4">Rolle</th>
              <th className="px-4">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((t, i) => (
              <tr key={i} className="group transition">
                <td className="px-4 py-3 text-gray-200 font-bold bg-gray-700 group-hover:bg-gray-600 rounded-l-lg">
                  {t.tid || t.uid}
                </td>
                <td className="px-4 py-3 text-gray-200 font-medium bg-gray-700 group-hover:bg-gray-600">
                  {t.firstname}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600">
                  {t.birthdate ? formatDate(t.birthdate) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600">
                  {t.email}
                </td>
                <td className="px-4 py-3 text-orange-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  Trainer
                </td>
                <td className="px-4 py-3 bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  <div className="flex items-center justify-center w-full h-full">
                    <button
                      onClick={() => deleteTrainer(t.tid)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        Nur angemeldete Admins können Benutzer einsehen.
      </p>
    </div>
  );
}
