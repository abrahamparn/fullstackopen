import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsService from "../services/blogs";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducer/blogReducer";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogsService.getById(id);
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Failed to fetch blog", error);
      }
    };

    fetchBlog();
  }, [id]);

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
      <button onClick={handleDelete}>Delete Blog</button>
    </div>
  );
};

export default BlogDetail;
