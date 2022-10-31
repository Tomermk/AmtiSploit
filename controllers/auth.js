const { response } = require("express");
const { generateAccessToken, generateRefreshToken } = require("../utils/token-generator");
const { getUserFromDB, checkPasswordFromDB } = require(".././handlers/users");

const login = async (req, res = response) => {
  const { username, password } = req.body;
  const user = await getUserFromDB({ username });

  if (user) {
    const { passwordHash, passwordSalt } = user;
    const pass = await checkPasswordFromDB({ password,passwordHash, passwordSalt });
    if (pass) {

      const token = generateAccessToken(user?.userName, user?.userRole);
      const refreshToken = generateRefreshToken(user?.userName, user?.userRole);
      // save refresh to database
      res.status(200).json({
        accessToken: `${token}`,
        refreshToken: `${refreshToken}`,
        userid: user?.id,
        username: user?.userName,
        role: user?.userRole
      }); 
    } else res.status(401).json("Invalid password");
  } else res.status(401).json("Invalid username");
};


const refresh = async (req, res = response) => {
  const { token } = req.body;
  const data = req.data;
  // delete refresh token from database
  console.log(data);
  const newAccessToken = generateAccessToken(data.username, data.role);
  const newRefreshToken = generateRefreshToken(data.username, data.role);
  // add new refresh token to database
  res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
      });
};


module.exports = {
  login,
  refresh,
};
