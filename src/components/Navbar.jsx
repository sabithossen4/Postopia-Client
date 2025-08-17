import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import NotificationBell from "./NotificationBell";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
   const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li className="font-bold text-[15px]">
        <NavLink to="/">Home</NavLink>
      </li>

      {user &&(
          <li className="font-bold text-[15px]">
        <NavLink to="/membership">Membership</NavLink>
      </li>             
      )}
      {user &&( 
        <li className="font-bold text-[15px]">
        <NavLink to="/leaderboard" >Leaderboard</NavLink>
      </li> 
      )}
               
      {user && isAdmin && (
  <li className="font-bold text-[15px]"><NavLink to="/admin">AdminDashboard</NavLink></li>
  
)}
    <li className="font-bold text-[15px]">
        <NavLink to="/about">About</NavLink>
      </li>
  <li className="font-bold text-[15px]">
        <NavLink to="/contact">Contact</NavLink>
      </li>

    
    </>
  );

  return (
    <div className=" shadow-sm bg-base-100 fixed top-0 left-0 w-full z-50">
      <div className="navbar w-11/12 mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="btn text-purple-600 btn-ghost text-4xl font-bold">
            Postopia
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-4 items-center">
          {/* Notification Icon */}
          <div
            className="relative tooltip tooltip-bottom mr-2"
            data-tip="Notifications"
          >
            <button className="btn btn-ghost btn-circle">
              <span className=""><NotificationBell /></span>   
            </button>
          </div>

          {/* User Section */}
          {user ? (
            <div className="dropdown dropdown-end ml-2">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={user.photoURL || "/user.png"}
                  alt="Profile"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-100 text-black rounded-box shadow p-2 w-44 space-y-1"
              >
                <li>
                  <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                    {user.displayName}
                  </span>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="btn btn-sm btn-primary w-full "
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-error w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Link to="/joinUs" className="btn btn-sm font-bold">
                Join Us
              </Link>              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
