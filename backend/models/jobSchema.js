const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  filterTitle: { type: String },
  title: { type: String },
  jobAddress: { type: String }, 
  description: { type: String },
  salary: { type: Number },
  photo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("Job", jobSchema);
