import Banner from './../components/Banner';
import TagsSection from '../components/TagsSection';
import FeaturedPosts from '../components/FeaturedPosts';
import RecentPosts from '../components/RecentPosts';
import TrendingPosts from '../components/TrendingPosts';
import TagFilterPosts from '../components/TagFilterPosts';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TagsSection onTagClick={(tag) => setSearch(tag)}></TagsSection>
      <FeaturedPosts></FeaturedPosts>
      <RecentPosts></RecentPosts>
      <TrendingPosts></TrendingPosts>
      <TagFilterPosts></TagFilterPosts>
    </div>
  );
};

export default Home;