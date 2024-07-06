const User = require("../models/user.model");

const userInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  userInDb,
};
