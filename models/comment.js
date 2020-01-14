const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postedBy: {
    type: String,
    required: true
  },
  content: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, required: true }
});
module.exports = mongoose.model("Comment", commentSchema);
