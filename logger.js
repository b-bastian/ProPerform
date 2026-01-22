import fs from "fs";
import path from "path";

const env = process.env.NODE_ENV || "development";

const logFile =
  env === "production"
    ? path.join(process.cwd(), "logs", "requests.prod.log")
    : path.join(process.cwd(), "logs", "requests.dev.log");

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    const logLine = [
      new Date().toISOString(),
      req.method,
      req.originalUrl,
      res.statusCode,
      `${duration}ms`,
      req.ip,
    ].join(" | ");

    fs.appendFile(logFile, logLine + "\n", (err) => {
      if (err) console.error("Logging error: ", err);
    });
  });

  next();
}
