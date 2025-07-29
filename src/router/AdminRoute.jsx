import { Navigate } from "react-router";


import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Loading from "../pages/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, adminLoading] = useAdmin();

  if (loading || adminLoading) {
    return <div className="text-center"><Loading /></div>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;
