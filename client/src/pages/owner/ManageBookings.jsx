import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/useAppContext";
import toast from "react-hot-toast";
import { HiChevronDown } from "react-icons/hi";

const ManageBookings = () => {
  const { currency, axios, token } = useAppContext();

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOwnerBookings();
    }
  }, [token]);

  return (
    <div className="flex-1 min-h-screen bg-[#09090b] px-4 md:px-8 lg:px-10 py-8 text-white">
      <div className="h-2 w-24 rounded-full bg-linear-to-r from-orange-400 to-orange-600 mb-4"></div>

      <Title
        title="Manage Bookings"
        subTitle="Track customer bookings, approve reservations and manage booking statuses"
      />

      <div className="max-w-6xl w-full rounded-3xl overflow-hidden border border-orange-500/10 bg-[#111111] shadow-[0_0_40px_rgba(249,115,22,0.05)] mt-8">
        <table className="w-full border-collapse text-left text-sm text-gray-300">
          <thead className="bg-white/3 text-gray-400">
            <tr>
              <th className="p-5 font-medium">Car</th>

              <th className="p-5 font-medium max-md:hidden">Date Range</th>

              <th className="p-5 font-medium">Total</th>

              <th className="p-5 font-medium max-md:hidden">Payment</th>

              <th className="p-5 font-medium text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-white/5 hover:bg-white/2 transition-all duration-300"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.car?.image}
                      alt=""
                      className="h-14 w-14 rounded-xl object-cover shadow-lg"
                    />

                    <div>
                      <p className="font-semibold text-white">
                        {booking.car?.brand} {booking.car?.model}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Luxury Booking
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-5 text-gray-300 max-md:hidden">
                  <div className="flex flex-col">
                    <span>
                      {new Date(booking.pickupDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>

                    <span className="text-xs text-gray-500">to</span>

                    <span>
                      {new Date(booking.returnDate).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </td>

                <td className="p-5 font-medium text-white">
                  {currency}
                  {booking.price.toLocaleString("en-IN")}
                </td>

                <td className="p-5 max-md:hidden">
                  <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">
                    Online
                  </span>
                </td>

                <td className="p-5">
                  {booking.status === "pending" ? (
                    <div className="relative max-w-40 mx-auto">
                      <select
                        onChange={(e) =>
                          changeBookingStatus(booking._id, e.target.value)
                        }
                        value={booking.status}
                        className="w-full appearance-none bg-[#18181b] border border-white/10 focus:border-orange-500 rounded-xl px-4 py-2.5 outline-none transition-all duration-300 text-white"
                      >
                        <option value="pending">Pending</option>

                        <option value="confirmed">Confirmed</option>

                        <option value="cancelled">Cancelled</option>
                      </select>

                      <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg" />
                    </div>
                  ) : (
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No bookings available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
