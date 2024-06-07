const Notification = ({ TheMessage }) => {
  if (TheMessage === undefined || TheMessage === null) {
    return null;
  }
  console.log(TheMessage);

  return (
    <div className={`${TheMessage.status === "red" ? "red" : "green"}`}>
      {TheMessage.message}
    </div>
  );
};

export default Notification;
