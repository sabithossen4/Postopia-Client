import { useEffect, useState } from "react";
import axios from "axios";
import VoteButton from "../components/VoteButton";
import { Link } from "react-router";
import { FaCalendarAlt, FaUser, FaTags, FaSort } from "react-icons/fa";

const PaginatedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalPages = Math.ceil(totalCount / 6); // 6 per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://assignment-12-server-sigma-red.vercel.app/posts?page=${currentPage}&sort=${sortBy}`
        );
        setPosts(response.data.posts);
        setTotalCount(response.data.totalCount);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Community Posts</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover the latest discussions, tutorials, and insights from our community members.
        </p>
      </div>

      {/* Sort and Stats Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaSort className="text-purple-500" />
            <span>Sort by:</span>
          </div>
          <select
            className="border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="popularity">Most Popular</option>
            <option value="titleAsc">Title: A → Z</option>
            <option value="titleDesc">Title: Z → A</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-400">
          Showing {posts.length} of {totalCount} posts
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-6">Be the first to create a post in our community!</p>
          <Link
            to="/create-post"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-purple-600"
            >
              {/* Post Image (if available) */}
              {post.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.authorPhoto}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full border-2 border-purple-600"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{post.authorName}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FaCalendarAlt className="text-purple-500" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <Link to={`/post/${post._id}`}>
                  <h2 className="text-xl font-bold text-white hover:text-purple-400 transition mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {/* Description */}
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.description || "No description available..."}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-900 text-purple-200 text-xs rounded-full"
                      >
                        <FaTags className="text-xs" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Section */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <VoteButton postId={post._id} />
                  
                  <Link
                    to={`/post/${post._id}`}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* First Page */}
          {getPageNumbers()[0] > 1 && (
            <>
              <button
                className={`px-4 py-2 rounded-lg ${1 === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'} transition`}
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              {getPageNumbers()[0] > 2 && <span className="px-2 text-gray-500">...</span>}
            </>
          )}

          {/* Page Numbers */}
          {getPageNumbers().map(page => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg ${page === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'} transition`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          {/* Last Page */}
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                className={`px-4 py-2 rounded-lg ${totalPages === currentPage ? 'bg-purple-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'} transition`}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedPosts;
