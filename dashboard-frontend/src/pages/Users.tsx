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
