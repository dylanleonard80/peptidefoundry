import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";

export const useAdminGuard = () => {
  const { isAdmin, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAdmin, loading, navigate]);

  return { isAdmin, loading };
};
