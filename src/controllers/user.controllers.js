import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

// creating JWT token for user
const createToken = (payload) => {
  const secretKey = process.env.SECRET_KEY_FOR_TOKEN;
  const token = jwt.sign(payload, secretKey, { expiresIn: "3d" });
  return token;
};

// CREATE user, signup and create token
const userSignupHandler = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.signup(fullName, email, password);
    const payloadForSigningToken = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const token = createToken(payloadForSigningToken);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// verify user and login
const userLoginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const payloadForSigningToken = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const token = createToken(payloadForSigningToken);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// logout user
const userLogoutHandler = async (req, res) => {};

export { userSignupHandler, userLoginHandler, userLogoutHandler };
