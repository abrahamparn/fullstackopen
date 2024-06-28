const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
