const { response } = require("express");
const { getAllUsersFromDB, getUserByIDFromDB, isPasswordComplexed, isPasswordUsed,validatePassword,changePasswordInDB, deleteUserByIDFromDB } = require(".././handlers/users");


const getAllUsers = async (req, res = response) => {
    var queryResult = await getAllUsersFromDB();
    res.status(200).json(queryResult);
};


const getUserByID = async (req, res = response) => {
    var queryResult = await getUserByIDFromDB(req.params.userID);
    res.status(200).json(queryResult);
};


const changeSelfPassword = async (req, res = response) => {
    try{
        console.log('validating permissions')
        var isAdmin = req.data.role == "Admin"
        if(req.params.userID == req.data.userid || isAdmin){
            console.log('validating password')            
            var isValid = await validatePassword(req.data.username,req.body.oldPassword)
            console.log(isValid)
            if(isValid == false){
                res.status(400).send({'errors':[{'msg':'Incorrect Password'}]})
                return
            }
            
            console.log('validating complexity')
            var isComplexed = isPasswordComplexed(req.body.newPassword)
            if(!isComplexed){
                res.status(400).send({'errors':[{'msg':'Password does not meet complexity requierments'}]})
                return
            }
            
            console.log('validating history')            
            var isUsed = await isPasswordUsed(req.data.username,req.body.newPassword)
            if(isUsed){
                res.status(400).send({'errors':[{'msg':'Password does not meet password history requierments'}]})
                return
            }


            
            console.log('changing password')
            await changePasswordInDB(req.data.username,req.body.newPassword)
            
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



const changePassword = async (req, res = response) => {
    try{
        var isAdmin = req.data.role == "Admin"
        if(isAdmin){
            
            console.log('validating complexity')
            var isComplexed = isPasswordComplexed(req.body.newPassword)
            if(!isComplexed){
                res.status(400).send({'errors':[{'msg':'Password does not meet complexity requierments'}]})
                return
            }
            var user = await getUserByIDFromDB(req.params.userID);
            user = user.toJSON();
            console.log('validating history')        
            var isUsed = await isPasswordUsed(user.username,req.body.newPassword)
            if(isUsed){
                res.status(400).send({'errors':[{'msg':'Password does not meet password history requierments'}]})
                return
            }


            
            console.log('changing password')
            await changePasswordInDB(user.username,req.body.newPassword)
            
            res.status(200).json("OK")
        }
        else{
            res.status(401).send({'errors':[{'msg':'Unauthorized'}]})
        }
    }
    catch(error){
        res.status(500).send(error)
    }
    
};

const deleteUserbyID = async (req, res = response) => {
    try{
        const isAdmin = req.data.role == "Admin"
        if(!isAdmin){
            res.status(401).json("Unauthorized")
        }
        else if(req.data.userid == req.params.userID) {
            res.status(400).send({'errors':[{'msg':'Cannot delete yourself'}]});
            return;
        }
        else{
            await deleteUserByIDFromDB(req.params.userID)
            res.status(200).json("OK")
        }
    }
    catch(error){
        res.status(500).send(error)
    }
};
    

module.exports = {
    getAllUsers,
    getUserByID,
    changeSelfPassword,
    changePassword,
    deleteUserbyID,
};