const { response } = require("express");
const { generateAccessToken } = require("../utils/token-generator");
const { getUserFromDB, checkPasswordFromDB } = require("./users");

const login = async (req, res = response) => {
  const { username, password } = req.body;
  const user = await getUserFromDB({ username });

  if (user) {
    const { passwordHash, passwordSalt } = user;
    const pass = await checkPasswordFromDB({ password,passwordHash, passwordSalt });
    if (pass) {

      const token = generateAccessToken(user?.userName, user?.userRole);

      res.json({
        token: `Bearer ${token}`,
        userid: user?.id,
      }); 
    } else res.status(401).json("Invalid password");
  } else res.status(401).json("Invalid username");
};

module.exports = {
  login,
};
