const { response } = require("express");
const { generateAccessToken } = require("../utils/token-generator");
const { getUserFromDB } = require("./users");

const login = async (req, res = response) => {
  const { username, password } = req.body;
  const user = await getUserFromDB({ username });

  if (user) {
    const token = generateAccessToken(user?.userName, user?.userRole);

    res.json({
      token: `Bearer ${token}`,
      userid: user?.id,
    });
  } else res.sendStatus(401);
};

module.exports = {
  login,
};
