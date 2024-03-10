import {Schema, model} from "mongoose";

const CommentSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
}, {timestamps: true})

export default model("Comment", CommentSchema)