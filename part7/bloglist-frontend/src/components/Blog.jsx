import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeBlog } from "../reducer/blogReducer";
const Blog = ({ blog, handleDeleteBlog, theCurrentUserId }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    console.log("the Visibility: ", visible);
    setVisible(!visible);
  };

  const handleAddLike = (event) => {
    event.preventDefault();

    dispatch(likeBlog(blog));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogItem">
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>View Detail</button>
      {visible && (
        <>
          <div>
            {blog.url}
            <br />
            {blog.likes} <button onClick={handleAddLike}>Like</button>
            <br />
            {blog.user.username}
          </div>
          {blog.user.id === theCurrentUserId && (
            <button onClick={() => handleDeleteBlog(blog.id)}>
              Delete Blog
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
