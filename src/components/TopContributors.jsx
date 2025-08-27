// components/TopContributors.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const TopContributors = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-12-server-sigma-red.vercel.app/users/top")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="my-12  rounded-xl shadow-md border border-purple-100 p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">🏆 Top Contributors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 border rounded-lg shadow-sm bg-purple-50 text-center"
          >
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-purple-400"
            />
            <h3 className="font-semibold text-purple-700">{user.name}</h3>
            <p className="text-sm text-gray-600">Posts: {user.postCount}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;
