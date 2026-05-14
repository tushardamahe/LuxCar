import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        review: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    avgRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Car = mongoose.model("Car", carSchema);

export default Car;
