// src/components/NotificationBell.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiBell } from 'react-icons/fi'; // Feather Bell icon from react-icons

const NotificationBell = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/announcements')
      .then(res => setCount(res.data.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="relative">
      <FiBell className="w-6 h-6 text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
