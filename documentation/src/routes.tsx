import { Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import GettingStarted from "./pages/docs/getting-started";
import NotFound from "./pages/404";

// Auth
import UserLogin from "./pages/api-reference/auth/post-login";
import UserRegister from "./pages/api-reference/auth/post-createUser";
import AdminLogin from "./pages/api-reference/auth/post-adminLogin";
import AdminRegister from "./pages/api-reference/auth/post-adminRegister";

// Users
import GetAllUsers from "./pages/api-reference/users/get-getAllUsers";
import DeleteUser from "./pages/api-reference/users/delete-deleteUser";

// Trainers
import CreateTrainer from "./pages/api-reference/trainers/post-createTrainer";
import VerifyCode from "./pages/api-reference/trainers/post-verifyCode";
import LinkAthlete from "./pages/api-reference/trainers/post-linkAthlete";
import RegenerateCode from "./pages/api-reference/trainers/patch-regenCode";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="docs/getting-started" element={<GettingStarted />} />

        <Route path="api/auth/login" element={<UserLogin />} />
        <Route path="api/auth/register" element={<UserRegister />} />
        <Route path="api/auth/admin/login" element={<AdminLogin />} />
        <Route path="api/auth/admin/register" element={<AdminRegister />} />

        <Route path="api/users" element={<GetAllUsers />} />
        <Route path="api/users/deleteUser/:uid" element={<DeleteUser />} />

        <Route path="api/trainers/createTrainer" element={<CreateTrainer />} />
        <Route path="api/trainers/verify-code" element={<VerifyCode />} />
        <Route path="api/trainers/link-athlete" element={<LinkAthlete />} />
        <Route
          path="api/trainers/:id/regenerateCode"
          element={<RegenerateCode />}
        />

        {/* ✅ 404 – JETZT FUNKTIONIERT ES */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
