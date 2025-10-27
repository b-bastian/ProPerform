export default function Users() {
  const users = [
    { name: "Bastian Brugger", role: "Admin" },
    { name: "Ljubomir Stanic", role: "Editor" },
    { name: "Can Kayac", role: "Viewer" },
  ];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-[90%] max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">
          👥 Benutzerverwaltung
        </h1>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-400 uppercase text-sm">
              <th className="px-4">Name</th>
              <th className="px-4">Rolle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={i}
                className="bg-gray-700 hover:bg-gray-600 transition rounded-lg"
              >
                <td className="px-4 py-3 text-gray-200 font-medium">
                  {u.name}
                </td>
                <td className="px-4 py-3 text-gray-300">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
