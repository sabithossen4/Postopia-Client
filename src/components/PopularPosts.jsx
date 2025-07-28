import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/posts/popular')
      .then(res => setPopularPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="my-10 px-4 md:px-10">
      <h2 className="text-2xl font-bold mb-4 border-l-4 border-green-500 pl-3">🔥 Most Popular Posts</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {popularPosts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
            <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.summary?.slice(0, 80)}...</p>
            <div className="mt-2 text-sm text-gray-400">❤️ {post.totalLiked || 0} Likes</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPosts;
