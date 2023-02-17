const { response } = require("express");
const { getUserFromDB,getAllUsersFromDB, getUserByIDFromDB, isPasswordComplexed, isPasswordUsed,validatePassword,changePasswordInDB, deleteUserByIDFromDB, createUserInDB, updateUserRoleInDB } = require(".././handlers/users");


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
            res.status(401).send({'errors':[{'msg':'Unauthorized'}]})
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
            return;
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
    

const createUser = async (req, res = response) => {
    try{
        const isAdmin = req.data.role == "Admin"
        if(!isAdmin){
            res.status(401).send({'errors':[{'msg':'Unauthorized'}]})
        }
        else{
            var isComplexed = isPasswordComplexed(req.body.password)
            if(!isComplexed){
                res.status(400).send({'errors':[{'msg':'Password does not meet complexity requierments'}]})
                return
            }
            
            var user = await getUserFromDB(req.body.username);
            if(user !== null){
                res.status(400).send({'errors':[{'msg':'Username already exists'}]})
                return
            }
            await createUserInDB(req.body.username,req.body.password,req.body.role, req.body.email, req.body.firstname, req.body.lastname)
            res.status(200).json("OK")
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
};

const updateUser = async (req, res = response) => {
    try{
        const isAdmin = req.data.role == "Admin"
        if(!isAdmin){
            res.status(401).send({'errors':[{'msg':'Unauthorized'}]})
            return;
        } else if(req.data.username == req.params.username) {
            res.status(400).send({'errors':[{'msg':'Cannot Update your own role'}]});
            return;
        }
        else{
            var user = await getUserFromDB(req.body.username);
            user = user.toJSON();
            if(!user){
                console.log("Error:",user);
                res.status(400).send({'errors':[{'msg':"Username doesn't exists"}]})
                return
                }
            }
            console.log("ALl Good",user);
            await updateUserRoleInDB(user.id,req.body.role)
            res.status(200).json("OK")
        }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
};

module.exports = {
    getAllUsers,
    getUserByID,
    changeSelfPassword,
    changePassword,
    deleteUserbyID,
    createUser,
    updateUser,
};