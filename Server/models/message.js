import { Schema, Schema, Types, model, models } from "mongoose";

const Schema = new Schema(
  {
   sender: {
    type: Types.ObjectId,
    ref: "User",
   },
   chat: {
    type: Types.ObjectId,
    ref: "Chat",
   }
  },
  {
    timestamps: true,
  }
);

export const Chat = models.Chat || model("Chat", Schema);
