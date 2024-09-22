import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userListService from "../services/userList";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

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
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {user.name || user.username}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Added blogs
      </Typography>
      {user.blogs && user.blogs.length > 0 ? (
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id} button component={Link} to={`/blogs/${blog.id}`}>
              <ListItemText primary={blog.title} secondary={`by ${blog.author}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No blogs added.</Typography>
      )}
    </Container>
  );
};

export default UserDetail;
