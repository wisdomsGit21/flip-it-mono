import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { logout } from "./features/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token ||
      localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = retry(
  async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      // Instead of trying to refresh, we'll log out the user
      api.dispatch(logout());
    }
    return result;
  },
  { maxRetries: 3 }
);

const customErrorHandler = (error: FetchBaseQueryError) => {
  console.error("API Error:", error);
};

export const api = createApi({
  reducerPath: "api",
  // baseQuery: baseQueryWithRetry,
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQueryWithRetry(args, api, extraOptions);
    if (result.error) {
      customErrorHandler(result.error);
    }
    return result;
  },
  tagTypes: ["User"],
  endpoints: () => ({}),
});
