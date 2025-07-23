import  { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import VoteButton from '../components/VoteButton';


const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="text-center my-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 border rounded shadow">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="mb-4">{post.description}</p>

      {/* ✅ Vote System */}
      <VoteButton postId={post._id} initialLikes={post.totalLiked || 0} />

      <div className="flex items-center gap-4 mt-6">
        {post.authorImage && (
          <img
            src={post.authorImage}
            alt="Author"
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-sm text-gray-500">{post.authorEmail}</p>
        </div>
      </div>

      <div className="mt-4">
        <span className="font-semibold">Tags: </span>
        {post.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium mx-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
