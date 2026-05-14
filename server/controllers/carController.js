import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate(
      "ratings.user",
      "name",
    );

    if (!car) {
      return res.json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      car,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({ success: true, cars });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addCarReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const carId = req.params.id;
    const { rating, review } = req.body;

    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    const alreadyReviewed = car.ratings.find(
      (r) => r.user.toString() === userId.toString(),
    );

    if (alreadyReviewed) {
      return res.json({
        success: false,
        message: "You already reviewed this car",
      });
    }

    const booking = await Booking.findOne({
      user: userId,
      car: carId,
      status: "confirmed",
    });

    if (!booking) {
      return res.json({
        success: false,
        message: "You can review only after confirmed booking",
      });
    }

    car.ratings.push({
      user: userId,
      rating,
      review,
    });

    car.numReviews = car.ratings.length;

    car.avgRating =
      car.ratings.reduce((acc, item) => acc + item.rating, 0) / car.numReviews;

    await car.save();

    await car.populate("ratings.user", "name");

    res.json({
      success: true,
      message: "Review added",
      car,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const searchCars = async (req, res) => {
  try {
    const { brand, maxPrice, category } = req.body;

    const filter = {};

    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (maxPrice) {
      filter.pricePerDay = { $lte: maxPrice };
    }

    const cars = await Car.find(filter);

    res.json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
