import UserLogin from "./pages/api-reference/auth/post-login";
import UserRegister from "./pages/api-reference/auth/post-register";
import AdminLogin from "./pages/api-reference/auth/post-adminLogin";
import AdminRegister from "./pages/api-reference/auth/post-adminRegister";
import TrainerLogin from "./pages/api-reference/auth/post-trainerLogin";
import CheckVerificationCode from "./pages/api-reference/auth/post-check-verify-code";

import GetAllUsers from "./pages/api-reference/users/get-getAllUsers";
import DeleteUser from "./pages/api-reference/users/delete-deleteUser";
import GetMe from "./pages/api-reference/users/get-me";
import PostWeightLog from "./pages/api-reference/users/post-weightLog";
import GetWeightLogs from "./pages/api-reference/users/get-weightLog";

import CreateTrainer from "./pages/api-reference/trainers/post-createTrainer";
import VerifyCode from "./pages/api-reference/trainers/post-verifyCode";
import LinkAthlete from "./pages/api-reference/trainers/post-linkAthlete";
import RegenerateCode from "./pages/api-reference/trainers/patch-regenCode";

export const apiRoutes = [
  { path: "api/auth/login", element: <UserLogin /> },
  { path: "api/auth/register", element: <UserRegister /> },
  { path: "api/auth/admin/login", element: <AdminLogin /> },
  { path: "api/auth/admin/register", element: <AdminRegister /> },
  { path: "api/auth/trainers/login", element: <TrainerLogin /> },
  {
    path: "api/auth/check-verification-code",
    element: <CheckVerificationCode />,
  },

  { path: "api/users", element: <GetAllUsers /> },
  { path: "api/users/deleteUser/:uid", element: <DeleteUser /> },
  { path: "api/users/me", element: <GetMe /> },
  { path: "api/logs/weight", element: <PostWeightLog /> },
  { path: "api/logs/weight/all", element: <GetWeightLogs /> },

  { path: "api/trainers/createTrainer", element: <CreateTrainer /> },
  { path: "api/trainers/verify-code", element: <VerifyCode /> },
  { path: "api/trainers/link-athlete", element: <LinkAthlete /> },
  {
    path: "api/trainers/:id/regenerateCode",
    element: <RegenerateCode />,
  },
];
