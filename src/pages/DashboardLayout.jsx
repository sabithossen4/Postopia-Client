import { Link, Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4 max-h-80">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/dashboard" className="hover:text-yellow-400">My Profile</Link>
        <Link to="/dashboard/add-post" className="hover:text-yellow-400">Add Post</Link>  
        <Link to="/dashboard/my-post" className="hover:text-yellow-400">My Posts</Link>
              
      </div>

      {/* Main Content */}
      <div className="flex-1  p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
