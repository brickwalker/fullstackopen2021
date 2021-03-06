const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 128 },
  author: { type: String, required: true, minLength: 2, maxLength: 64 },
  url: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 128,
    unique: true,
  },
  likes: { type: Number, default: 0, max: 1000 * 1000 * 1000 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
});

blogSchema.plugin(uniqueValidator);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
