import React from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const Home = ({ blogFormRef, handleCreateNewBlog }) => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} userId={user.userId} />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          theCurrentUserId={user?.userId} // Safe access to userId
        />
      ))}
    </div>
  );
};

export default Home;
