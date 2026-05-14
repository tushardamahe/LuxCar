import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import Title from "./Title";
import { useAppContext } from "../context/useAppContext";

import { motion } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premimun vehicles available for your next adventure"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.slice(0, 6).map((car) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            key={car._id}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 mt-18 cursor-pointer rounded-lg border border-neutral-700 text-neutral-300 bg-[#1c1c1e]/60 backdrop-blur-md hover:border-primary hover:text-primary hover:shadow-[0_0_12px_rgba(254,93,0,0.2)] transition-all duration-300"
      >
        Explore all cars
        <img src={assets.arrow_icon} className="h-4 opacity-70" alt="arrow" />
      </motion.button>
    </motion.div>
  );
};

export default FeaturedSection;
