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

const App = () => {
  //DISPATCH
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const hookUserStorage = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  };

  useEffect(hookUserStorage, []);
  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlog(blogObject));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUsername("");
      setPassword("");

      dispatch(setNotification("Successfully logged in", "success", 5000));
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, "error", 5000));
      setPassword("");
      setUsername("");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
    setUsername("");
    setPassword("");
    dispatch(setNotification("Successfully logged out", "success", 5000));
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
    console.log("tyring", "trying");
    if (!confirm("Are you sure you want to delete this?")) {
      return;
    }
    dispatch(removeBlog(id));
  };

  const blogList = () => {
    console.log({ TheUserIdOfCurrentLogin: user.userId });
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteBlog={handleDeleteBlog}
            theCurrentUserId={user.userId}
          />
        ))}
      </div>
    );
  };

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
