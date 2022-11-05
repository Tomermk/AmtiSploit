const { response } = require("express");
const { getAllUsersFromDB, getUserByIDFromDB } = require(".././handlers/users");
const PWDTool = require("../utils/passwords");

const getAllUsers = async (req, res = response) => {
    var queryResult = await getAllUsersFromDB();
    res.status(200).json(queryResult);
};


const getUserByID = async (req, res = response) => {
    var queryResult = await getUserByIDFromDB(req.params.userID);
    res.status(200).json(queryResult);
};


const changePassword = async (req, res = response) => {
    var isAdmin = req.data.role == "Admin"

    if(req.params.userID == req.data.userid || isAdmin){
        isPasswordComplexed = PWDTool.isComplexed(req.body.newPassword)
        // isPasswordUsed = PWDTool.isPasswordUsed(req.body.newPassword)
        
        
        
        console.log("Authorized")
        res.status(200).json("OK")
    }
    else{
        res.status(401).json("Unauthorized")
    }
    
};
    

module.exports = {
    getAllUsers,
    getUserByID,
    changePassword
};