import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group bg-dark text-white rounded-xl overflow-hidden 
      border border-neutral-800 shadow-lg shadow-black/30
      hover:scale-[1.02] hover:-translate-y-1 
      transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt="Car Image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {car.isAvailable && (
          <p className="absolute top-4 left-4 bg-orange-500/90 text-white text-xs px-2.5 py-1 rounded-full">
            Available Now
          </p>
        )}

        <div className="absolute bottom-4 right-4 bg-[#1c1c1e]/80 backdrop-blur-md text-white px-3 py-2 rounded-lg border border-orange-500/20">
          <span className="font-semibold">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-neutral-400"> / day</span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-2">
          <h3 className="relative text-lg font-semibold text-orange-500 inline-block">
            <span className="absolute inset-0 -z-10 bg-orange-500/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition duration-500"></span>
            {car.brand} {car.model}
          </h3>

          <p className="text-neutral-400 text-sm">
            {car.category} • {car.year}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-y-2 text-neutral-400">
          <div className="flex items-center text-sm group-hover:text-white transition">
            <img
              src={assets.users_icon}
              alt=""
              className="h-4 mr-2 icon-orange"
            />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center text-sm group-hover:text-white transition">
            <img
              src={assets.fuel_icon}
              alt=""
              className="h-4 mr-2 icon-orange"
            />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center text-sm group-hover:text-white transition">
            <img
              src={assets.car_icon}
              alt=""
              className="h-4 mr-2 icon-orange"
            />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center text-sm group-hover:text-white transition">
            <img
              src={assets.location_icon}
              alt=""
              className="h-4 mr-2 icon-orange"
            />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
