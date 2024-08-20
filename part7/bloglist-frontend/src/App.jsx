import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setNotification } from "./reducer/notificationReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, createNewBlog, removeBlog } from "./reducer/blogReducer";
import { initializeUser, loginUser, logoutUser } from "./reducer/loginReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlog(blogObject));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    setUsername("");
    setPassword("");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
        />
      </div>
      <div>
        <button type="submit">LOGIN</button>
      </div>
    </form>
  );

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">LOGOUT</button>
    </form>
  );

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) {
      return;
    }
    dispatch(removeBlog(id));
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDeleteBlog={handleDeleteBlog}
          theCurrentUserId={user?.userId} // Safe access to userId
        />
      ))}
    </div>
  );

  return (
    <div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username}</p>
          {logoutForm()}
          <br />
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateNewBlog} userId={user.userId} />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
