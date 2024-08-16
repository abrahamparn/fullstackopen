import React from "react";
import { useSelector, useDispatch } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });
  if (notification.httpStatus === null) {
    return null;
  }

  const notificationStyle = {
    color: notification.httpStatus === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={notificationStyle} data-testid="notification">
      {notification.message}
    </div>
  );
};

export default Notification;
