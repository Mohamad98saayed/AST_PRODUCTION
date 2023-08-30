import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

/* CREATE THE USER SCHEMA */
const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
  },

  email: {
    type: String,
    required: [true, "Please provide you eamil!"],
    unique: [true, "This email is already in use!"],
    validate: {
      validator: function (input) {
        return validator.isEmail(input);
      },
      message: "Please enter a valid email!",
    },
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minLength: 8,
    maxLength: 255,
  },

  image: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

/* DOCUMENT MIDDLEWARE TO HASH PASSWORD WHEN SIGNUP */
userSchema.pre("save", async function (next) {
  //hashing the passowrd
  this.password = await bcrypt.hash(this.password, 12);

  //setting the email to lower case
  this.email = this.email.toLowerCase();

  //capitalizing the name
  this.name = this.name?.toLowerCase();
  this.name = this.name?.replace(/\b\w/g, (l) => l.toUpperCase());

  next();
});

/* DOCUMENT METHOD TO COMPARE PASSWORDS WHEN SIGNIN */
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);
