import { Outlet, Link, useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import Loading from './Loading';

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading && user?.role !== 'admin') {
      Swal.fire('Access Denied', 'You must be an admin to access this page', 'error');
      navigate('/joinUs');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-center py-8"><Loading /></div>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content">
        {/* Page content */}
        <div className="p-4">
          <label htmlFor="admin-drawer" className="btn btn-sm drawer-button lg:hidden mb-4">
            ☰ Menu
          </label>
          <Outlet />
        </div>
      </div>
      
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="mb-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </li>
          <li>
            <Link to="/admin">Admin Profile</Link>
          </li>
          <li>
            <Link to="/admin/manage-users">Manage Users</Link>
          </li>
          <li>
            <Link to="/admin/reported-comments">Reported Comments</Link>
          </li>
          <li>
            <Link to="/admin/make-announcement">Make Announcement</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;