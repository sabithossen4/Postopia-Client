import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import VoteButton from './VoteButton';


const RecentPosts = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios.get('https://assignment-12-server-sigma-red.vercel.app/posts/recent').then((res) => {
      setRecent(res.data);
    });
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">🆕 Recent Posts</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recent.map((post) => (
          <div key={post._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p>{post.summary}</p>
            <p className="mt-2 text-sm text-gray-500">Tags: {post.tags.join(', ')}</p>
            <Link
              to={`/post/${post._id}`}
              className="inline-block mt-2 text-blue-500 underline"
            >
              View Details
            </Link>
            <VoteButton postId={post._id} initialVotes={post.totalLiked} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
