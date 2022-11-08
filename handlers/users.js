const PWDTool = require("../utils/passwords");
const PWD_CONFIG = require("../config/pwd.config");
const PWD_HISTORY_CONFIG = require("../config/pwdHistory.config");
const passwordComplexity = require("joi-password-complexity");
const crypto = require("crypto");


// MODELS:
const PasswordHistory = require('../models/passhistory.model');
const Users = require("../models/users.model");


const getUserFromDB = async (username) => {
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

const validatePassword = async (username,password ) => {
  const res = await Users.findOne({attributes: ['passwordHash','passwordSalt'], where: {userName: username}})
  const hmac = crypto.createHmac('sha256', password).update(res.passwordSalt).digest('hex')
  return validatePasswordHashAndSalt(password,res.passwordHash,res.passwordSalt)
}

const validatePasswordHashAndSalt =  (password,passwordHash,passwordSalt ) => {
  const hmac = crypto.createHmac('sha256', password).update(passwordSalt).digest('hex')
  if (passwordHash == hmac){
      return true
  } else{
      return false
  }
}

const changePasswordInDB = async (username,password) => {
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
  await archivePassword(username,passwordHash,salt)
  console.log(`Password changed for '${username}'`)
};

const calculateHmacAndSalt = (password) => {
  //salt
  const salt = crypto.randomBytes(16).toString('hex')
  //hmac
  const hmac = crypto.createHmac('sha256', password).update(salt).digest('hex')
  return  {hmac,salt}
};

const archivePassword = async (username,passwordHash,salt) => {
  await PasswordHistory.create({
      userName: username,
      passwordHash: passwordHash,
      passwordSalt: salt,
  })
};

const isPasswordUsed = async (username,password) => {
  try{
    console.log("Username in password is used: ",username);
    const results = await PasswordHistory.findAll(
      {
        attributes: ['passwordHash','passwordSalt'],
        where: {
          userName: username
        },
        order: [['createdAt', 'DESC']],
        limit: PWD_HISTORY_CONFIG.history
      }
    )
    results.forEach( it => {
      if ( validatePasswordHashAndSalt(password,it.passwordHash,it.passwordSalt)) throw 'used' 
    });
    return false
  } catch (error){
    console.log(error)
    if (error === 'used') return true
  }
  
}

const isPasswordComplexed = (password) => {
  var passwordValidation = passwordComplexity(PWD_CONFIG).validate(password)
  if(passwordValidation.hasOwnProperty('error')) return false
  else return true    
}

const deleteUserByIDFromDB = async (id) => {
  try {
      const user = await Users.destroy({ where: { id: id } })
      console.log(user);
      return user;
  } catch(error) {
    console.error(error);
    return null;
  }
};

const createUserInDB = async (username, password, userRole, emailAddress,firstName, lastName) => {
  var passRes = calculateHmacAndSalt(password)
  let passwordHash = passRes.hmac
  salt = passRes.salt
  await Users.create({
      userName: username,
      passwordHash: passwordHash,
      passwordSalt: salt,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      userRole: userRole,
  })
  await archivePassword(username,passwordHash,salt)
  console.log(`User '${username}' created`)
};



// const isPendingPasswordReset = async (username) => {
//   // VALIDATE
//   var results = databaseConnection.query(`SELECT userName FROM forgetPassword WHERE userName = '${username}'`)
//   if(results.length != 0) return true
//   else return false
// }

module.exports = {
  getUserFromDB,
  checkPasswordFromDB,
  getUserByIDFromDB,
  getAllUsersFromDB,
  changePasswordInDB,
  isPasswordUsed,
  isPasswordComplexed,
  validatePassword,
  deleteUserByIDFromDB,
  createUserInDB,
};
