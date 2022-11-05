const { response } = require("express");
const { getAllUsersFromDB, getUserByIDFromDB } = require(".././handlers/users");


const getAllUsers = async (req, res = response) => {
    var queryResult = await getAllUsersFromDB();
    res.status(200).json(queryResult);
};


const getUserByID = async (req, res = response) => {
    var queryResult = await getUserByIDFromDB(req.params.userID);
    res.status(200).json(queryResult);
};


const changePassword = async (req, res = response) => {
    res.status(200).send(req.headers.authorization.split(' ')[1]);
};
    

module.exports = {
    getAllUsers,
    getUserByID,
    changePassword
};