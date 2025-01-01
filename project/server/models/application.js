const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  tancId: String,
  firstName: String,
  lastName: String,
  birthdate: Date,
  gender: String,
  email: String,
  address: String,
  greenbookImagePath: String, // Path to uploaded greenbook image
  faceImagePath: String, // Path to uploaded face image
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
});

module.exports = mongoose.model("Application", applicationSchema);
