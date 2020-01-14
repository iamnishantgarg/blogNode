const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2012/04/01/17/43/boy-23714_960_720.png"
  }
});
module.exports = mongoose.model("User", userSchema);
