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
import PostCreateExercise from "./pages/api-reference/admin/post-exerciseCreate";
import DeleteExercise from "./pages/api-reference/admin/delete-exercises-eid";
import GetExerciseById from "./pages/api-reference/admin/get-exercises-eid";
import GetExercises from "./pages/api-reference/admin/get-exercises";
import UpdateExercise from "./pages/api-reference/admin/put-exercises-eid";
import DeleteMedia from "./pages/api-reference/media/delete-media-mid";
import GetAllMedia from "./pages/api-reference/media/get-media-all";
import UploadMedia from "./pages/api-reference/media/post-media-upload";
import UpdateMedia from "./pages/api-reference/media/put-media-mid";
import ResendVerificationCode from "./pages/api-reference/auth/post-resend-verify";
import ResetPassword from "./pages/api-reference/auth/post-reset-password";
import ResetPasswordToken from "./pages/api-reference/auth/post-reset-password-token";
import RequestBodys from "./pages/docs/request-bodys";
import TestUsers from "./pages/docs/test-users";

export const apiRoutes = [
  // docs
  { path: "docs/request-bodys", element: <RequestBodys /> },
  { path: "docs/test-users", element: <TestUsers /> },

  // auth routes
  { path: "api/auth/login", element: <UserLogin /> },
  { path: "api/auth/register", element: <UserRegister /> },
  { path: "api/auth/admin/login", element: <AdminLogin /> },
  { path: "api/auth/admin/register", element: <AdminRegister /> },
  { path: "api/auth/trainers/login", element: <TrainerLogin /> },
  {
    path: "api/auth/check-verification-code",
    element: <CheckVerificationCode />,
  },
  {
    path: "api/auth/resend-verification-code",
    element: <ResendVerificationCode />,
  },
  { path: "api/auth/reset-password", element: <ResetPassword /> },
  { path: "api/auth/reset-password/:token", element: <ResetPasswordToken /> },

  // user routes
  { path: "api/users", element: <GetAllUsers /> },
  { path: "api/users/deleteUser/:uid", element: <DeleteUser /> },
  { path: "api/users/me", element: <GetMe /> },
  { path: "api/logs/weight", element: <PostWeightLog /> },
  { path: "api/logs/weight/all", element: <GetWeightLogs /> },

  // trainer routes
  { path: "api/trainers/createTrainer", element: <CreateTrainer /> },
  { path: "api/trainers/verify-code", element: <VerifyCode /> },
  { path: "api/trainers/link-athlete", element: <LinkAthlete /> },
  {
    path: "api/trainers/:id/regenerateCode",
    element: <RegenerateCode />,
  },

  // exercise routes
  { path: "api/admin/exercises/create", element: <PostCreateExercise /> },
  { path: "api/admin/exercises/getExercise", element: <GetExerciseById /> },
  { path: "api/admin/exercises/updateExercise", element: <UpdateExercise /> },
  { path: "api/admin/exercises/deleteExercise", element: <DeleteExercise /> },
  { path: "api/admin/exercises/listExercises", element: <GetExercises /> },

  // media routes
  { path: "api/media/deleteMedia", element: <DeleteMedia /> },
  { path: "api/media/getAllMedia", element: <GetAllMedia /> },
  { path: "api/media/uploadMedia", element: <UploadMedia /> },
  { path: "api/media/updatedMedia", element: <UpdateMedia /> },
];
