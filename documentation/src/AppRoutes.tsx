import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import GettingStarted from "./pages/docs/getting-started";
import ErrorResponses from "./pages/docs/error-responses";
import NotFound from "./pages/404";
import { apiRoutes } from "./routes.config";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="docs/getting-started" element={<GettingStarted />} />
        <Route path="docs/error-responses" element={<ErrorResponses />} />

        {apiRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
