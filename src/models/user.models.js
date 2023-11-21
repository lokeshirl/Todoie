import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// signup method
userSchema.statics.signup = async function (fullName, email, password) {
  if (!fullName || !email || !password) {
    throw new Error("All fields are required!");
  }

  if (validator.isEmpty(fullName) || fullName.length < 3) {
    throw new Error("Please enter your name");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }

  const userExist = await this.findOne({ email });
  if (userExist) {
    throw new Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ fullName, email, password: hashPassword });

  return user;
};

// login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email!");
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!matchedPassword) {
    throw new Error("Invalid password");
  }

  return user;
};

const User = model("User", userSchema);

export default User;
