// src/components/NotificationBell.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiBell } from 'react-icons/fi'; // Feather Bell icon from react-icons

const NotificationBell = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('https://assignment-12-server-sigma-red.vercel.app/announcements')
      .then(res => setCount(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="relative">
      <FiBell className="w-6 h-6 " />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-700 text-white text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
