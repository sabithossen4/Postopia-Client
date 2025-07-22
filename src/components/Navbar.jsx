import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';

const Navbar = () => {
const {user,logOut} = use(AuthContext);

    const handleLogOut =() =>{
    logOut().then(() => {
      toast.error('LogOut Succesfully')
    }).catch((error) => {
      toast.error(error);
    });
  }  


  const links = <>
   <li className='font-bold'><NavLink to ="/">Home</NavLink></li>       
 
  </>
  return (
 <div className=" top-0 z-50 w-full shadow-sm">
      <div className='navbar max-w-11/12 mx-auto  bg-base-100  '>
        <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 p-2 z-50">
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold">CourseHub</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="cursor-pointer tooltip tooltip-bottom" data-tip={user.displayName}>
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={user.photoURL || '/user.png'}
                alt="Profile"
              />
            </div>
            <ul tabIndex={0} className="dropdown-content bg-base-100 text-black rounded-box shadow p-2 w-32">
              <li><button onClick={handleLogOut} className="btn btn-sm btn-error">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/register" className="btn font-bold btn-sm">Register</Link>
            <Link to="/login" className="btn btn-sm font-bold">Login</Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;