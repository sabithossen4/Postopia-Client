import { createBrowserRouter } from "react-router";
import HomeLayout from "./../layout/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import PrivateRoute from "../context/PrivateRoute";
import CreatePost from "../pages/CreatePost";
import PostDetails from "../pages/PostDetails";
import Leaderboard from "../pages/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About></About>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-post",
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        ),
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
  path: '/leaderboard',
  element: <Leaderboard />
},
    ],
  },
]);
