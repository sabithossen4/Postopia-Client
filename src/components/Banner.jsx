import axios from 'axios';
import React, { useState } from 'react';

const Banner = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://assignment-12-server-sigma-red.vercel.app/posts/search?tag=${search}`
      );
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="max-w-6xl   mx-auto px-4 mt-6 space-y-8">
      {/*  Banner + Search */}
      <div className="bg-[url(/bg.jpg)] p-10 rounded-lg shadow-md">
        <h1 className="text-purple-700 text-3xl font-bold mb-4 text-center">Welcome to Postopia</h1>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="text"
            placeholder="Search by tag..."
            className="input input-bordered w-full max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn bg-purple-700">Search</button>
        </form>
      </div>

      {/*  Search Result */}
      <div>
        {results.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2 ">Search Results:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((post) => (
                <div key={post._id} className="p-4 shadow rounded-md">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-sm ">Tags: {post.tags?.join(', ')}</p>
                  <p className="text-sm">Posted by: {post.authorName}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;