// src/pages/Home.jsx
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import TagsSection from "../components/TagsSection";
import Announcements from "../components/Announcements";
import PaginatedPosts from "../components/PaginatedPosts";

import TopContributors from "../components/TopContributors";
import PopularTags from "../components/PopularTags";
import JoinCommunity from "../components/JoinCommunity";
import Footer from "../components/Footer";
import TrendingTopics from "../components/TrendingTopics";

// animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerParent = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    } 
  }
};

export default function Home() {
  return (
    <div className="">
      {/* Banner
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="pt-20"
      > */}
        <Banner />
      {/* </motion.div> */}

      {/* Tags Section */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={fadeUp}>
          <TagsSection />
        </motion.div>
      </motion.div>

      {/* Announcements */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4"
      >
        <Announcements />
      </motion.div>

      {/* Paginated Posts */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={fadeUp}>
          <PaginatedPosts />
        </motion.div>
      </motion.div>

      {/* Trending Topics */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <TrendingTopics/>
      </motion.div>

      {/* Top Contributors */}
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.div variants={fadeUp}>
          <TopContributors />
        </motion.div>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4"
      >
        <PopularTags />
      </motion.div>

      {/* Join Community */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <JoinCommunity />
      </motion.div>

     
    </div>
  );
}
