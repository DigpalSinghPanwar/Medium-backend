const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
      min: 4,
      max: 100,
    },
    content: {
      type: String,
      required: [true, "Please enter content"],
      min: 4,
      max: 10000,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to User
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: true, toObject: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
