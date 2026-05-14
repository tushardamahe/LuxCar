import { useState, useEffect } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/useAppContext";
import toast from "react-hot-toast";

import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");

      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?",
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete("/api/owner/delete-car", {
        data: { carId },
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  return (
    <div className="flex-1 min-h-screen bg-[#09090b] px-4 md:px-8 lg:px-10 py-8 text-white">
      <div className="h-2 w-24 rounded-full bg-linear-to-r from-orange-400 to-orange-600 mb-4"></div>

      <Title
        title="Manage Cars"
        subTitle="View all listed luxury cars, manage availability and remove vehicles from the platform"
      />

      <div className="max-w-6xl w-full rounded-3xl overflow-hidden border border-orange-500/10 bg-[#111111] shadow-[0_0_40px_rgba(249,115,22,0.05)] mt-8">
        <table className="w-full border-collapse text-left text-sm text-gray-300">
          <thead className="bg-white/3 text-gray-400">
            <tr>
              <th className="p-5 font-medium">Car</th>

              <th className="p-5 font-medium max-md:hidden">Category</th>

              <th className="p-5 font-medium">Price</th>

              <th className="p-5 font-medium max-md:hidden">Status</th>

              <th className="p-5 font-medium text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className="border-t border-white/5 hover:bg-white/2 transition-all duration-300"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={car.image}
                      alt=""
                      className="h-14 w-14 rounded-xl object-cover shadow-lg"
                    />

                    <div>
                      <p className="font-semibold text-white">
                        {car.brand} {car.model}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {car.seating_capacity} Seats • {car.transmission}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-gray-300 max-md:hidden">
                  {car.category}
                </td>

                <td className="p-5 font-medium text-white">
                  {currency}
                  {car.pricePerDay.toLocaleString("en-IN")}
                  <span className="text-gray-400 text-sm"> / day</span>
                </td>

                <td className="p-5 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      car.isAvailable
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex items-center justify-center gap-4 text-lg">
                    <button
                      onClick={() => toggleAvailability(car._id)}
                      className="text-orange-500 hover:text-orange-400 transition-all duration-300 cursor-pointer"
                    >
                      {car.isAvailable ? <FiEyeOff /> : <FiEye />}
                    </button>

                    <button
                      onClick={() => deleteCar(car._id)}
                      className="text-red-500 hover:text-red-400 transition-all duration-300 cursor-pointer"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cars.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No cars listed yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
