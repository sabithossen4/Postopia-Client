import  { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isMember, setIsMember] = useState(false);

  // Load all comments for this post
  useEffect(() => {
    axios.get(`http://localhost:3000/comments/post/${postId}`).then((res) => {
      setComments(res.data);
    });
  }, [postId]);

  // Check if current user is member
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/membership-status/${user.email}`)
        .then((res) => setIsMember(res.data.isMember));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire('Error', 'You must be logged in to comment.', 'error');
    }
    if (!isMember) {
      return Swal.fire('Error', 'Only members can comment.', 'error');
    }
    try {
      const newComment = {
        postId,
        commenter: user.displayName || 'Anonymous',
        commenterEmail: user.email,
        commentText,
        createdAt: new Date(),
      };
      await axios.post('http://localhost:3000/comments', newComment);
      setComments((prev) => [newComment, ...prev]);
      setCommentText('');
    } catch (error) {
      Swal.fire('Error', 'Failed to submit comment.', 'error');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">💬 Comments ({comments.length})</h3>
      
      {user && isMember && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-sm btn-primary mt-2">
            Submit Comment
          </button>
        </form>
      )}

      {!user && <p className="text-warning">Please login to comment.</p>}
      {user && !isMember && (
        <p className="text-error">Only members can comment. Please join membership.</p>
      )}

      <div className="space-y-4">
        {comments.map((c, idx) => (
          <div key={idx} className="p-3 bg-gray-100 rounded">
            <p className="text-sm">
              <span className="font-semibold">{c.commenter}</span>:{' '}
              {c.commentText}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
