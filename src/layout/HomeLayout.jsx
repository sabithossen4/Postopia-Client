import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomeLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='mt-28 min-h-[calc(100vh-425px)]'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;