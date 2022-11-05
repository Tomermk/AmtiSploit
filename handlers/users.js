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

const getUserByIDFromDB = async ( id ) => {
  try {
      const user = await Users.findOne({ attributes: ['id','username','lastName','firstName','emailAddress','userRole','createdAt','updatedAt'], where: { id: id } })
      return user;
  } catch(error) {
    console.error(error);
    return null;
  }
};

const getAllUsersFromDB = async () => {
  try {
      return await Users.findAll({attributes: ['id','username','lastName','firstName','emailAddress','userRole','createdAt','updatedAt']})
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
  getUserByIDFromDB,
  getAllUsersFromDB,
};
