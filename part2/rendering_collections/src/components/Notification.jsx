const Notification = ({ TheMessage }) => {
  if (TheMessage === undefined || TheMessage === null) {
    return null;
  }
  console.log(TheMessage);

  return <div className="error">{TheMessage}</div>;
};

export default Notification;
