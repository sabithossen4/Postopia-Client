import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    postCount: 0,
    totalUpvotes: 0,
    totalDownvotes: 0
  });

  // ইউজারের ডাটা এবং রিসেন্ট পোস্ট লোড করুন
  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        try {
          const [postsRes, statsRes] = await Promise.all([
            axios.get(`https://assignment-12-server-sigma-red.vercel.app/my-posts/${user.email}`),
            axios.get(`https://assignment-12-server-sigma-red.vercel.app/user-profile/${user.email}`)
          ]);

          setRecentPosts(postsRes.data.slice(0, 3)); // সর্বশেষ ৩টি পোস্ট
          setStats({
            postCount: statsRes.data.recentPosts.length,
            totalUpvotes: postsRes.data.reduce((sum, post) => sum + (post.upVote || 0), 0),
            totalDownvotes: postsRes.data.reduce((sum, post) => sum + (post.downVote || 0), 0)
          });
        } catch (error) {
          console.error('Error fetching profile data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Section */}
        <div className="bg-white  shadow-md rounded-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex flex-col items-center">
              <img
                src={user?.photoURL || '/default-user.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
              <button className="mt-4 text-sm text-blue-600 hover:text-blue-900 hover:font-extrabold">
                Change Photo
              </button>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {user?.displayName || 'User'}
              </h1>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              
              {/* Badges Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Badges</h2>
                <div className="flex flex-wrap gap-3">
                  {/* Bronze Badge - সব ইউজার পাবে */}
                  <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                    <span className="mr-2">🥉</span>
                    <span>Bronze Member</span>
                  </div>
                  
                  {/* Gold Badge - শুধু মেম্বাররা পাবে */}
                  {user?.isMember && (
                    <div className="flex items-center bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full">
                      <span className="mr-2">🥇</span>
                      <span>Gold Member</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 text-black p-3 rounded-lg text-center">
                  <p className="text-sm text-blue-600">Total Posts</p>
                  <p className="text-2xl font-bold">{stats.postCount}</p>
                </div>
                <div className="bg-green-50 text-black p-3 rounded-lg text-center">
                  <p className="text-sm text-green-600">Total Upvotes</p>
                  <p className="text-2xl font-bold">{stats.totalUpvotes}</p>
                </div>
                <div className="bg-red-50 text-black p-3 rounded-lg text-center">
                  <p className="text-sm text-red-600">Total Downvotes</p>
                  <p className="text-2xl font-bold">{stats.totalDownvotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="bg-white text-black shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Posts</h2>
            <Link
              to="/dashboard/my-post"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View My Posts
            </Link>
          </div>
          
          {recentPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
              <Link
                to="/dashboard/add-post"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPosts.map(post => (
                <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">
                        <Link to={`/post/${post._id}`} className="hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1 mb-2">
                        {post.tags?.map(tag => (
                          <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-green-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        {post.upVote || 0}
                      </span>
                      <span className="flex items-center text-red-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {post.downVote || 0}
                      </span>
                    </div>
                    <Link 
                      to={`/post/${post._id}#comments`}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      {post.commentCount || 0} Comments
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;