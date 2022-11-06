const PWDTool = require("../utils/passwords");
const PWD_CONFIG = require("../config/pwd.config");
const PWD_HISTORY_CONFIG = require("../config/pwdHistory.config");
const passwordComplexity = require("joi-password-complexity");
const crypto = require("crypto");


// MODELS:
const PasswordHistory = require('../models/passhistory.model');
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

const validatePassword = async (password, username) => {
  const res = await Users.findOne({attributes: ['passwordHash','passwordSalt'], where: {userName: username}})
  const hmac = crypto.createHmac('sha256', password).update(res.passwordSalt).digest('hex')
  if (res.passwordHash == hmac){
      return true
  } else{
      return false
  }
}

const changePassword = async (username,password) => {
  var passRes = calculateHmacAndSalt(password)
  passwordHash = passRes.hmac
  salt = passRes.salt
  await Users.update (
    {
      passwordHash: passwordHash,
      passwordSalt: salt,
    },
    {
      where: { userName: username },
    }
  )
  archivePassword(username,passwordHash,salt)
  console.log(`Password changed for '${username}'`)
};

const calculateHmacAndSalt = () => {
  //salt
  const salt = crypto.randomBytes(16).toString('hex')
  //hmac
  const hmac = crypto.createHmac('sha256', password).update(salt).digest('hex')
  return  {hmac,salt}
};

const archivePassword = async (username,passwordHash,salt) => {
  await PasswordHistory.create({
      userName: username,
      passwordHash: `${passwordHash}`,
      passwordSalt: `${salt}`,
  }).then((result) => {
      console.log(result);
  }).catch((error) => {
      console.error('Failed to create a new record : ', error);
  });
};

const isPasswordUsed = async (username, passwordHash, passwordSalt) => {
  const results = await PasswordHistory.findAll(
    {
      attributes: ['passwordHash','passwordSalt'],
      where: {
        userName: username
      },
      order: ['created', 'DESC'],
      limit: PWD_HISTORY_CONFIG.history
    }
  )
  try{
      results.forEach(it => {if (validatePassword(password,passwordHash,passwordSalt)) throw 'used' });    
  } catch (e){
      if (e === 'used') return false
  }
  return true
}

const isPasswordComplexed = (password) => {
  return true
  var passwordValidation = passwordComplexity(PWD_CONFIG).validate(password)
  if(passwordValidation.hasOwnProperty('error')) return false
  else return true    
}

const isPendingPasswordReset = async (username) => {
  // VALIDATE
  var results = databaseConnection.query(`SELECT userName FROM forgetPassword WHERE userName = '${username}'`)
  if(results.length != 0) return true
  else return false
}

module.exports = {
  getUserFromDB,
  checkPasswordFromDB,
  getUserByIDFromDB,
  getAllUsersFromDB,
  changePassword,
  isPasswordUsed,
  isPasswordComplexed,
  isPendingPasswordReset,
};
