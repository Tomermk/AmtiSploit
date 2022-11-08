const {Router} = require('express');
const router = Router();


router.post("/", (req, res) => {
    //delete refresh from db
    //const token = req.body.token
    res.status(200).json({message: "Refresh token deleted"});
});

module.exports = router;