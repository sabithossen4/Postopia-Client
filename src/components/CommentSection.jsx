import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';


const CommentSection = ({ postId }) => {
  const { user } = use(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/comments/${postId}`).then((res) => {
      setComments(res.data);
    });
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      postId,
      text,
      user: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      createdAt: new Date(),
    };

    const res = await axios.post('http://localhost:3000/comments', newComment);
    if (res.data.insertedId) {
      setComments([newComment, ...comments]);
      setText('');
    }
  };

  return (
    <div className="mt-6 border rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-2">💬 Comments</h3>
      {user ? (
        <form onSubmit={handleComment} className="mb-4">
          <textarea
            className="w-full border p-2 rounded-md mb-2"
            rows="3"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded-md">
            Add Comment
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-600 mb-4">Please login to comment.</p>
      )}
      <div className="space-y-4">
        {comments.map((c, i) => (
          <div key={i} className="border p-3 rounded-md bg-gray-50">
            <div className="flex items-center gap-2 mb-1">
              <img src={c.user.photo} alt="avatar" className="w-6 h-6 rounded-full" />
              <span className="font-medium">{c.user.name}</span>
              <span className="text-xs text-gray-400 ml-auto">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
