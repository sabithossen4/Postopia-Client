import  { useEffect, useState } from 'react';
import axios from 'axios';

const TagFilterPosts = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [posts, setPosts] = useState([]);

  // fetch all tags from backend (you already have this in AllTags)
  useEffect(() => {
    axios.get('http://localhost:3000/posts/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error('Tag fetch error:', err));
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    axios.get(`http://localhost:3000/posts/byTag/${tag}`)
      .then(res => setPosts(res.data))
      .catch(err => console.error('Post fetch error:', err));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10 space-y-6">
      <h2 className="text-2xl font-bold">🔎 Filter by Tag</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${selectedTag === tag ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts of Selected Tag */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {posts.map((post) => (
          <div key={post._id} className="p-4 bg-base-100 rounded shadow">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">Tags: {post.tags?.join(', ')}</p>
            <p className="text-sm">Author: {post.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagFilterPosts;
