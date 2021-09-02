const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
  author: {
    type: String,
    default: "Anonyme",
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
})

const PostSchema = Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [CommentSchema],
})

module.exports = model("Post", PostSchema)
