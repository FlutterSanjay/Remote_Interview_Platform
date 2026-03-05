import { chatClient, streamClient } from "../config/stream.js";
import Session from "../model/Session.js";

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

const getActiveSession = async (_, res) => {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      sessions,
    });
  } catch (e) {
    console.error("Error fetching active session:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMyRecentSessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const recentSession = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ recentSession });
  } catch (e) {
    console.log("Error in getMyRecentSessions controller :", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) {
      return res.status(400).json({ message: "Session not found" });
    }
    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller :", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(400).json({ message: "Session not found" });
    }

    if (session.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot join a complete session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host cannot join their own session as participant" });
    }

    // check if the session is already joined by someone else
    if (session.participant) {
      return res.status(409).json({ message: "Session is already joined" });
    }
    session.participant = userId;
    await session.save();

    // add the participant to the stream video call

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in joinSession controller :", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    // check if user is the host
    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session" });
    }

    // check if the session is already completed
    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    // delete stream video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    //delete stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller :", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createSession,
  getActiveSession,
  getMyRecentSessions,
  getSessionById,
  joinSession,
  endSession,
};
