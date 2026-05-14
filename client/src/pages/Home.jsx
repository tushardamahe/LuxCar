import Banner from "../components/Banner";
import FeaturedSection from "../components/FeaturedSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Testimonial from "../components/testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonial />
      <Newsletter />
    </>
  );
};

export default Home;
