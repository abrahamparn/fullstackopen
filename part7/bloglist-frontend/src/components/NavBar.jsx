import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {user ? (
        <span>
          {user.username} logged in
          <button onClick={handleLogout}>Logout</button>
        </span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
