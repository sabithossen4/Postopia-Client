// components/TrendingTopics.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const TrendingTopics = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-12-server-sigma-red.vercel.app/posts?sort=popularity&limit=5")
      .then((res) => setTrending(res.data.posts))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="my-12  rounded-xl shadow-md border border-purple-100 p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">🔥 Trending Topics</h2>
      <ul className="space-y-3">
        {trending.map((post) => (
          <li key={post._id} className="border-b border-gray-200 pb-2">
            <Link
              to={`/post/${post._id}`}
              className="text-purple-600 font-medium hover:underline"
            >
              {post.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">({post.upVote} votes)</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingTopics;
