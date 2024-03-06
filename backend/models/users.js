const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  photo: { type: String },
  FirstName: { type: String, required: true },
  lastName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  Experience: { type: String, required: true },
  Skills: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
userSchema.pre("save", async function () {
  this.Email = this.Email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 7);
});
module.exports = mongoose.model("User", userSchema);
