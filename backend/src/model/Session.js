import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      require: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      require: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    // stream video call ID
    callId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Session = mongoose.model("Session", SessionSchema);

export default Session;
