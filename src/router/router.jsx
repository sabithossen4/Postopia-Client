import { createBrowserRouter } from "react-router";
import HomeLayout from "./../layout/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../context/PrivateRoute";
import PostDetails from "../pages/PostDetails";
import Leaderboard from "../pages/Leaderboard";
import AdminDashboard from "../pages/AdminDashboard";
import Membership from "../pages/Membership";
import Dashboard from "../pages/Dashboard";
import MyPosts from "../pages/MyPosts";
import MyProfile from "../pages/MyProfile";
import AddPost from "../pages/AddPost";
import TagFilterPosts from "../components/TagFilterPosts";
import CommentsPage from "../pages/CommentsPage";
import JoinUs from "../layout/JoinUs";
import AdminProfile from "../pages/AdminProfile";
import ManageUsers from "../pages/ManageUsers";
import ReportedComments from "../pages/ReportedComments";
import MakeAnnouncement from "../pages/MakeAnnouncement";

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
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminProfile />,
          },
          {
            path: "/admin/manage-users",
            element: <ManageUsers />,
          },
          {
            path: "/admin/reported-comments",
            element: <ReportedComments />,
          },
          {
            path: "/admin/make-announcement",
            element: <MakeAnnouncement />,
          },
        ],
      },

      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <Membership />
          </PrivateRoute>
        ),
      },
      {
        path: "/tags/:tag",
        element: <TagFilterPosts />,
      },
      {
        path: "/post/:postId/comments",
        element: <PrivateRoute>
          <CommentsPage />
        </PrivateRoute>,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "/dashboard/add-post",
        element: <AddPost />,
      },
      {
        path: "/dashboard/my-post",
        element: <MyPosts />,
      },
    ],
  },
  {
    path: "/joinUs",
    Component: JoinUs,
    children: [
      {
        path: "/joinUs",
        Component: Login,
      },
      {
        path: "/joinUs/register",
        Component: Register,
      },
    ],
  },
]);
