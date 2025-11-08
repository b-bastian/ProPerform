import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GettingStarted from "./pages/docs/getting-started";
import CreateUser from "./pages/api-reference/users/post-createUser";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/docs/getting-started" element={<GettingStarted />} />
      </Routes>
      <Routes>
        <Route path="/api/users/createUser" element={<CreateUser />} />
      </Routes>
    </>
  );
}
