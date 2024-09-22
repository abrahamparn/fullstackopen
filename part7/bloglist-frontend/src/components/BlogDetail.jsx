import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducer/blogReducer";
import { setNotification } from "../reducer/notificationReducer";

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
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </div>
      <div>Added by {blog.user.name || blog.user.username}</div>
      {user && blog.user.id === user.userId && <button onClick={handleDelete}>Delete Blog</button>}

      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Add Comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>- {comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default BlogDetail;
