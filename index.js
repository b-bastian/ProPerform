import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import { mountRoutes, routeMounts } from "./routes/index.js";
import {
  box,
  COLORS,
  methodLabel,
  printBootSequence,
  printRoutesHeader,
} from "./helpers/terminalStyle.js";

import { requestLogger } from "./logger.js";

dotenv.config();

const routeMap = new Map();

function getRoutesFromMounts(mounts) {
  const routes = [];

  mounts.forEach(({ router, path: basePath, protected: isProtected }) => {
    const endpoints = listEndpoints(router);

    endpoints.forEach((endpoint) => {
      const fullPath = basePath + (endpoint.path === "/" ? "" : endpoint.path);
      endpoint.methods.forEach((method) => {
        routes.push({
          method: method.toUpperCase(),
          path: fullPath,
          protected: isProtected,
        });
      });
    });
  });

  return routes;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

const allowedOrigins = [
  "http://localhost:5173",
  "https://dashboard.properform.app",
  "https://docs.properform.app",
  "https://account.properform.app",
  "https://properform.app",
  "https://www.properform.app",
  "http://localhost:8081",
  "http://localhost:8080",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());

app.use(requestLogger);

mountRoutes(app);

app.get("/", (req, res) => {
  res.json({
    status: "API online",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  const methods = routeMap.get(req.path);

  if (methods) {
    return res.status(405).json({
      error: "Method not allowed",
      message: `Diese Route existiert, aber nicht mit ${req.method}`,
      allowedMethods: Array.from(methods),
      hint: `Vielleicht meintest du ${Array.from(methods).join(" oder ")}`,
    });
  }

  res.status(404).json({
    error: "Route not found",
    message: `No API Route matches ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  if (err.message === "File already exists") {
    return res.status(409).json({
      message: "File already exists",
    });
  }

  if (err.message === "Unsupported file type") {
    return res.status(400).json({
      message: "Unsupported file type",
    });
  }

  console.error(err);

  res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.clear();

  box([
    `${COLORS.green}ProPerform API${COLORS.white}`,
    "",
    `Version:      1.0.0`,
    `Environment:  ${process.env.NODE_ENV || "development"}`,
  ]);

  printBootSequence();

  console.log(`${COLORS.yellow}✨ Server started ✨${COLORS.reset}\n`);

  box([
    `${COLORS.green}ProPerform API is ONLINE${COLORS.white}`,
    "",
    `Local:   http://localhost:${PORT}`,
    `Network: http://0.0.0.0:${PORT}`,
    `Started: ${new Date().toLocaleString("de-AT")}`,
    "",
    "Ready to handle requests",
  ]);

  printRoutesHeader();

  const allRoutes = getRoutesFromMounts(routeMounts);

  allRoutes.sort((a, b) => {
    if (a.path !== b.path) return a.path.localeCompare(b.path);
    return a.method.localeCompare(b.method);
  });

  const uniqueRoutes = [];
  const seen = new Set();
  allRoutes.forEach((route) => {
    const key = `${route.method}:${route.path}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueRoutes.push(route);
    }
  });

  const publicRoutes = uniqueRoutes.filter((r) => !r.protected);
  const protectedRoutes = uniqueRoutes.filter((r) => r.protected);

  uniqueRoutes.forEach(({ method, path }) => {
    if (!routeMap.has(path)) {
      routeMap.set(path, new Set());
    }
    routeMap.get(path).add(method);
  });

  if (publicRoutes.length > 0) {
    console.log(`${COLORS.green}🔓 PUBLIC ROUTES:${COLORS.reset}`);
    publicRoutes.forEach((route) => {
      console.log(`  ${methodLabel(route.method)} ${route.path}`);
    });
    console.log();
  }

  if (protectedRoutes.length > 0) {
    console.log(
      `${COLORS.magenta}🔐 PROTECTED ROUTES (require auth):${COLORS.reset}`,
    );
    protectedRoutes.forEach((route) => {
      console.log(`  ${methodLabel(route.method)} ${route.path}`);
    });
    console.log();
  }

  console.log(
    `${COLORS.gray}Total: ${uniqueRoutes.length} routes registered${COLORS.reset}\n`,
  );
});
