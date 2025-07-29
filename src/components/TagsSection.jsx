import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const TagsSection = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://assignment-12-server-sigma-red.vercel.app/tags')
      .then((res) => setTags(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleTagClick = (tag) => {
    navigate(`/tags/${tag}`);
  };

  // Custom CSS for marquee animation
  const marqueeStyle = {
    display: 'flex',
    gap: '20px',
    whiteSpace: 'nowrap',
    animation: 'scrollLeft 20s linear infinite',
  };

  return (
    <div className="my-12  overflow-hidden p-4 md:p-8 bg-white rounded-xl shadow-md border border-purple-100">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-700">Explore Tags</h2>

      {/* Scrolling container */}
      <div className="relative overflow-hidden w-full   py-4">
        <div style={marqueeStyle}>
          {[...tags, ...tags].map((tag, idx) => (
            <div
              key={idx}
              onClick={() => handleTagClick(tag)}
              className="cursor-pointer bg-white border border-purple-300 shadow px-4 py-2 rounded-full text-purple-700 font-medium text-sm hover:bg-purple-100 transition duration-300"
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>

      {/* Inline <style> tag with keyframes */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default TagsSection;
