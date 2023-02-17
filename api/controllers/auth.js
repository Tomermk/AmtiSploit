const { response } = require("express");
const { generateAccessToken, generateRefreshToken } = require("../utils/token-generator");
const { getUserFromDB, validatePassword} = require(".././handlers/users");

const login = async (req, res = response) => {
  const { username, password } = req.body;
  const user = await getUserFromDB(username)

  if (user) {
    const pass = await validatePassword(username,password)
    if (pass) {
      const token = generateAccessToken(user?.userName, user?.userRole, user?.id);
      const refreshToken = generateRefreshToken(user?.userName, user?.userRole, user?.id);
      res.status(200).json({
        accessToken: `${token}`,
        refreshToken: `${refreshToken}`,
        userData:{
          userid: user?.id,
          username: user?.userName,
          role: user?.userRole
        }
      }); 
    } else res.status(401).json("Invalid username or password");
  } else res.status(401).json("Invalid username or password");
};


const refresh = async (req, res = response) => {
  const data = req.data;
  const newAccessToken = generateAccessToken(data.username, data.role, data.userid);
  const newRefreshToken = generateRefreshToken(data.username, data.role, data.userid);
  res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
      });
};


module.exports = {
  login,
  refresh,
};
