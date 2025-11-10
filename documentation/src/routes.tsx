import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GettingStarted from "./pages/docs/getting-started";
import CreateUser from "./pages/api-reference/users/post-createUser";
import GetAll from "./pages/api-reference/users/get-getAll";
import GetAllOwners from "./pages/api-reference/users/get-getAllOwners";
import GetAllTrainers from "./pages/api-reference/users/get-getAllTrainers";
import GetNumberOfUsers from "./pages/api-reference/users/get-getNumberOfUsers";
import GetNumberOfTrainers from "./pages/api-reference/users/get-getNumberOfTrainers";
import DeleteUser from "./pages/api-reference/users/delete-deleteUser";
import AdminLogin from "./pages/api-reference/users/post-adminLogin";
import CreateTrainer from "./pages/api-reference/trainers/post-createTrainer";
import VerifyCode from "./pages/api-reference/trainers/post-verifyCode";

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
        <Route path="/api/users/getAll" element={<GetAll />} />
      </Routes>
      <Routes>
        <Route path="/api/users/getAllOwners" element={<GetAllOwners />} />
      </Routes>
      <Routes>
        <Route path="/api/users/getAllTrainers" element={<GetAllTrainers />} />
      </Routes>
      <Routes>
        <Route
          path="/api/users/getNumberOfUsers"
          element={<GetNumberOfUsers />}
        />
      </Routes>
      <Routes>
        <Route
          path="/api/users/getNumberOfTrainers"
          element={<GetNumberOfTrainers />}
        />
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
    </>
  );
}
