import { Schema, model } from "mongoose";

/* CREATE THE USER SCHEMA */
const carSchema = Schema({
  manufacturer: {
    type: String,
    required: [true, "Please include manufacturer name!"],
  },

  model: {
    type: String,
    required: [true, "Please provide car model!"],
  },

  year: {
    type: Number,
    required: [true, "Please provide the year your car has been manufactured!"],
  },

  color: {
    type: String,
    required: [true, "Please provide your car's color!"],
  },

  fuelType: {
    type: String,
    required: [true, "Please provide your car's fuel type!"],
  },

  transmition: {
    type: String,
    required: [true, "Please provide your car's transmition mode!"],
    enum: ["manual", "automatic", "SMG"],
  },

  price: {
    type: Number,
    required: [true, "Please provide your car price!"],
  },

  images: [
    {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],

  //foreign keys
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  garages: [
    {
      type: Schema.Types.ObjectId,
      ref: "MaintenanceGarage",
    },
  ],
});

// populating the user name and image
carSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name image",
  });
  next();
});

export default model("Car", carSchema);
