import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts/recent')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-2xl font-bold mb-6 ">🕒 Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 border border-gray-300  rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold ">{post.title}</h3>
              <p className=" text-sm my-2">{post.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag, i) => (
                  <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Link to={`/post/${post._id}`}>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
