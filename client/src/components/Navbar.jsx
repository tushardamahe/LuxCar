import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/useAppContext";
import { motion } from "motion/react";

import logo from "../assets/lclogo.svg";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");

      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        setShowOwnerModal(false);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          flex items-center justify-between
          px-6 md:px-16 lg:px-24 xl:px-32
          py-3
          text-white
          border-b border-orange-500/10
          bg-[#09090b]/95
          backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.35)]
          sticky top-0 z-50
        "
      >
        <Link to="/" onClick={() => setOpen(false)}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <img src={logo} alt="LuxCar" className="h-10 md:h-12 w-auto" />

            <h2 className="font-nevera text-lg md:text-xl text-white tracking-wide">
              <span className="text-primary">Lux</span>Car
            </h2>
          </motion.div>
        </Link>

        <div
          className={`
            max-sm:fixed
            max-sm:h-screen
            max-sm:w-full
            max-sm:top-20
            max-sm:left-0
            right-0
            flex flex-col sm:flex-row
            items-start sm:items-center
            gap-6 sm:gap-8
            max-sm:p-6
            transition-all duration-300
            z-50
            bg-[#09090b]
            sm:bg-transparent
            ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}
          `}
        >
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`transition font-medium ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-neutral-300 hover:text-primary"
              }`}
              onClick={(e) => {
                if (link.protected && !user) {
                  e.preventDefault();
                  toast.error("Please login first");
                  setShowLogin(true);
                }
                setOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex max-sm:flex-col items-start sm:items-center gap-5 sm:gap-6">
            <button
              className="text-neutral-300 hover:text-primary transition font-medium cursor-pointer"
              onClick={() => {
                if (!user) {
                  toast.error("Please login first");
                  setShowLogin(true);
                  return;
                }

                isOwner ? navigate("/owner") : setShowOwnerModal(true);
                setOpen(false);
              }}
            >
              {isOwner ? "Dashboard" : "List Your Car"}
            </button>

            <button
              className={`cursor-pointer px-6 py-2.5 rounded-full font-medium transition-all ${
                user
                  ? "bg-red-500/90 hover:bg-red-600 text-white"
                  : "bg-primary hover:bg-primary-dull text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]"
              }`}
              onClick={() => {
                user ? logout() : setShowLogin(true);
                setOpen(false);
              }}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        <button
          className="sm:hidden cursor-pointer opacity-80 hover:opacity-100"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </button>
      </motion.div>

      {showOwnerModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl border border-orange-500/10 bg-dark p-8 shadow-[0_0_50px_rgba(249,115,22,0.15)]">
            <div className="flex items-center justify-center gap-2">
              <img src={logo} alt="LuxCar" className="h-12 w-auto" />

              <h2 className="font-nevera text-lg md:text-xl text-white tracking-wide">
                <span className="text-primary">Lux</span>Car
              </h2>
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-white text-center">
              Become a LuxCar Host
            </h2>

            <p className="mt-4 text-neutral-400 text-center leading-relaxed">
              List your premium vehicles, manage bookings, and access your
              exclusive owner dashboard.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setShowOwnerModal(false)}
                className="flex-1 py-3 rounded-2xl border border-white/10 text-neutral-300 hover:bg-white/5 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={changeRole}
                className="flex-1 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
