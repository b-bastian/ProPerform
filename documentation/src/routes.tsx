import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GettingStarted from "./pages/docs/getting-started";
import CreateUser from "./pages/api-reference/users/post-createUser";
import GetAll from "./pages/api-reference/users/get-getAllUsers";
import DeleteUser from "./pages/api-reference/users/delete-deleteUser";
import AdminLogin from "./pages/api-reference/users/post-adminLogin";
import CreateTrainer from "./pages/api-reference/trainers/post-createTrainer";
import VerifyCode from "./pages/api-reference/trainers/post-verifyCode";
import LinkAthlete from "./pages/api-reference/trainers/post-linkAthlete";
import RegenerateCode from "./pages/api-reference/trainers/patch-regenCode";

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
      <Routes>
        <Route path="/api/users/get" element={<GetAll />} />
      </Routes>
      <Routes>
        <Route path="/api/users/deleteUser" element={<DeleteUser />} />
      </Routes>
      <Routes>
        <Route path="/api/users/adminLogin" element={<AdminLogin />} />
      </Routes>
      <Routes>
        <Route path="/api/trainers/createTrainer" element={<CreateTrainer />} />
      </Routes>
      <Routes>
        <Route path="/api/trainers/verifyCode" element={<VerifyCode />} />
      </Routes>
      <Routes>
        <Route path="/api/trainers/linkAthlete" element={<LinkAthlete />} />
      </Routes>
      <Routes>
        <Route
          path="/api/trainers/regenerateCode"
          element={<RegenerateCode />}
        />
      </Routes>
    </>
  );
}
