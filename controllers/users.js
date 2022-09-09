const Users = require("../models/users.model");


const getUserFromDB = async ({ username }) => {
    try {
        const user = await Users.findOne({ where: { userName: username } })
        return user;
    } catch(error) {
      console.error(error);
      return null;
    }
};

module.exports = {
  getUserFromDB,
};
