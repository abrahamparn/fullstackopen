import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../reducer/userListReducer";
import { Link } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name || user.username}</Link>{" "}
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
