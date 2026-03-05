import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../model/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {

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
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url,
    };

    console.log("Upserting user to MongoDB:", newUser);

    await User.findOneAndUpdate(
      { clerkId: id },
      { $set: newUser },
      { upsert: true, new: true }
    );
    console.log("User upserted to MongoDB successfully");

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });

    console.log("User synced to Stream successfully");



  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {

    await connectDB();

    const { id } = event.data;

    console.log("Deleting user:", id);

    await User.deleteOne({ clerkId: id });

    console.log("User deleted from MongoDB");

    await deleteStreamUser(id.toString());


  },
);

export const functions = [syncUser, deleteUserFromDB];
