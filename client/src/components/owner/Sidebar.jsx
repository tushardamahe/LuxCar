import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import toast from "react-hot-toast";

import { FiGrid, FiPlusCircle, FiCalendar, FiCamera } from "react-icons/fi";

import { IoCarSportOutline } from "react-icons/io5";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();

  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();

      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);

      if (data.success) {
        fetchUser();

        toast.success(data.message);

        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const menuLinks = [
    {
      name: "Dashboard",
      path: "/owner",
      icon: FiGrid,
    },
    {
      name: "Add Car",
      path: "/owner/add-car",
      icon: FiPlusCircle,
    },
    {
      name: "Manage Cars",
      path: "/owner/manage-cars",
      icon: IoCarSportOutline,
    },
    {
      name: "Bookings",
      path: "/owner/manage-bookings",
      icon: FiCalendar,
    },
  ];

  return (
    <div className="min-h-screen w-22 md:w-67.5 bg-[#0b0b0b] border-r border-orange-500/10 flex flex-col items-center py-8 px-3">
      <div className="relative group">
        <label htmlFor="image" className="relative cursor-pointer">
          <img
            src={image ? URL.createObjectURL(image) : user?.image}
            alt=""
            className="w-16 h-16 md:w-24 md:h-24 rounded-3xl object-cover border border-orange-500/20 shadow-[0_0_25px_rgba(249,115,22,0.12)]"
          />

          <div className="absolute inset-0 rounded-3xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
            <FiCamera className="text-white text-xl" />
          </div>

          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-all duration-300"
          >
            Save
          </button>
        )}
      </div>

      <div className="mt-5 text-center hidden md:block">
        <h1 className="text-white font-semibold">{user?.name}</h1>

        <p className="text-sm text-gray-400 mt-1">Luxury Owner</p>
      </div>

      <div className="w-full mt-10 flex flex-col gap-2">
        {menuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end={link.path === "/owner"}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-[0_0_25px_rgba(249,115,22,0.25)]"
                  : "text-gray-400 hover:bg-white/3 hover:text-orange-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  className={`text-xl min-w-5 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-orange-400"
                  }`}
                />

                <span className="hidden md:block font-medium">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
