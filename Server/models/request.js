import mongoose, {Schema,Types,model} from 'mongoose';

const requestSchema = new Schema(
  {
   status: {
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
   },
  
   sender: {
    type: Types.ObjectId,
    ref: "User",
    require: true,
   },
   receiver: {
    type: Types.ObjectId,
    ref: "Chat",
    require: true,
   }
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.models.Request || model("Request", requestSchema);
