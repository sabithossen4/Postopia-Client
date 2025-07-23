import axios from 'axios';
import { useEffect, useState } from 'react';

const TagsSection = ({ onTagClick }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/tags');
        setTags(data);
      } catch (error) {
        console.error('Failed to load tags:', error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-2">All Tags:</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => onTagClick(tag)}
            className="badge badge-outline cursor-pointer hover:bg-primary hover:text-white transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
