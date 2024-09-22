import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return null;
  }

  return (
    <Alert severity={notification.type || "info"} sx={{ margin: 2 }}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
