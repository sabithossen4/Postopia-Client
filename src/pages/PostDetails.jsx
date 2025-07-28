import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { FaRegComment, FaShare } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import VoteButton from '../components/VoteButton';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);
  const shareUrl = `${window.location.origin}/post/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`https://assignment-12-server-sigma-red.vercel.app/posts/${id}`);
        setPost(postRes.data);
        
        const commentsRes = await axios.get(`https://assignment-12-server-sigma-red.vercel.app/comments/${id}`);
        setComments(commentsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire('Error', 'You need to login to comment', 'error');
      return;
    }
    if (!newComment.trim()) return;

    try {
      const comment = {
        postId: id,
        text: newComment,
        authorName: user.displayName || 'Anonymous',
        authorPhoto: user.photoURL || '',
        createdAt: new Date()
      };

      await axios.post('https://assignment-12-server-sigma-red.vercel.app/comments', comment);
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      Swal.fire('Error', 'Failed to post comment', 'error');
    }
  };

  if (!post) return <div className="text-center my-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src={post.authorPhoto || '/default-user.png'}
          alt="Author"
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <h3 className="font-semibold text-lg">{post.authorName}</h3>
          <p className="text-xs text-gray-500">
            Posted on {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{post.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      {/* Voting and Action Buttons */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <VoteButton 
          postId={post._id} 
          initialLikes={post.upVote || 0} 
          initialDislikes={post.downVote || 0} 
        />
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
            <FaRegComment />
            <span>{comments.length} Comments</span>
          </button>
          
          <div className="dropdown dropdown-end">
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500">
              <FaShare /> Share
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
              <li>
                <FacebookShareButton url={shareUrl} quote={post.title}>
                  <div className="flex items-center gap-2">
                    <FacebookIcon size={24} round />
                    <span>Share on Facebook</span>
                  </div>
                </FacebookShareButton>
              </li>
              <li>
                <WhatsappShareButton url={shareUrl} title={post.title}>
                  <div className="flex items-center gap-2">
                    <WhatsappIcon size={24} round />
                    <span>Share on WhatsApp</span>
                  </div>
                </WhatsappShareButton>
              </li>
            </ul>
          </div>
        </div>
        
      </div>

      {/* Comment Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
        
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-6 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Login to comment
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex gap-3">
              <img
                src={comment.authorPhoto || '/default-user.png'}
                alt="Commenter"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <div className="flex-1">
                <div className=" p-3 rounded-lg">
                  <h4 className="font-semibold">{comment.authorName}</h4>
                  <p className="">{comment.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
<Link 
  to ='comments'
  className="text-blue-600 hover:text-blue-800"
>
  
  {comments.length} Comments
</Link>




    </div>
  );
};

export default PostDetails;