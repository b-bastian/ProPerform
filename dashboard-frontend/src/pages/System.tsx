import { useEffect, useState } from "react";
import { CircleQuestionMark, LoaderCircle, Check } from "lucide-react";

type Health = {
  status: string;
  response_time_ms?: number;
  timestamp?: string;
  database?: string;
  system?: {
    platform?: string;
    arch?: string;
    hostname?: string;
    uptime_s?: number;
    cpu_cores?: number;
    cpu_load?: string;
    memory?: { total_gb?: string; used_percent?: string };
  };
  process?: { pid?: number; memory_mb?: string; uptime_s?: number };
  error?: string;
};

export default function SystemStatus() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setErr(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch("https://api.properform.app/system/healthcheck", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Status ${res.status}: ${txt}`);
      }
      const data = await res.json();
      setHealth(data);
    } catch (e: any) {
      setErr(e.message || "Fehler beim Laden");
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const id = setInterval(fetchHealth, 10000); // alle 10s aktualisieren
    return () => clearInterval(id);
  }, []);

  const percentToBar = (p?: string) =>
    p ? Math.min(100, Math.max(0, Math.round(Number(p)))) : 0;

  return (
    <div className="flex items-center justify-center min-h-screen text-white px-6 py-16">
      <div className="bg-[#1C2541]/70 backdrop-blur-md border border-white/10 p-12 rounded-3xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400">
          System Status
        </h1>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Letzte Abfrage:{" "}
            <span className="text-gray-200">
              {health?.timestamp
                ? new Date(health.timestamp).toLocaleString()
                : "—"}
            </span>
          </div>
          <div className="text-sm">
            <button
              onClick={fetchHealth}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm shadow-sm"
            >
              Jetzt aktualisieren
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2A3558] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-400">API Status</div>

              <div className="text-sm font-semibold">
                {loading ? (
                  <LoaderCircle className="w-5 h-5 text-blue-400 animate-spin" />
                ) : health?.status === "ok" ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : health?.status === "error" ? (
                  <CircleQuestionMark className="w-5 h-5 text-red-400" />
                ) : (
                  <CircleQuestionMark className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            <div className="text-sm text-gray-300 mb-2">
              Antwortzeit:{" "}
              <span className="font-medium">
                {health?.response_time_ms
                  ? `${health.response_time_ms} ms`
                  : "—"}
              </span>
            </div>

            <div className="text-sm text-gray-300">
              DB: <span className="font-medium">{health?.database ?? "—"}</span>
            </div>
          </div>

          <div className="bg-[#2A3558] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-2">Node Prozess</div>
            <div className="text-gray-200">
              PID:{" "}
              <span className="font-medium">{health?.process?.pid ?? "—"}</span>
            </div>
            <div className="text-gray-300">
              Prozess-Speicher:{" "}
              <span className="font-medium">
                {health?.process?.memory_mb ?? "—"} MB
              </span>
            </div>
            <div className="text-gray-300">
              Prozess-Uptime:{" "}
              <span className="font-medium">
                {health?.process?.uptime_s
                  ? `${Math.floor(health.process.uptime_s / 60)} min`
                  : "—"}
              </span>
            </div>
          </div>

          <div className="bg-[#2A3558] rounded-xl p-4">
            <div className="text-sm text-gray-400 mb-2">System</div>
            <div className="text-gray-200">
              Host:{" "}
              <span className="font-medium">
                {health?.system?.hostname ?? "—"}
              </span>
            </div>
            <div className="text-gray-300">
              Platform:{" "}
              <span className="font-medium">
                {health?.system?.platform ?? "—"} {health?.system?.arch ?? ""}
              </span>
            </div>
            <div className="text-gray-300">
              CPU Cores:{" "}
              <span className="font-medium">
                {health?.system?.cpu_cores ?? "—"}
              </span>
            </div>
            <div className="text-gray-300">
              Load:{" "}
              <span className="font-medium">
                {health?.system?.cpu_load ?? "—"}
              </span>
            </div>
          </div>

          <div className="bg-[#2A3558] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-400">Memory</div>
              <div className="text-sm text-gray-300">
                {health?.system?.memory?.used_percent ?? "—"}%
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                style={{
                  width: `${percentToBar(
                    health?.system?.memory?.used_percent
                  )}%`,
                }}
                className="h-3 rounded-full bg-linear-to-r from-blue-500 to-blue-500 transition-all"
              />
            </div>

            <div className="text-sm text-gray-300 mt-3">
              Total:{" "}
              <span className="font-medium">
                {health?.system?.memory?.total_gb ?? "—"} GB
              </span>
            </div>
          </div>
        </div>

        {err && (
          <div className="mt-6 p-3 bg-red-800/30 text-red-200 rounded-xl">
            Fehler: {err}
          </div>
        )}

        {!health && !err && loading && (
          <div className="mt-6 text-center text-gray-400">Lade...</div>
        )}
      </div>
    </div>
  );
}
