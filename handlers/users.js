const Users = require("../models/users.model");
const PWDTool = require("../utils/passwords");

const getUserFromDB = async ({ username }) => {
    try {
        const user = await Users.findOne({ where: { userName: username } })
        return user;
    } catch(error) {
      console.error(error);
      return null;
    }
};

const checkPasswordFromDB = ({ password,passwordHash, passwordSalt }) => {
    return PWDTool.validatePassword(password,passwordHash,passwordSalt);
};

module.exports = {
  getUserFromDB,
  checkPasswordFromDB,
};
