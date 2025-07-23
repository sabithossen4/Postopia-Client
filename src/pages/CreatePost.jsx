import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    author: '',
    authorEmail: '',
    authorImage: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
      createdAt: new Date(),
      totalLiked: 0,
      featured: false,
    };

    try {
      const res = await axios.post('http://localhost:3000/posts', postData);
      if (res.data.insertedId || res.data.acknowledged) {
        toast.success('✅ Post created successfully!');
        setFormData({
          title: '',
          description: '',
          image: '',
          tags: '',
          author: '',
          authorEmail: '',
          authorImage: '',
        });
      } else {
        toast.error('❌ Failed to create post');
      }
    } catch (error) {
      console.error(error);
      toast.error('🚫 Error creating post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">📝 Create a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full input input-bordered"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full textarea textarea-bordered"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full input input-bordered"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          required
          className="w-full input input-bordered"
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          className="w-full input input-bordered"
        />

        <input
          type="email"
          name="authorEmail"
          placeholder="Author Email"
          value={formData.authorEmail}
          onChange={handleChange}
          className="w-full input input-bordered"
        />

        <input
          type="text"
          name="authorImage"
          placeholder="Author Image URL"
          value={formData.authorImage}
          onChange={handleChange}
          className="w-full input input-bordered"
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          ➕ Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
