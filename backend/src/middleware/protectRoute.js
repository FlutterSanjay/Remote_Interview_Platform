import { getAuth } from "@clerk/express";
import User from "../model/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - invalid token" });
    }
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("🔥 Error in protectRoute middleware:", error.message || error);
    console.error(error.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
};
