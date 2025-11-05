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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert(`✅ Benutzer mit UID ${uid} erfolgreich gelöscht!`);
      } else {
        const data = await res.json();
        alert(data.error || "Fehler beim Löschen des Benutzers");
      }
    } catch (error) {
      alert("Netzwerkfehler beim Löschen");
      console.error(error);
    }
  };

  const fetchTrainers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("https://api.properform.app/users/getAllTrainers", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return;
    const data = await res.json();
    setTrainers(data.users || []);
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("https://api.properform.app/users/getAllUsers", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return;
    const data = await res.json();
    setUsers(data.users || []);
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
<<<<<<< HEAD
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
                <td className="px-4 py-3 text-gray-200 font-bold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.uid}
                </td>

                <td className="px-4 py-3 text-gray-200 font-medium bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.firstname}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.birthdate ? formatDate(u.birthdate) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.email}
                </td>
                {u.role_id === 1 ? (
                  <td className="px-4 py-3 text-green-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    Admin
                  </td>
                ) : u.role_id === 2 ? (
                  <td className="px-4 py-3 text-yellow-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    Nutzer
                  </td>
                ) : u.role_id === 3 ? (
                  <td className="px-4 py-3 text-red-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    Trainer
                  </td>
                ) : (
                  <td className="px-4 py-3 text-gray-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    -
                  </td>
                )}
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

      {/* Separator between users and trainers */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-[90%] max-w-6xl text-center mt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400 mx-auto">
            Trainerverwaltung
          </h1>
        </div>

        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-sm">
              <th className="px-4">TID</th>
              <th className="px-4">Vorname</th>
              <th className="px-4">Geburtsdatum</th>
              <th className="px-4">E-Mail</th>
              <th className="px-4">Rolle</th>
              <th className="px-4">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((u, i) => (
              <tr key={i} className="group transition">
                <td className="px-4 py-3 text-gray-200 font-bold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.tid}
                </td>

                <td className="px-4 py-3 text-gray-200 font-medium bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.firstname}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.birthdate ? formatDate(u.birthdate) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-300 bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                  {u.email}
                </td>
                {u.role_id === 1 ? (
                  <td className="px-4 py-3 text-green-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    Admin
                  </td>
                ) : u.role_id === 2 ? (
                  <td className="px-4 py-3 text-yellow-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    Nutzer
                  </td>
                ) : u.role_id === 3 ? (
                  <td className="px-4 py-3 text-red-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    Trainer
                  </td>
                ) : (
                  <td className="px-4 py-3 text-gray-400 font-semibold bg-gray-700 group-hover:bg-gray-600 first:rounded-l-2xl last:rounded-r-2xl">
                    -
                  </td>
                )}
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
=======
    <div className="flex items-center justify-center min-h-screen text-white px-6 py-16">
      <div className="bg-[#1C2541]/70 backdrop-blur-md border border-white/10 p-12 rounded-3xl shadow-2xl w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-400 tracking-wide flex items-center justify-center gap-3">
          Benutzerverwaltung
        </h1>

        <div className="flex justify-end mb-8">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#2A3558] text-gray-200 text-base rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="all">Alle</option>
            <option value="owners">Owners</option>
            <option value="users">Users</option>
            <option value="trainers">Trainers</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-gray-400 uppercase text-sm tracking-wider">
                <th className="px-5">UID</th>
                <th className="px-5">Vorname</th>
                <th className="px-5">Geburtsdatum</th>
                <th className="px-5">E-Mail</th>
                <th className="px-5">Rolle</th>
>>>>>>> ab4e13a33820abb0b2dc9fa577a2d26cbee42a74
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={i}
                  className="bg-[#2A3558] hover:bg-[#32406B] transition rounded-xl"
                >
                  <td className="px-5 py-3 text-gray-200 font-semibold">
                    {u.uid}
                  </td>
                  <td className="px-5 py-3 text-gray-100 font-medium">
                    {u.firstname}
                  </td>
                  <td className="px-5 py-3 text-gray-300">
                    {u.birthdate ? formatDate(u.birthdate) : "-"}
                  </td>
                  <td className="px-5 py-3 text-gray-300">{u.email}</td>
                  {u.role_id === 1 ? (
                    <td className="px-5 py-3 text-green-400 font-semibold">
                      Admin
                    </td>
                  ) : u.role_id === 2 ? (
                    <td className="px-5 py-3 text-yellow-400 font-semibold">
                      Nutzer
                    </td>
                  ) : u.role_id === 3 ? (
                    <td className="px-5 py-3 text-red-400 font-semibold">
                      Trainer
                    </td>
                  ) : (
                    <td className="px-5 py-3 text-gray-400 font-semibold">-</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Nur angemeldete Admins können Benutzer einsehen.
        </p>
      </div>
    </div>
  );
}
