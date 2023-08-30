import { Schema, model } from "mongoose";

/* CREATE THE USER SCHEMA */
const maintenanceGarageSchema = Schema({
  name: {
    type: String,
    required: [true, "Please include garage name!"],
  },

  profession: {
    type: String,
    required: [true, "Please include garage profession!"],
  },

  //foreign keys
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cars",
    },
  ],
});

export default model("MaintenanceGarage", maintenanceGarageSchema);
