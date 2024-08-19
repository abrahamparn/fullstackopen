import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const newBlogs = await blogsService.getAll();
      dispatch(setBlogs(newBlogs));
    } catch (error) {
      dispatch(setNotification("Cannot set Blog at the moment", "error", 5000));
    }
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.create(blog);
      dispatch(addBlog(newBlog));
      dispatch(setNotification("Successfully added new blog", "success", 5000));
    } catch (error) {
      console.error(error); // Log the error to the console
      dispatch(
        setNotification(
          "Failed to add new blog: " + error.message,
          "error",
          5000
        )
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      let response = await blogsService.doDelete(id);
      console.log(response);
      dispatch(deleteBlog(id));
      dispatch(setNotification("Successfully deleted blog", "success", 5000));
    } catch (error) {
      dispatch(
        setNotification("Fail in deleting: " + error.message, "error", 5000)
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const response = await blogsService.put(updatedBlog);
      dispatch(updateBlog(response));
    } catch (error) {
      dispatch(
        setNotification("Fail in liking: " + error.message, "error", 5000)
      );
    }
  };
};

export default blogSlice.reducer;
