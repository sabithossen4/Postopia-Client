// components/JoinCommunity.jsx
import { Link } from "react-router";

import { AuthContext } from "../context/AuthProvider";
import {  useContext } from "react";

const JoinCommunity = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="my-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-12 text-white">
      <h2 className="text-3xl font-bold mb-4">🚀 Join Our Growing Community!</h2>
      <p className="mb-6 text-lg">
        Share your knowledge, ask questions, and connect with other developers today.
      </p>
      {user ? (
        <Link
          to="/dashboard/add-post"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Add Your First Post
        </Link>
      ) : (
        <Link
          to="/join"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Join Now
        </Link>
      )}
    </section>
  );
};

export default JoinCommunity;
