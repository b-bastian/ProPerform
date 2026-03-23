import type { ReactNode } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

interface RouteConfig {
  path: string;
  element: ReactNode;
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
];

export default routes;
