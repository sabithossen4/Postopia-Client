
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['adminUsers', currentPage, searchTerm],
    queryFn: async () => {
      const response = await axios.get(`/admin/users?page=${currentPage}&search=${searchTerm}`);
      return response.data;
    }
  });

  const makeAdminMutation = useMutation({
    mutationFn: (userId) => axios.patch(`/admin/users/make-admin/${userId}`),
    onSuccess: () => {
      Swal.fire('Success', 'User role updated to admin', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update user role', 'error');
    }
  });

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will become an admin',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, make admin'
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId);
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Membership</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.photoURL || '/default-avatar.png'} alt="User" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-success' : 'badge-info'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.isMember ? 'badge-warning' : 'badge-neutral'}`}>
                    {user.isMember ? 'Premium' : 'Basic'}
                  </span>
                </td>
                <td>
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                      disabled={makeAdminMutation.isLoading}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">Page {currentPage}</button>
          <button
            className="join-item btn"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * 10 >= data?.totalUsers}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;