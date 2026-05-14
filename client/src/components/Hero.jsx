import { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/useAppContext";
import { motion } from "motion/react";
import { HiChevronDown } from "react-icons/hi";
import { FiCalendar, FiMapPin, FiSearch } from "react-icons/fi";

import Car3DModel from "./3d-model/Car3DModel";
import HeroBackground from "../ui/backgrounds/HeroBackground";
import Title from "./Title";

const Hero = () => {
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const [pickupLocation, setPickupLocation] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`,
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex flex-col items-center justify-start pt-20 pb-10 px-4 overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10">
        <Title
          title="Drive Extraordinary"
          subTitle="Experience premium mobility with world-class luxury vehicles tailored for every journey"
        />
      </div>

      <motion.form
        initial={{ scale: 0.96, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSearch}
        className="relative z-10 mt-10 w-full max-w-6xl rounded-3xl border border-orange-500/10 bg-[#111111]/85 backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.08)] px-5 md:px-8 py-5"
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <div className="relative flex-1">
            <label className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-3 block">
              Pickup Location
            </label>

            <div className="relative flex items-center rounded-2xl border border-white/10 bg-[#1a1a1c] px-4 h-14 focus-within:border-orange-500 transition-all">
              <FiMapPin className="text-neutral-500 text-lg" />

              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full appearance-none bg-transparent outline-none text-white px-3"
              >
                <option value="" className="bg-[#111111]">
                  Select City
                </option>

                {cityList.map((city) => (
                  <option key={city} value={city} className="bg-[#111111]">
                    {city}
                  </option>
                ))}
              </select>

              <HiChevronDown className="text-neutral-500 text-lg pointer-events-none" />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-3 block">
              Pickup Date
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-[#1a1a1c] px-4 h-14 focus-within:border-orange-500 transition-all">
              <FiCalendar className="text-neutral-500 text-lg" />

              <input
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                type="date"
                min={today}
                required
                className="w-full bg-transparent outline-none text-white px-3 scheme-dark"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-xs uppercase tracking-[0.2em] text-orange-400 mb-3 block">
              Return Date
            </label>

            <div className="flex items-center rounded-2xl border border-white/10 bg-[#1a1a1c] px-4 h-14 focus-within:border-orange-500 transition-all">
              <FiCalendar className="text-neutral-500 text-lg" />

              <input
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                min={pickupDate || today}
                required
                className="w-full bg-transparent outline-none text-white px-3 scheme-dark"
              />
            </div>
          </div>

          <div className="lg:self-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="h-14 px-8 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all cursor-pointer whitespace-nowrap"
            >
              <FiSearch className="text-lg" />
              Search Cars
            </motion.button>
          </div>
        </div>
      </motion.form>

      <div className="relative z-10 mt-8 w-full">
        <Car3DModel />
      </div>
    </motion.section>
  );
};

export default Hero;
