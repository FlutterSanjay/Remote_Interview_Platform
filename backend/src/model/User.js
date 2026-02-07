import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      unique: true,
      require: true,
    },
  },
  { timestamps: true }, // CreatedAt, updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
