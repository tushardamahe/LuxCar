import { razorpay } from "../configs/razorpay.js";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

export const createOrder = async (req, res) => {
  try {
    const amount = 500;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const carData = await Car.findById(bookingData.car);

      if (!carData) {
        return res.json({
          success: false,
          message: "Car not found",
        });
      }

      const booking = await Booking.create({
        car: bookingData.car,
        user: bookingData.user,
        userEmail: bookingData.userEmail,
        pickupDate: bookingData.pickupDate,
        returnDate: bookingData.returnDate,

        owner: carData.owner,
        price: carData.pricePerDay,

        paymentId: razorpay_payment_id,
        status: "pending",
      });

      return res.json({
        success: true,
        message: "Booking created successfully",
        booking,
      });
    }

    return res.json({
      success: false,
      message: "Invalid signature",
    });
  } catch (error) {
    console.log("VERIFY ERROR:", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
