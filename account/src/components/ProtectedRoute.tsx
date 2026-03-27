import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  // Show nothing while checking auth
  if (isAuthorized === null) {
    return null;
  }

  // If authorized, render children
  if (isAuthorized) {
    return <>{children}</>;
  }

  // If not authorized, return null (redirect is handled above)
  return null;
}
