import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // THIS IF FOR BLOG
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

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
  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    console.log("user", user);
    console.log("userId", user.userId);
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes,
      userId: user.userId,
    };
    try {
      let createdNewBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdNewBlog));
      setLikes("");
      setUrl("");
      setAuthor("");
      setTitle("");
    } catch (exception) {
      console.log("failure in creating blog", exception);
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
      console.log("logged in", user);
    } catch (exception) {
      console.log("error", exception);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
    setUsername("");
    setPassword("");
    console.log("Logged out", user);
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLikesChange = (event) => {
    setLikes(event.target.value);
  };

  const blogForm = () => (
    <form onSubmit={handleCreateNewBlog}>
      <h2>Create New Blog</h2>
      <div>
        Title: <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        Author:{" "}
        <input type="text" value={author} onChange={handleAuthorChange} />
      </div>
      <div>
        Url: <input type="text" value={url} onChange={handleUrlChange} />
      </div>
      <div>
        Likes:{" "}
        <input type="number" value={likes} onChange={handleLikesChange} />
      </div>
      <div>
        <button>SAVE BLOG</button>
      </div>
    </form>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username}</p>

          {logoutForm()}
          <br />
          {blogForm()}
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
