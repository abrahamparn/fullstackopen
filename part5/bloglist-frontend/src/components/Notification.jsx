import React from "react";
import PropTypes from "prop-types";
const Notification = ({ message, httpStatus }) => {
  if (httpStatus === null) {
    return null;
  }

  const notificationStyle = {
    color: httpStatus === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
