const orderBy = require("lodash/orderBy");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favorite = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.length === 0
    ? 0
    : blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const most = orderBy(blogs, ["blogs"], ["desc"])[0];

  return blogs.length === 0
    ? 0
    : {
        author: most.author,
        blogs: most.blogs,
      };
};

const mostLikes = (blogs) => {
  const most = orderBy(blogs, ["likes"], ["desc"])[0];

  return blogs.length === 0
    ? 0
    : {
        author: most.author,
        likes: most.likes,
      };
};

module.exports = {
  dummy,
  totalLikes,
  favorite,
  mostBlogs,
  mostLikes,
};
