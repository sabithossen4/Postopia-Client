import Banner from './../components/Banner';
import TagsSection from '../components/TagsSection';

import PaginatedPosts from '../components/PaginatedPosts';
import Announcements from '../components/Announcements';

const Home = () => {  
  return (
    <div>
      <title>Postopia</title>
      <Banner></Banner>  
       <TagsSection ></TagsSection>
       <Announcements></Announcements>
       <PaginatedPosts></PaginatedPosts>

     
      
    </div>
  );
};

export default Home;