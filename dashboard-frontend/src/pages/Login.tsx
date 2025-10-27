import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("https://api.properform.app/users/adminLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      alert(data.error || "Login fehlgeschlagen");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#101828] text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg p-14 rounded-3xl shadow-2xl w-full max-w-xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400 tracking-wide">
          🔐 Anmeldung
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-7">
          <div>
            <label className="block text-sm mb-2 text-gray-300 tracking-wide">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400"
              placeholder="z. B. bruggi44@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300 tracking-wide">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 text-lg rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-blue-700/30"
          >
            Einloggen
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Nur für autorisierte Benutzer. Daten werden vertraulich behandelt.
        </p>
      </div>
    </div>
  );
}
