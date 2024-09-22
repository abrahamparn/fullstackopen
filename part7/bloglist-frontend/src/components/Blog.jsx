import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, Divider } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <>
      <ListItem button component={Link} to={`/blogs/${blog.id}`}>
        <ListItemText primary={blog.title} secondary={`by ${blog.author}`} />
      </ListItem>
      <Divider />
    </>
  );
};

export default Blog;
