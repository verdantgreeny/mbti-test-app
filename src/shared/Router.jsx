import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import TestPage from "../pages/TestPage";
import TestResultPage from "../pages/TestResultPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "./Layout";
import { ROUTES } from "../constants/routes";

const Router = () => {
  const { HOME, LOGIN, SIGNUP, PROFILE, TEST_PAGE, TEST_RESULT_PAGE } = ROUTES;
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: HOME, element: <Home /> },
        {
          path: LOGIN,
          element: <ProtectedRoutes element={<Login />} isLogin={true} />,
        },
        {
          path: SIGNUP,
          element: <ProtectedRoutes element={<Signup />} isLogin={true} />,
        },
        {
          path: PROFILE,
          element: <ProtectedRoutes element={<Profile />} isLogin={false} />,
        },
        {
          path: TEST_PAGE,
          element: <ProtectedRoutes element={<TestPage />} isLogin={false} />,
        },
        {
          path: TEST_RESULT_PAGE,
          element: (
            <ProtectedRoutes element={<TestResultPage />} isLogin={false} />
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
