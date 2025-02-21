import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import TestResultPage from "../pages/TestResultPage";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Layout from "./Layout";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        // { path: "/log-in", element: <PublicRoutes element={<Login />} /> },
        // { path: "/profile", element: <ProtectedRoutes element={<Profile />} /> },
        // { path: "/test-page", element: <ProtectedRoutes element={<TestPage />} /> },
        // {
        //   path: "/test-result-page",
        //   element: <ProtectedRoutes element={<TestResultPage />} />,
        // },

        //임시
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <Profile /> },
        { path: "/test-page", element: <TestPage /> },
        { path: "/test-result-page", element: <TestResultPage /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
