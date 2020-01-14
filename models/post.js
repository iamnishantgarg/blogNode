const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  author: { type: String, required: true },
  pic: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }]
});
module.exports = mongoose.model("Post", postSchema);
