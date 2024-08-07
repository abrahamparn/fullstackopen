import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div>
      {notification !== null ? <div style={style}>{notification}</div> : <></>}
    </div>
  );
};

export default Notification;
