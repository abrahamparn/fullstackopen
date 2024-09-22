// components/UserDetail.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userListService from "../services/userList";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams(); // Get the user ID from the URL params

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await userListService.getUserById(id);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading user data...</div>; // Conditional rendering
  }

  return (
    <div>
      <h2>{user.name || user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
