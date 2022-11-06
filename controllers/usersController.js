const { response } = require("express");
const { getAllUsersFromDB, getUserByIDFromDB, isPasswordComplexed, isPasswordUsed } = require(".././handlers/users");
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
            console.log('validating complexity')
            var isPasswordComplexed = isPasswordComplexed(req.body.newPassword)
            
            console.log('validating history')
            var isPasswordUsed = isPasswordUsed(req.body.newPassword)
            
            console.log('validating password')
            
            if(validatePassword(req.body.username,req.body.oldPassword) == false){
                res.status(500).send("Incorrect Password");
            }
            
            if(isPasswordComplexed == false){
                console.log("Password does not meet complexity requierments")
                res.status(500).send("Password does not meet complexity requierments");
            }
            
            if(isPasswordUsed == true){
                console.log("Password does not meet password history requierments")
                res.status(500).send("Password does not meet password history requierments");
            }
            
            console.log('changing password')
            await changePassword(req.body.username,req.body.newPassword)
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