import  { useEffect, useState } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5; // posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://assignment-12-server-sigma-red.vercel.app/posts?page=${page}&limit=${limit}`);
      setPosts(res.data.posts);
      setTotalPosts(res.data.totalPosts);
    };
    fetchPosts();
  }, [page]);

  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <div>
      <h1>All Posts</h1>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            {/* তোমার পোস্ট কার্ড ডিজাইন এখানে থাকবে */}
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination mt-4 flex gap-2">
        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num + 1}
            className={`btn ${page === num + 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
