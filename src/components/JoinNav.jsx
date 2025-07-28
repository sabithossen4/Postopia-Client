import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import NotificationBell from "./NotificationBell";

const JoinNav = () => {
  const { user, } = useContext(AuthContext);  

  

  return (
    <div className="top-0 z-50 w-full shadow-sm bg-base-100">
      <div className="navbar max-w-7xl mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Postopia
          </Link>
        </div>       

        {/* Navbar End */}
        <div className="navbar-end gap-4 items-center">
          {/* User Section */}
         
            
                       <div className="flex gap-2 items-center">
              <Link to="/joinUs" className="btn btn-sm font-bold">
                Login
              </Link>              
              <Link to="/joinUs/register" className="btn btn-sm font-bold">
                Register
              </Link>             
                           
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default JoinNav;
