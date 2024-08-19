import jwt from "jsonwebtoken";
import User from "../models/user.js";

// get user by jwt token
const getUserByToken = async (token) => {
  // find user
  const decoded = jwt.verify(token, "nossosecret"); // colocar no .env

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};

export default getUserByToken;
