import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "../model/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "user.created" },
  async ({ event }) => {
    console.log("EVENT RECEIVED:", event.name);
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0] ?? "xyz@gmail.com",
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    // await User.create(newUser);
    await User.findOneAndUpdate(
      { clerkId: id },
      { $set: newUser },
      { upsert: true },
    );
    // todo : do somethings else
    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      profileImage: newUser.profileImage,
    });
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    // todo : do somethings else
    await deleteStreamUser(id.toString());
  },
);

export const functions = [syncUser, deleteUserFromDB];
