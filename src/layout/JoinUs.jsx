import React from 'react';
import { Outlet } from 'react-router';
import JoinNav from '../components/JoinNav';

const JoinUs = () => {
  return (
    <div>
      <JoinNav />

      <Outlet />
    </div>
  );
};

export default JoinUs;