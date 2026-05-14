import { useState, useEffect } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/useAppContext";
import toast from "react-hot-toast";

import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

import { FaRegListAlt } from "react-icons/fa";

import { IoCarSportOutline } from "react-icons/io5";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: IoCarSportOutline,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: FaRegListAlt,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: FiAlertCircle,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: FiCheckCircle,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");

      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="flex-1 min-h-screen bg-[#09090b] px-4 md:px-8 lg:px-10 py-8 text-white">
      <div className="h-2 w-24 rounded-full bg-linear-to-r from-orange-400 to-orange-600 mb-4"></div>

      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including cars, bookings, revenue and customer activities"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="group bg-[#111111] border border-orange-500/10 rounded-2xl p-5 hover:border-orange-500/30 hover:shadow-[0_0_25px_rgba(249,115,22,0.12)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{card.title}</p>

                <h1 className="text-3xl font-bold mt-2 text-white">
                  {card.value}
                </h1>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                <card.icon className="text-2xl text-orange-500 group-hover:text-white transition-all duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 bg-[#111111] border border-orange-500/10 rounded-2xl p-5 md:p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-white">
              Recent Bookings
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Latest customer bookings and activity
            </p>
          </div>

          <div className="space-y-4">
            {data.recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex w-12 h-12 rounded-xl bg-orange-500/10 items-center justify-center">
                    <FaRegListAlt className="text-orange-500 text-lg" />
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {booking.car.brand} {booking.car.model}
                    </p>

                    <p className="text-sm text-gray-400">
                      {booking.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-semibold text-white">
                    {currency}
                    {booking.price.toLocaleString("en-IN")}
                  </p>

                  <p
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      booking.status === "confirmed"
                        ? "bg-green-500/15 text-green-400"
                        : booking.status === "pending"
                          ? "bg-yellow-500/15 text-yellow-400"
                          : "bg-gray-500/15 text-gray-300"
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full xl:max-w-sm rounded-2xl overflow-hidden bg-linear-to-br from-orange-500 to-orange-700 p-6 shadow-[0_0_40px_rgba(249,115,22,0.25)]">
          <div>
            <p className="text-orange-100 text-sm uppercase tracking-widest">
              Revenue
            </p>

            <h1 className="text-2xl font-semibold mt-2">Monthly Revenue</h1>

            <p className="text-orange-100 mt-2 text-sm">
              Current month performance overview
            </p>
          </div>

          <div className="mt-10">
            <h1 className="text-5xl font-bold">
              {currency}
              {data.monthlyRevenue.toLocaleString("en-IN")}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
