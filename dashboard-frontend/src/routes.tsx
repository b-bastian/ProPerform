import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import CreateTrainer from "./pages/CreateTrainer";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateOwner from "./pages/CreateOwner";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-trainer"
        element={
          <ProtectedRoute>
            <CreateTrainer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-owner"
        element={
          <ProtectedRoute>
            <CreateOwner />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
