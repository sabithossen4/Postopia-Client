import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const TagsSection = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/tags')
      .then(res => setTags(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTagClick = (tag) => {
    navigate(`/tags/${tag}`);
  };

  return (
    <div className="my-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Explore Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => handleTagClick(tag)}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
