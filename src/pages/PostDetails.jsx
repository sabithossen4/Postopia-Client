import  { useEffect, useState } from 'react';


import VoteButton from '../components/VoteButton';
import CommentSection from '../components/CommentSection';
import axios from 'axios';
import { useParams } from 'react-router';




const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className=" p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className=" mb-4">{post.description}</p>

        <div className="flex items-center justify-between mt-4">
          <VoteButton postId={post._id} initialLikes={post.totalLiked || 0} />
          
        </div>

        {/* 💬 Comment Section */}
        <CommentSection postId={post._id} />
      </div>
    </div>
  );
};

export default PostDetails;
