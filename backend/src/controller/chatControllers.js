import { chatClient } from "../config/stream.js";

const getStreamToken = async (req, res) => {
  try {
    // use clerkId as Stream (not mongodb _id) => It should match the id we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId.toString());
    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getStreamToken };
