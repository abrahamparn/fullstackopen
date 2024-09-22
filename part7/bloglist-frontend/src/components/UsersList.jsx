import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../reducer/userListReducer";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const UsersList = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name || user.username}</Link>
                </TableCell>
                <TableCell>{user.blogCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default UsersList;
