import Signin from "@/domain/auth/signin";
import Signup from "@/domain/auth/signup";
import Contact from "@/domain/contact";
import Features from "@/domain/features";
import Home from "@/domain/home";
import Pricing from "@/domain/pricing/omdex";
import Studio from "@/domain/studio";
import FlipbookView from "@/domain/viewer";
import AuthLayout from "@/layouts/auth-layout";
import BaseLayout from "@/layouts/base-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import { RouteObject } from "react-router-dom";

export function appRouter(): RouteObject[] {
  return [
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/features",
          element: <Features />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        // {
        //   path: "shared/:token",
        //   element: <div><hello</>,
        // },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/signin",
          element: <Signin />,
        },
        {
          path: "/auth/signup",
          element: <Signup />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "studio",
          element: <Studio />,
        },
        {
          path: "flipbook/:id",
          element: <FlipbookView />,
        },
      ],
    },
  ];
}
