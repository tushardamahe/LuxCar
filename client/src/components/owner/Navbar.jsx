import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/useAppContext";
import { FiBell, FiSearch } from "react-icons/fi";

import { motion } from "motion/react";

const Navbar = () => {
  const { user } = useAppContext();

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-3 bg-[#09090b]/80 backdrop-blur-xl border-b border-orange-500/10">
      <div className="flex items-center gap-6">
        <Link to="/">
          <motion.div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-1">
              <img src={assets.lclogo} alt="LuxCar" className="h-14 w-auto" />

              <h2 className="font-nevera text-xl md:text-2xl text-white tracking-wide">
                <span className="text-primary">Lux</span>Car
              </h2>
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-[#18181b] border border-white/5 rounded-2xl px-3 py-2 hover:border-orange-500/20 transition-all duration-300">
          <img
            src={user?.image}
            alt=""
            className="w-11 h-11 rounded-2xl object-cover border border-orange-500/10"
          />

          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-white">
              {user?.name || "Owner"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
