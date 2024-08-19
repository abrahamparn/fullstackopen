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
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

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

export default blogSlice.reducer;
