import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { currency, axios, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 mb-20 text-sm max-w-7xl mx-auto"
    >
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
      />

      <div>
        {bookings.map((booking, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 mt-5 first:mt-12
        bg-[#1c1c1e]/80 backdrop-blur-md 
        border border-neutral-800 rounded-xl 
        shadow-lg shadow-black/30 hover:shadow-black/50 transition"
          >
            <Link
              to={`/car-details/${booking.car._id}`}
              className="md:col-span-1 block group"
            >
              <div className="rounded-md overflow-hidden mb-3">
                <img
                  src={booking.car.image}
                  alt=""
                  className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <p className="text-lg font-medium mt-2 text-white group-hover:text-primary transition">
                {booking.car.brand} {booking.car.model}
              </p>

              <p className="text-neutral-400 text-sm">
                {booking.car.year} • {booking.car.category} •{" "}
                {booking.car.location}
              </p>
            </Link>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <p className="px-3 py-1.5 bg-neutral-800 text-neutral-300 rounded">
                  Booking #{index + 1}
                </p>

                <p
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <img
                  src={assets.calendar_icon_colored}
                  alt=""
                  className="w-4 h-4 icon-orange"
                />

                <div>
                  <p className="text-neutral-400 text-sm">Rental Period</p>
                  <p className="text-white">
                    {booking.pickupDate.split("T")[0]} →{" "}
                    {booking.returnDate.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <img
                  src={assets.location_icon_colored}
                  alt=""
                  className="w-4 h-4 icon-orange"
                />

                <div>
                  <p className="text-neutral-400 text-sm">Pickup Location</p>
                  <p className="text-white">{booking.car.location}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 flex flex-col justify-between gap-6">
              <div className="text-right">
                <p className="text-neutral-400 text-sm">Total Price</p>

                <h1 className="text-2xl font-semibold text-primary">
                  {currency}
                  {booking.price}
                </h1>

                <p className="text-neutral-500 text-xs mt-1">
                  Booked on {booking.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;
