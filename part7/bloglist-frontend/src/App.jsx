import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, createNewBlog } from "./reducer/blogReducer";
import { initializeUser, logoutUser } from "./reducer/loginReducer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notification from "./components/Notification";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";
import BlogDetail from "./components/BlogDetail";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const handleCreateNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlog(blogObject));
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <Router>
      <div>
        <NavBar user={user} handleLogout={handleLogout} />

        <Notification />

        <Routes>
          <Route
            path="/"
            element={
              user === null ? (
                <LoginForm />
              ) : (
                <Home blogFormRef={blogFormRef} handleCreateNewBlog={handleCreateNewBlog} />
              )
            }
          />
          <Route path="/users" element={user === null ? <LoginForm /> : <Users />} />
          <Route path="/users/:id" element={user === null ? <LoginForm /> : <UserDetail />} />
          <Route path="/blogs/:id" element={user === null ? <LoginForm /> : <BlogDetail />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
