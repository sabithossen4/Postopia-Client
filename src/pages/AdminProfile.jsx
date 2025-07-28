import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AdminProfile = () => {
  const [adminStats, setAdminStats] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  // Fetch admin stats
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await fetch('/admin/stats', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        const data = await res.json();
        setAdminStats(data.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/admin/tags', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        const data = await res.json();
        setTags(data.tags || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  // Add new tag
  const addTag = async (tagName) => {
    try {
      const res = await fetch('/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('access-token')}`,
        },
        body: JSON.stringify({ name: tagName }),
      });
      const data = await res.json();
      
      if (data.success) {
        setTags([...tags, data.tag]);
        reset();
        alert('Tag added successfully');
      }
    } catch (error) {
      console.error('Error adding tag:', error);
      alert('Failed to add tag');
    }
  };

  // Delete tag
  const deleteTag = async (tagId) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        const res = await fetch(`/admin/tags/${tagId}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        });
        const data = await res.json();
        
        if (data.success) {
          setTags(tags.filter(tag => tag._id !== tagId));
          alert('Tag deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting tag:', error);
        alert('Failed to delete tag');
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold ">Admin Dashboard</h1>
          <p className="">Manage your forum statistics and tags</p>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-white  rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src={adminStats?.admin?.photoURL || '/default-avatar.png'} 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{adminStats?.admin?.name}</h2>
                <p className="text-gray-600">{adminStats?.admin?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {adminStats?.admin?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Posts Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Posts</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{adminStats?.stats?.totalPosts}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Comments</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{adminStats?.stats?.totalComments}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-800 mt-2">{adminStats?.stats?.totalUsers}</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Visualization */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics Overview</h2>
          
          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end space-x-2 mt-8">
            <div className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                style={{ height: `${(adminStats?.stats?.totalPosts / Math.max(
                  adminStats?.stats?.totalPosts || 1, 
                  adminStats?.stats?.totalComments || 1, 
                  adminStats?.stats?.totalUsers || 1
                )) * 100}%` }}
              ></div>
              <span className="mt-2 text-sm text-gray-600">Posts</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-green-500 rounded-t-lg transition-all duration-500"
                style={{ height: `${(adminStats?.stats?.totalComments / Math.max(
                  adminStats?.stats?.totalPosts || 1, 
                  adminStats?.stats?.totalComments || 1, 
                  adminStats?.stats?.totalUsers || 1
                )) * 100}%` }}
              ></div>
              <span className="mt-2 text-sm text-gray-600">Comments</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-purple-500 rounded-t-lg transition-all duration-500"
                style={{ height: `${(adminStats?.stats?.totalUsers / Math.max(
                  adminStats?.stats?.totalPosts || 1, 
                  adminStats?.stats?.totalComments || 1, 
                  adminStats?.stats?.totalUsers || 1
                )) * 100}%` }}
              ></div>
              <span className="mt-2 text-sm text-gray-600">Users</span>
            </div>
          </div>
        </div>

        {/* Tags Management */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Manage Tags</h2>
            
            {/* Add Tag Form */}
            <form onSubmit={handleSubmit((data) => addTag(data.tagName))} className="mt-4 md:mt-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  {...register('tagName', { required: true })}
                  placeholder="Enter new tag"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Tag
                </button>
              </div>
            </form>
          </div>

          {/* Tags List */}
          {tags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tags.map((tag) => (
                <div key={tag._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-800">{tag.name}</span>
                  <button
                    onClick={() => deleteTag(tag._id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    title="Delete tag"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-gray-600">No tags found. Add your first tag!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;