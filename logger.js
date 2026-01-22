import fs from "fs";
import path from "path";

const env = process.env.NODE_ENV || "development";

const logsDir = path.join(process.cwd(), "logs");
const logFile =
  env === "production"
    ? path.join(logsDir, "requests.prod.log")
    : path.join(logsDir, "requests.dev.log");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function formatFileLog(method, url, status, duration, ip) {
  const timestamp = new Date().toISOString();

  return [
    `TIMESTAMP: ${timestamp}`,
    `METHOD: ${method}`,
    `URL: ${url}`,
    `STATUS: ${status}`,
    `DURATION: ${duration}ms`,
    `IP: ${ip}`,
  ].join(" | ");
}

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;

    const logLine = formatFileLog(method, url, status, duration, ip);
    fs.appendFile(logFile, logLine + "\n", (err) => {
      if (err) console.error("Logging Error:", err);
    });
  });

  next();
}
