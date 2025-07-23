import React from 'react';
import Banner from './../components/Banner';
import TagsSection from '../components/TagsSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TagsSection onTagClick={(tag) => setSearch(tag)}></TagsSection>
    </div>
  );
};

export default Home;