const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  let favoriteBlogName;
  let counting = 0;

  blogs.forEach((blog) => {
    if (blog.likes > counting) {
      counting = blog.likes;
      favoriteBlogName = blog;
    }
  });
  return favoriteBlogName;
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, "author");
  const maxBlogs = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: maxBlogs,
    blogs: authorCounts[maxBlogs],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
