import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TagFilterPosts = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://assignment-12-server-sigma-red.vercel.app/posts/search?tag=${tag}`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, [tag]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Posts Tagged with: #{tag}</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map(post => (
            <div key={post._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p>{post.summary}</p>
              <div className="mt-2 text-sm text-gray-500">
                Tags: {post.tags?.map((t, i) => <span key={i}>#{t} </span>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagFilterPosts;
