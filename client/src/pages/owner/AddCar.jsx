import { useState } from "react";
import Title from "../../components/owner/Title";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/useAppContext";
import { IoCheckmarkCircle, IoCloudUploadOutline } from "react-icons/io5";

import { HiChevronDown } from "react-icons/hi";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);

      if (data.success) {
        toast.success(data.message);

        setImage(null);

        setCar({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "",
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#09090b] px-4 md:px-8 lg:px-10 py-8 text-white">
      <div className="h-2 w-24 rounded-full bg-linear-to-r from-orange-400 to-orange-600 mb-4"></div>

      <Title
        title="Add New Car"
        subTitle="List a luxury vehicle with specifications, pricing and booking availability"
      />

      <div className="max-w-5xl mt-8 bg-[#111111] border border-orange-500/10 rounded-3xl p-5 md:p-6 shadow-[0_0_40px_rgba(249,115,22,0.06)]">
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="car-image"
              className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-orange-500/20 rounded-2xl cursor-pointer bg-[#18181b] hover:border-orange-500 transition-all duration-300 overflow-hidden"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <IoCloudUploadOutline className="text-3xl text-orange-500" />
                  </div>

                  <p className="mt-3 text-sm text-gray-400">
                    Upload luxury car image
                  </p>
                </>
              )}

              <input
                type="file"
                id="car-image"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-300 font-medium">Brand</label>

              <input
                type="text"
                required
                placeholder="BMW, Audi, Mercedes..."
                value={car.brand}
                onChange={(e) => setCar({ ...car, brand: e.target.value })}
                className="w-full mt-2 bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 font-medium">Model</label>

              <input
                type="text"
                required
                placeholder="M4, R8, E-Class..."
                value={car.model}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
                className="w-full mt-2 bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-sm text-gray-300 font-medium">Year</label>

              <input
                type="number"
                required
                placeholder="2026"
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
                className="w-full mt-2 bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 font-medium">
                Daily Price ({currency})
              </label>

              <input
                type="number"
                required
                placeholder="500"
                value={car.pricePerDay}
                onChange={(e) =>
                  setCar({
                    ...car,
                    pricePerDay: e.target.value,
                  })
                }
                className="w-full mt-2 bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 font-medium">
                Category
              </label>

              <div className="relative">
                <select
                  value={car.category}
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  className="w-full mt-2 appearance-none bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white"
                >
                  <option value="">Select Category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                </select>

                <HiChevronDown className="absolute right-4 top-[58%] -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-sm text-gray-300 font-medium">
                Transmission
              </label>

              <div className="relative">
                <select
                  value={car.transmission}
                  onChange={(e) =>
                    setCar({
                      ...car,
                      transmission: e.target.value,
                    })
                  }
                  className="w-full mt-2 appearance-none bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white"
                >
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
                <HiChevronDown className="absolute right-4 top-[58%] -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 font-medium">
                Fuel Type
              </label>
              <div className="relative">
                <select
                  value={car.fuel_type}
                  onChange={(e) =>
                    setCar({
                      ...car,
                      fuel_type: e.target.value,
                    })
                  }
                  className="w-full mt-2 appearance-none bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                <HiChevronDown className="absolute right-4 top-[58%] -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 font-medium">
                Seating Capacity
              </label>

              <input
                type="number"
                required
                placeholder="4"
                value={car.seating_capacity}
                onChange={(e) =>
                  setCar({
                    ...car,
                    seating_capacity: e.target.value,
                  })
                }
                className="w-full mt-2 bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 font-medium">
              Location
            </label>
            <div className="relative">
              <select
                value={car.location}
                onChange={(e) => setCar({ ...car, location: e.target.value })}
                className="w-full mt-2 appearance-none bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white"
              >
                <option value="">Select Location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Chennai">Chennai</option>
              </select>
              <HiChevronDown className="absolute right-4 top-[58%] -translate-y-1/2 text-gray-400 pointer-events-none text-lg " />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              required
              placeholder="Describe engine performance, luxury features, comfort and driving experience..."
              value={car.description}
              onChange={(e) =>
                setCar({
                  ...car,
                  description: e.target.value,
                })
              }
              className="w-full mt-2 bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 outline-none transition-all duration-300 text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="group flex items-center justify-center gap-3 w-fit px-6 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.35)] transition-all duration-300"
          >
            <IoCheckmarkCircle className="text-xl" />

            {isLoading ? "Listing..." : "List Your Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
