import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://assignment-12-server-sigma-red.vercel.app/users/admin/${user.email}`)
        .then(res => {
          setIsAdmin(res.data.admin);
          setAdminLoading(false); 
        })
        .catch(() => setAdminLoading(false));
    }
  }, [user]);
  return [isAdmin, adminLoading];
};
export default useAdmin;
