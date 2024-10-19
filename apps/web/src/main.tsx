import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRouter } from "./config/router";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(appRouter());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster richColors position="bottom-right" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
