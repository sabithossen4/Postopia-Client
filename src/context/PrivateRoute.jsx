import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import Loading from "../pages/Loading";


const PrivateRoute = ({children}) => {
  const {user,loading} = useContext(AuthContext);  
  
  const location =useLocation();
  
  if(loading){
    return <Loading></Loading>
  }
  if(user && user?.email){
    return children;
  }
  return <Navigate state={location.pathname} to={'/joinUs'}></Navigate>;
  
    
};

export default PrivateRoute;