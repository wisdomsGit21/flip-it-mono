// src/hooks/useAuth.ts
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "@/app/features/authSlice";
import { useGetMeQuery } from "@/app/services/authApi";
import { useTypedSelector } from "@/app/store";

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);
  const isAuthenticated = useTypedSelector(selectIsAuthenticated);
  const {
    data: currentUser,
    isLoading,
    isSuccess,
  } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  return {
    user: currentUser || user,
    isAuthenticated,
    isLoading,
    isSuccess,
  };
};
