import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/useAppContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  const [canReview, setCanReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    user,
    navigate,
    axios,
    currency,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    setShowLogin,
  } = useAppContext();

  const getDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalDays = getDays();
  const totalPrice = totalDays * (car?.pricePerDay || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please Login First");
      setShowLogin(true);
      return;
    }

    const { data } = await axios.post("/api/payment/create-order");

    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      order_id: data.order.id,
      handler: async (response) => {
        const verifyPayment = await axios.post("/api/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingData: {
            car: id,
            pickupDate,
            returnDate,
            user: user?._id,
          },
        });

        if (verifyPayment.data.success) {
          toast.success("Booking confirmed!");
          navigate("/my-bookings");
        }
      },
    });

    rzp.open();
  };

  const submitReview = async () => {
    if (!rating) return toast.error("Please select rating");

    const { data } = await axios.post(`/api/cars/${id}/review`, {
      rating,
      review: comment,
    });

    if (data.success) {
      toast.success("Review added");
      setCar(data.car);
      setRating(0);
      setComment("");
      setCanReview(false);
    }
  };

  const fetchCar = async () => {
    const { data } = await axios.get(`/api/cars/${id}`);
    if (data.success) setCar(data.car);
  };

  const checkReviewPermission = async () => {
    const { data } = await axios.get(`/api/bookings/can-review/${id}`);
    if (data.success) setCanReview(data.canReview);
  };

  useEffect(() => {
    fetchCar();
    checkReviewPermission();
  }, [id]);

  return car ? (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-20 max-w-7xl mx-auto text-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-neutral-400 hover:text-primary transition"
      >
        <img src={assets.arrow_icon} className="rotate-180 opacity-60" />
        Back to All Cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-10">
          <img src={car.image} className="w-full rounded-xl shadow-lg" />

          <div>
            <h1 className="text-3xl font-semibold">
              {car.brand} {car.model}
            </h1>
            <p className="text-neutral-400 text-lg">
              {car.category} • {car.year}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
            {[
              {
                icon: assets.users_icon,
                text: `${car.seating_capacity} Seats`,
              },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center bg-[#1c1c1e]/80 p-4 rounded-lg border border-neutral-800"
              >
                <img src={item.icon} className="h-5 mb-2 icon-orange" />
                {item.text}
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-medium mb-2">Description</h2>
            <p className="text-neutral-400">{car.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Reviews ({car.numReviews || 0})
            </h2>

            {car.ratings?.length === 0 && (
              <p className="text-neutral-400">No reviews yet</p>
            )}

            <div className="space-y-6">
              {car.ratings?.map((review, index) => (
                <div key={index} className="border-b border-neutral-800 pb-4">
                  <div className="flex justify-between">
                    <p>{review.user?.name}</p>
                    <div className="text-yellow-400">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                  <p className="text-neutral-400 mt-2">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 self-start sticky top-20 max-h-[80vh] overflow-y-auto p-7 rounded-2xl space-y-7  bg-[#1c1c1e]/80 border border-neutral-800 shadow-lg"
        >
          <div>
            <p className="text-neutral-400 text-sm">Price</p>
            <h2 className="text-3xl font-bold text-primary">
              {currency} {car.pricePerDay}
              <span className="text-sm text-neutral-400"> /day</span>
            </h2>
          </div>

          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full border border-neutral-700 bg-transparent text-white px-3 py-2 rounded-lg"
          />

          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full border border-neutral-700 bg-transparent text-white px-3 py-2 rounded-lg"
          />

          <button className="w-full bg-primary py-3 rounded-xl text-white font-semibold">
            Book Now
          </button>

          <div className="border-t border-neutral-800 pt-4 text-sm space-y-2">
            <div className="flex justify-between text-neutral-400">
              <span>Price/day</span>
              <span>
                {currency}
                {car.pricePerDay}
              </span>
            </div>

            <div className="flex justify-between text-neutral-400">
              <span>Total days</span>
              <span>{totalDays}</span>
            </div>

            <div className="flex justify-between text-white font-medium">
              <span>Total</span>
              <span className="text-primary">
                {currency}
                {totalPrice}
              </span>
            </div>
          </div>

          <div className="text-xs text-neutral-500 text-center">
            Secure payment via Razorpay
          </div>
        </form>
      </div>

      {canReview && (
        <div className="mt-16 p-6 rounded-xl bg-[#1c1c1e]/80 border border-neutral-800">
          <h3 className="mb-4">Write Review</h3>

          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className="text-xl text-yellow-400 cursor-pointer"
              >
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-neutral-700 bg-transparent text-white p-3 rounded mb-4"
          />

          <button
            onClick={submitReview}
            className="bg-primary px-5 py-2 rounded text-white"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
