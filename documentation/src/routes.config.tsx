// admin
import GetExercisesEid from "./pages/api-reference/admin/get-exercise-eid";
import DeleteExercisesEid from "./pages/api-reference/admin/delete-exercise-eid";
import PostExercisesCreate from "./pages/api-reference/admin/post-exercise-create";
import PutExercisesEid from "./pages/api-reference/admin/put-exercise-eid";

// auth
import PostAdminLogin from "./pages/api-reference/auth/post-admin-login";
import PostAdminRegister from "./pages/api-reference/auth/post-admin-register";
import PostCheckVerificationCode from "./pages/api-reference/auth/post-check-verification-code";
import PostLogin from "./pages/api-reference/auth/post-login";
import PostRegister from "./pages/api-reference/auth/post-register";
import PostResendVerificationCode from "./pages/api-reference/auth/post-resend-verification-code";
import PostResetPassword from "./pages/api-reference/auth/post-reset-password";
import PostResetPasswordToken from "./pages/api-reference/auth/post-reset-password-token";

// exercises
import GetExercises from "./pages/api-reference/exercises/get-exercises";

// media
import DeleteMediaMid from "./pages/api-reference/media/delete-media-mid";
import GetMedia from "./pages/api-reference/media/get-media";
import PostMedia from "./pages/api-reference/media/post-create-media";
import PutMediaMid from "./pages/api-reference/media/put-media-mid";

// system
import GetHealth from "./pages/api-reference/system/get-health";
import GetHealthcheck from "./pages/api-reference/system/get-healthcheck";

// trainers
import DeleteTrainersTid from "./pages/api-reference/trainers/delete-trainer-tid";
import PatchTrainersRegenerateCode from "./pages/api-reference/trainers/patch-trainers-regen-code";
import PostTrainers from "./pages/api-reference/trainers/post-create-trainer";
import PostTrainersLinkAthlete from "./pages/api-reference/trainers/post-trainer-link-athlete";
import PostTrainersVerifyCode from "./pages/api-reference/trainers/post-trainer-verify-code";

// users
import DeleteUsersUid from "./pages/api-reference/users/delete-users-uid";
import GetUsersMe from "./pages/api-reference/users/get-users-me";
import GetUsers from "./pages/api-reference/users/get-users";
import GetUsersRole from "./pages/api-reference/users/get-users-role";
import GetUsersStats from "./pages/api-reference/users/get-users-stats";

// weight
import GetLogsWeight from "./pages/api-reference/weight/get-logs-weight";
import PostLogsWeight from "./pages/api-reference/weight/post-logs-weight";

import RequestBodys from "./pages/docs/request-bodys";
import TestUsers from "./pages/docs/test-users";

export const apiRoutes = [
  // docs
  { path: "docs/request-bodys", element: <RequestBodys /> },
  { path: "docs/test-users", element: <TestUsers /> },

  // auth routes
  { path: "api/auth/login", element: <PostLogin /> },
  { path: "api/auth/register", element: <PostRegister /> },
  { path: "api/auth/admin/login", element: <PostAdminLogin /> },
  { path: "api/auth/admin/register", element: <PostAdminRegister /> },
  {
    path: "api/auth/check-verification-code",
    element: <PostCheckVerificationCode />,
  },
  {
    path: "api/auth/resend-verification-code",
    element: <PostResendVerificationCode />,
  },
  { path: "api/auth/reset-password", element: <PostResetPassword /> },
  {
    path: "api/auth/reset-password/:token",
    element: <PostResetPasswordToken />,
  },

  // user routes
  { path: "api/users", element: <GetUsers /> },
  { path: "api/users/:role", element: <GetUsersRole /> },
  { path: "api/users/me", element: <GetUsersMe /> },
  { path: "api/users/stats", element: <GetUsersStats /> },
  { path: "api/users/delete/:uid", element: <DeleteUsersUid /> },

  // weight logs
  { path: "api/logs/weight", element: <PostLogsWeight /> },
  { path: "api/logs/weight/all", element: <GetLogsWeight /> },

  // trainer routes
  { path: "api/trainers", element: <PostTrainers /> },
  { path: "api/trainers/:tid", element: <DeleteTrainersTid /> },
  {
    path: "api/trainers/:tid/link-athlete",
    element: <PostTrainersLinkAthlete />,
  },
  {
    path: "api/trainers/:tid/regenerate-code",
    element: <PatchTrainersRegenerateCode />,
  },
  { path: "api/trainers/verify-code", element: <PostTrainersVerifyCode /> },

  // exercise routes
  { path: "api/exercises", element: <GetExercises /> },
  { path: "api/admin/exercises/create", element: <PostExercisesCreate /> },
  { path: "api/admin/exercises/:eid", element: <GetExercisesEid /> },
  { path: "api/admin/exercises/:eid/delete", element: <DeleteExercisesEid /> },
  { path: "api/admin/exercises/:eid/update", element: <PutExercisesEid /> },

  // media routes
  { path: "api/media", element: <PostMedia /> },
  { path: "api/media/list", element: <GetMedia /> },
  { path: "api/media/:mid", element: <DeleteMediaMid /> },
  { path: "api/media/:mid/update", element: <PutMediaMid /> },

  // system routes
  { path: "api/system/health", element: <GetHealth /> },
  { path: "api/system/healthcheck", element: <GetHealthcheck /> },
];
