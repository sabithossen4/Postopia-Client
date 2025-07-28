import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    axios.get('https://assignment-12-server-sigma-red.vercel.app/users/top-voted').then((res) => {
      setTopUsers(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
      <div className=" shadow-md rounded p-4">
        {topUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ol className="list-decimal pl-5 space-y-2">
            {topUsers.map((user, index) => (
              <li key={user._id} className="flex justify-between">
                <span>{user.name || 'Anonymous'}</span>
                <span className="font-semibold text-blue-600">
                  {user.totalVote || 0} votes
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
