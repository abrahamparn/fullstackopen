import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducer/blogReducer";
import { setNotification } from "../reducer/notificationReducer";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogsService.getById(id);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Failed to fetch blog", error);
        setError("Blog not found");
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Loading blog data...</div>;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(removeBlog(blog.id));
      dispatch(setNotification("Blog deleted", "success", 5000));
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      dispatch(setNotification("Comment cannot be empty", "error", 5000));
      return;
    }
    try {
      const updatedBlog = await blogsService.addComment(blog.id, comment.trim());
      setBlog(updatedBlog);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
      dispatch(setNotification("Failed to add comment", "error", 5000));
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {blog.title} by {blog.author}
      </Typography>
      <Typography variant="body1" paragraph>
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography variant="body1">
        {blog.likes} likes{" "}
        <Button variant="contained" color="primary" onClick={handleLike}>
          Like
        </Button>
      </Typography>
      <Typography variant="body1" paragraph>
        Added by {blog.user.name || blog.user.username}
      </Typography>
      {user && blog.user.id === user.userId && (
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete Blog
        </Button>
      )}
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h5" component="h2" gutterBottom>
        Comments
      </Typography>
      <form onSubmit={handleCommentSubmit}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          margin="normal"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 1 }}>
          Add Comment
        </Button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <List>
          {blog.comments.map((comment, index) => (
            <Paper key={index} sx={{ padding: 1, marginY: 1 }}>
              <ListItem>
                <ListItemText primary={comment} />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No comments yet.</Typography>
      )}
    </Container>
  );
};
export default BlogDetail;
