import { useEffect, useState } from "react";
import axios from "axios";
import VoteButton from "../components/VoteButton";
import { Link } from "react-router";

const PaginatedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / 5);

  useEffect(() => {
    axios
      .get(`https://assignment-12-server-sigma-red.vercel.app/posts?page=${currentPage}&sort=${sortBy}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalCount(res.data.totalCount);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
      });
  }, [currentPage, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="px-4 py-8   ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Posts</h2>
        <select
          className="border rounded px-2 py-1 bg-[#1e293b] text-white"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-purple-600 rounded-md p-4  shadow hover:shadow-lg transition"
            >
              {/* Author Info */}
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={post.authorPhoto}
                  alt="author"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-sm">{post.authorName}</h3>
                  <p className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Title Link */}
              <Link
                to={`/post/${post._id}`}
                className="text-lg font-bold hover:underline block mb-2"
              >
                {post.title}
              </Link>

              {/* Tags */}
              <p className="text-sm text-blue-400 mb-2">
                #{post.tags?.[0] || "General"}
              </p>

            
              

              {/* Vote Button */}
              <VoteButton postId={post._id} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="px-4 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="px-4 py-1 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedPosts;
