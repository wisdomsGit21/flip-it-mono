import { setCredentials } from "@/app/features/authSlice";
import { useAppDispatch } from "@/app/store";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const { isAuthenticated, isLoading, isSuccess, user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");
    if (storedUser && token && !isAuthenticated) {
      dispatch(setCredentials({ user: JSON.parse(storedUser), token }));
    } else if (isAuthenticated && isSuccess && user) {
      dispatch(setCredentials({ user, token: token || "" }));
    }
  }, [isAuthenticated, isSuccess, user, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
