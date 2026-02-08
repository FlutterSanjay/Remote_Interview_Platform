import { StreamChat } from "stream-chat";
import { ENV } from "../helper/env.js";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

export const streamClient = new StreamClient(apiKey, apiSecret); // will be used for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // will be used for chat features


export const upsertStreamUser = async (user) => {
  try {
    await chatClient.upsertUser(user);
    console.log("Stream user upserted successfully", user);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const deleteStreamUser = async (userID) => {
  try {
    await chatClient.deleteUser(userID);
    console.log("Stream user deleted successfully");
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

// add another method to generate Token
