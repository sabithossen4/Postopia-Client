import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Select from 'react-select'; 
import { AuthContext } from '../context/AuthProvider';
import Loading from './Loading';

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedTags: [],
    upVote: 0,
    downVote: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const [tagsRes, countRes] = await Promise.all([
            axios.get('https://assignment-12-server-sigma-red.vercel.app/tags'),
            axios.get(`https://assignment-12-server-sigma-red.vercel.app/user-post-count/${user.email}`)
          ]);
          
          setTags(tagsRes.data.map(tag => ({ value: tag, label: `#${tag}` })));
          setPostCount(countRes.data.count);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: selectedOptions.map(option => option.value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      Swal.fire('Error', 'You need to login to create a post', 'error');
      return;
    }

    try {
      const post = {
        title: formData.title,
        description: formData.description,
        tags: formData.selectedTags,
        upVote: 0,
        downVote: 0,
        authorName: user.displayName || 'Anonymous',
        authorEmail: user.email,
        authorPhoto: user.photoURL || '',
        createdAt: new Date()
      };

      await axios.post('https://assignment-12-server-sigma-red.vercel.app/posts', post);
      
      Swal.fire(
        'Success!',
        'Your post has been created successfully!',
        'success'
      ).then(() => {
        navigate('/dashboard/my-post');
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to create post', 'error');
    }
  };

  if (loading) {
    return <div className="text-center py-12"><Loading /></div>;
  }

  
  if (!user?.isMember && postCount >= 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">
        <div className="max-w-md w-full bg-white text-black p-8 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Limit Reached</h2>
            <p className="text-gray-600 mb-6">
              You have reached the maximum limit of 5 posts for free users.
              Upgrade to premium membership to post unlimited content.
            </p>
            <button
              onClick={() => navigate('/membership')}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen  px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="border border-white  shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold  mb-6">Create New Post</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Author Info (auto-filled) */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={user?.photoURL || '/default-user.png'}
                  alt="Author"
                  className="w-12 h-12 rounded-full border border-gray-300"
                />
                <div>
                  <p className="text-sm text-gray-500">Author</p>
                  <p className="font-medium">
                    {user?.displayName || 'Anonymous'}
                  </p>
                </div>
              </div>
              <input
                type="hidden"
                name="authorEmail"
                value={user?.email || ''}
              />
            </div>

            {/* Post Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium  mb-2">
                Post Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Post Description */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium  mb-2">
                Post Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            {/* Tags (React-select) */}
            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-medium  mb-2 ">
                Tags (Select at least one)
              </label>
              <Select
                id="tags"
                name="tags"
                options={tags}
                isMulti
                onChange={handleTagChange}
                className="basic-multi-select text-purple-600"
                classNamePrefix="select"
                required
              />
            </div>

            {/* Vote counts (hidden as they are set to 0 by default) */}
            <input type="hidden" name="upVote" value="0" />
            <input type="hidden" name="downVote" value="0" />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>

        {/* Post Count Info */}
        {!user?.isMember && (
          <div className="mt-4 text-sm text-gray-600">
            <p>
              You have created {postCount} out of 5 posts. 
              {postCount >= 4 && (
                <span className="text-yellow-600 font-medium">
                  {' '}You're approaching the limit for free users.
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;