import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';

const VoteButton = ({ postId, initialLikes, initialDislikes }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);
  const [userLike, setUserLike] = useState(false);
  const [userDislike, setUserDislike] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      let likeChange = 0;
      let dislikeChange = 0;

      if (userLike) {
        // Already liked, so remove like
        likeChange = -1;
        setUserLike(false);
      } else {
        // Add new like
        likeChange = 1;
        setUserLike(true);
        
        // If previously disliked, remove that dislike
        if (userDislike) {
          dislikeChange = -1;
          setUserDislike(false);
        }
      }

      await axios.patch(`http://localhost:3000/posts/${postId}/vote`, {
        likeChange,
        dislikeChange
      });

      setLikes(prev => prev + likeChange);
      setDislikes(prev => prev + dislikeChange);

    } catch (error) {
      Swal.fire('Error', 'Failed to register your vote', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      let likeChange = 0;
      let dislikeChange = 0;

      if (userDislike) {
        // Already disliked, so remove dislike
        dislikeChange = -1;
        setUserDislike(false);
      } else {
        // Add new dislike
        dislikeChange = 1;
        setUserDislike(true);
        
        // If previously liked, remove that like
        if (userLike) {
          likeChange = -1;
          setUserLike(false);
        }
      }

      await axios.patch(`http://localhost:3000/posts/${postId}/vote`, {
        likeChange,
        dislikeChange
      });

      setLikes(prev => prev + likeChange);
      setDislikes(prev => prev + dislikeChange);

    } catch (error) {
      Swal.fire('Error', 'Failed to register your vote', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        <button
          onClick={handleLike}
          disabled={loading}
          className="cursor-pointer"
        >
          <AiOutlineLike size={25}/>
        </button>
        <span className="font-semibold">{likes}</span>
      </div>

      
      <div className="flex items-center gap-1">
        <button
          onClick={handleDislike}
          disabled={loading}
          className="cursor-pointer"
        >
          <AiOutlineDislike size={25}/>
        </button>
        <span className="font-semibold">{dislikes}</span>
      </div>



    </div>
  );
};

export default VoteButton;