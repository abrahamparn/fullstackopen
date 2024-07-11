import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // THIS IS FOR NOTIFICAITON
  const [message, setMessage] = useState(null);
  const [httpStatus, setHttpStatus] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
    try {
      let createdNewBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdNewBlog));
      setMessage("Successfully adding new blog");
      setHttpStatus("success");
      setTimeout(() => {
        setMessage(null);
        setHttpStatus(null);
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setMessage(exception.response.data.error);
      setHttpStatus("error");
      setTimeout(() => {
        setMessage(null);
        setHttpStatus(null);
      }, 5000);
    }
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
      setMessage("Successfully logged in");
      setHttpStatus("success");
      setTimeout(() => {
        setMessage(null);
        setHttpStatus(null);
      }, 5000);
    } catch (exception) {
      setMessage(exception.response.data.error);
      setPassword("");
      setUsername("");
      setHttpStatus("error");
      setTimeout(() => {
        setMessage(null);
        setHttpStatus(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
    setUsername("");
    setPassword("");
    setMessage("Successfully logged out");
    setHttpStatus("success");
    setTimeout(() => {
      setMessage(null);
      setHttpStatus(null);
    }, 5000);
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
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
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
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Notification message={message} httpStatus={httpStatus} />
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
