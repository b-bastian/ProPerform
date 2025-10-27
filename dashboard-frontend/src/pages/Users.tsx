"use client";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  const endpoints: Record<string, string> = {
    all: "https://api.properform.app/users/getAll",
    owners: "https://api.properform.app/users/getAllOwners",
    users: "https://api.properform.app/users/getAllUsers",
    trainers: "https://api.properform.app/users/getAllTrainers",
  };

  const fetchUsers = async (type: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(endpoints[type], {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return;
    const data = await res.json();
    setUsers(data.users || []);
  };

  useEffect(() => {
    fetchUsers(filter);
  }, [filter]);

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-[90%] max-w-2xl text-center">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400">
            👥 Benutzerverwaltung
          </h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 text-gray-200 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">Alle</option>
            <option value="owners">Owners</option>
            <option value="users">Users</option>
            <option value="trainers">Trainers</option>
          </select>
        </div>

        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-sm">
              <th className="px-4">UID</th>
              <th className="px-4">Vorname</th>
              <th className="px-4">Geburtsdatum</th>
              <th className="px-4">E-Mail</th>
              <th className="px-4">Rolle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={i}
                className="bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              >
                <td className="px-4 py-3 text-gray-200 font-bold">{u.uid}</td>
                <td className="px-4 py-3 text-gray-200 font-medium">
                  {u.firstname}
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {u.birthdate ? formatDate(u.birthdate) : "-"}
                </td>
                <td className="px-4 py-3 text-gray-300">{u.email}</td>
                {u.role_id === 1 ? (
                  <td className="px-4 py-3 text-green-400 font-semibold">
                    Admin
                  </td>
                ) : u.role_id === 2 ? (
                  <td className="px-4 py-3 text-yellow-400 font-semibold">
                    Nutzer
                  </td>
                ) : u.role_id === 3 ? (
                  <td className="px-4 py-3 text-red-400 font-semibold">
                    Trainer
                  </td>
                ) : (
                  <td className="px-4 py-3 text-gray-400 font-semibold">-</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
