const { response } = require("express");
const { getAllUsersFromDB, getUserByIDFromDB, isPasswordComplexed, isPasswordUsed,validatePassword,changePasswordInDB } = require(".././handlers/users");
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
    try{
        console.log('validating permissions')
        var isAdmin = req.data.role == "Admin"
        if(req.params.userID == req.data.userid || isAdmin){
            console.log('validating password')            
            var isValid = await validatePassword(req.body.username,req.body.oldPassword)
            console.log(isValid)
            if(isValid == false){
                res.status(400).send("Incorrect Password")
                return
            }
            
            console.log('validating complexity')
            var isComplexed = isPasswordComplexed(req.body.newPassword)
            if(!isComplexed){
                res.status(400).json("Password does not meet complexity requierments")
                return
            }
            
            console.log('validating history')            
            var isUsed = await isPasswordUsed(req.body.username,req.body.newPassword)
            if(isUsed){
                res.status(400).send("Password does not meet password history requierments")
                return
            }


            
            console.log('changing password')
            await changePasswordInDB(req.body.username,req.body.newPassword)
            
            res.status(200).json("OK")
        }
        else{
            res.status(401).json("Unauthorized")
        }
    }
    catch(error){
        res.status(500).send(error)
    }
    
};
    

module.exports = {
    getAllUsers,
    getUserByID,
    changePassword
};