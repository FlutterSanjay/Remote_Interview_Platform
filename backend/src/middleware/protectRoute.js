import { requireAuth } from "@clerk/express";
import User from "../model/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;

      if (!clerkId) {
        return res
          .status(401)
          .json({ message: "Unauthorized - invalid token" });
      }
      const user = await User.findOne({ clerkId });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - user not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];
