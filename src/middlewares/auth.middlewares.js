import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("Authorization token is required");
    }

    const token = authorization.split(" ")[1];
    const secretKey = process.env.SECRET_KEY_FOR_TOKEN;
    const decodedPayload = jwt.verify(token, secretKey);

    const { id, fullName, email } = decodedPayload;
    const user = await User.findById(id).select(id);
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export default auth;
