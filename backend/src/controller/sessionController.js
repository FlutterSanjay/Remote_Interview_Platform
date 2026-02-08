import { chatClient, streamClient } from "../config/stream.js";

const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and Difficult are required" });
    }
    // generate the unique call id
    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // create session in db
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    // create stream video call with the same callId and add custom data (sessionId, problem, difficulty) to it
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId.toString(),
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // chat messaging

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId.toString(),
      members: [clerkId.toString()],
    });
    await channel.create();

    res.status(201).json({
      message: "Session created successfully",
      sessionId: session._id,
    });
  } catch (e) {
    console.error("Error creating session:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getActiveSession = async (req, res) => {
  try {
  } catch (e) {
    console.error("Error fetching active session:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyRecentSessions = async (req, res) => {};

const getSessionById = async (req, res) => {};

const joinSession = async (req, res) => {};

const endSession = async (req, res) => {};

export {
  createSession,
  getActiveSession,
  getMyRecentSessions,
  getSessionById,
  joinSession,
  endSession,
};
