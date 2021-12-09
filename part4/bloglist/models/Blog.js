const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2, maxLength: 64 },
  author: { type: String, required: true, minLength: 2, maxLength: 24 },
  url: { type: String, required: true, minLength: 2, maxLength: 24 },
  likes: { type: Number, max: 1000 * 1000 * 1000 },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
