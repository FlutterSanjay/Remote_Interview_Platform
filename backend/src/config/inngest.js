import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../model/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      console.log("EVENT RECEIVED:", event.name);
      console.log("EVENT DATA:", JSON.stringify(event.data, null, 2));

      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;

      if (!id) {
        throw new Error("No user id in event data");
      }

      const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address ?? "xyz@gmail.com",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url,
      };

      console.log("Saving user to MongoDB:", newUser);

      await User.findOneAndUpdate(
        { clerkId: id },
        { $set: newUser },
        { upsert: true, new: true },
      );

      console.log("User saved to MongoDB successfully");

      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });

      console.log("User synced to Stream successfully");

      return { success: true, clerkId: id };
    } catch (error) {
      console.error("Error in syncUser function:", error);
      throw error; // re-throw so Inngest marks the run as failed
    }
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;

      console.log("Deleting user:", id);

      await User.deleteOne({ clerkId: id });

      console.log("User deleted from MongoDB");

      await deleteStreamUser(id.toString());

      console.log("User deleted from Stream");

      return { success: true, clerkId: id };
    } catch (error) {
      console.error("Error in deleteUserFromDB function:", error);
      throw error;
    }
  },
);

export const functions = [syncUser, deleteUserFromDB];
