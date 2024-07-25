import { createContext, useContext, useReducer } from "react";

const notificationReudcer = (state, action) => {
  switch (action.type) {
    case "NOTIF":
      return action.payload;
    default:
      return null;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReudcer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const notificationDispatch = useNotificationDispatch();

  const setNotification = (message, timeout = 5000) => {
    notificationDispatch({ type: "NOTIF", payload: message });
    setTimeout(() => {
      notificationDispatch({ type: null });
    }, timeout);
  };

  return { setNotification };
};

export default NotificationContext;
