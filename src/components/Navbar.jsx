import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
      <li className="font-bold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/membership">Membership</NavLink>
      </li>

      <li className="font-bold">
        {user && <NavLink to="/create-post">Add Post</NavLink>}
      </li>
      <li className="font-bold">
        <NavLink to="/leaderboard" >Leaderboard</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  return (
    <div className="top-0 z-50 w-full shadow-sm bg-base-100">
      <div className="navbar max-w-7xl mx-auto">
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
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            ForumHub
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
              <span className="material-icons">notifications</span>
              <div className="badge badge-sm badge-error absolute -top-1 -right-1">
                2
              </div>
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
                    className="btn btn-sm btn-primary w-full"
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
              <Link to="/register" className="btn btn-sm font-bold">
                Join Us
              </Link>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
