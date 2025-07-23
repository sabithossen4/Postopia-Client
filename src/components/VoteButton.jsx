import axios from 'axios';
import  { useState } from 'react';

const VoteButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleVote = async (voteType) => {
    try {
      await axios.patch(`http://localhost:3000/posts/${postId}/vote`, {
        voteType,
      });
      setLikes((prev) => voteType === 'upvote' ? prev + 1 : prev - 1);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        onClick={() => handleVote('upvote')}
        className="px-2 py-1 bg-green-200 rounded hover:bg-green-300"
      >
        👍 Upvote
      </button>
      <button
        onClick={() => handleVote('downvote')}
        className="px-2 py-1 bg-red-200 rounded hover:bg-red-300"
      >
        👎 Downvote
      </button>
      <span className="font-medium">Likes: {likes}</span>
    </div>
  );
};

export default VoteButton;
