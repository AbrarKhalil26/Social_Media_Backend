import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/notFound/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import PostDetails from "../pages/postDetails/PostDetails";
import { lazy, Suspense } from "react";
import AuthLayout from "../layouts/AuthLayout";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import UserProfile from "../pages/user/UserProfile";

const Posts = lazy(() => import("../pages/posts/Posts"));
const Profile = lazy(() => import("../pages/auth/Profile"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Posts />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <UserProfile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts/details/:id",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: (
          <ProtectedAuthRoutes>
            <Login />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <ProtectedAuthRoutes>
            <Register />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/auth/verify-email",
        element: (
          <ProtectedAuthRoutes>
            <VerifyEmail />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/auth/reset-password",
        element: (
          <ProtectedAuthRoutes>
            <ResetPassword />
          </ProtectedAuthRoutes>
        ),
      },
      {
        path: "/auth/forget-password",
        element: (
          <ProtectedAuthRoutes>
            <ForgetPassword />
          </ProtectedAuthRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
