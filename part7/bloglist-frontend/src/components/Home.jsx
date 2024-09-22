import React from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Container, Typography, List } from "@mui/material";

const Home = ({ blogFormRef, handleCreateNewBlog }) => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateNewBlog} userId={user.userId} />
      </Togglable>
      <Typography variant="h4" component="h1" gutterBottom>
        Blogs
      </Typography>
      <List>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </List>
    </Container>
  );
};

export default Home;
