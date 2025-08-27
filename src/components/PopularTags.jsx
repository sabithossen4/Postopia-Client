// components/PopularTags.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const PopularTags = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://assignment-12-server-sigma-red.vercel.app/tags")
      .then((res) => setTags(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleTagClick = (tag) => {
    navigate(`/tags/${tag}`);
  };

  return (
    <section className="my-12  rounded-xl shadow-md border border-purple-100 p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">🌐 Popular Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            onClick={() => handleTagClick(tag)}
            className={`cursor-pointer px-3 py-1 rounded-full text-sm bg-purple-${(idx % 5 + 3) * 100} text-white hover:opacity-80`}
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default PopularTags;
