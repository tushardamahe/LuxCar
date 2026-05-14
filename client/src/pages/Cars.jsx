import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import toast from "react-hot-toast";
import { easeOut, motion } from "motion/react";

const Cars = () => {
  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredCars, setFilteredCars] = useState([]);
  const [input, setInput] = useState("");

  const applyFilter = () => {
    if (input === "") {
      setFilteredCars(cars);
      return;
    }

    const filtered = cars.filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });

    setFilteredCars(filtered);
  };

  const searchCarAvailablity = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });

    if (data.success) {
      setFilteredCars(data.availableCars);

      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailablity();
    }
  }, []);

  useEffect(() => {
    if (cars.length > 0 && !isSearchData) {
      applyFilter();
    }
  }, [input, cars]);

  return (
    <div className="bg-dark text-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex flex-col items-center py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 flex justify-center">
          <div className="w-150 h-75 bg-primary/10 blur-[150px] rounded-full mt-10 opacity-70"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles available for your next adventure"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
            className="flex items-center bg-[#1c1c1e]/80 backdrop-blur-md 
            px-5 mt-8 max-w-xl w-full h-12 rounded-full 
            border border-neutral-700 shadow-lg shadow-black/30
            focus-within:border-primary/40 
            focus-within:shadow-[0_0_10px_rgba(254,93,0,0.2)] 
            transition"
          >
            <img
              src={assets.search_icon}
              alt=""
              className="w-4.5 h-4.5 mr-3 opacity-70"
            />

            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Search by brand, model, category..."
              className="w-full h-full bg-transparent outline-none text-white placeholder:text-neutral-500"
            />

            <img
              src={assets.filter_icon}
              alt=""
              className="w-4.5 h-4.5 ml-3 opacity-70"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 pb-20"
      >
        <p className="text-neutral-400 xl:px-20 max-w-7xl mx-auto text-sm">
          Showing{" "}
          <span className="text-primary font-medium">
            {filteredCars.length}
          </span>{" "}
          Cars
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08 * index,
                duration: 0.4,
                ease: easeOut,
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
