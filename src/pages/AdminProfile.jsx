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
        const res = await fetch('https://assignment-12-server-sigma-red.vercel.app/admin/stats', {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p>Manage your forum statistics and tags</p>
        </div>

        {/* Admin Profile Card */}
        <div className="border border-gray-200 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-white rounded-xl shadow-md p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Posts</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{adminStats?.stats?.totalPosts}</h3>
            </div>
          </div>
          <div className="border border-white rounded-xl shadow-md p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Comments</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{adminStats?.stats?.totalComments}</h3>
            </div>
          </div>
          <div className="border border-white rounded-xl shadow-md p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">{adminStats?.stats?.totalUsers}</h3>
            </div>
          </div>
        </div>

        {/* Tags Management */}
        <div className="border border-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold">Manage Tags</h2>
            <form
              onSubmit={handleSubmit((data) => addTag(data.tagName))}
              className="mt-4 md:mt-0 flex gap-2"
            >
              <input
                type="text"
                {...register('tagName', { required: true })}
                placeholder="Enter new tag"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Tag
              </button>
            </form>
          </div>

          {tags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tags.map((tag) => (
                <div
                  key={tag._id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{tag.name}</span>
                  <button
                    onClick={() => deleteTag(tag._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete tag"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No tags found. Add your first tag!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
