const Blog = require("../models/blog.model");

const initialBlog = [
  {
    title: "On my way to riches",
    author: "Abraham Naiborhu",
    url: "https://nothing.com",
    likes: 500,
  },
  {
    title: "Not the best of the world",
    author: "T. R. J.",
    url: "https://not_nothing.com",
    likes: 300,
  },
  {
    title: "How could it be so hard?",
    author: "Abraham P. N.",
    url: "https://nothingnothing.com",
    likes: 100,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlog,
  blogsInDb,
};
