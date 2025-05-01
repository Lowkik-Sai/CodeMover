const Update_Profile_Controller = require('../Controllers/Update_Profile_Controller');

const express = require('express');
const router = express.Router();

router.post("/updateprofile/:type/:User_Name", (req, res) => {
    const type = req.params.type;
    if(type=="delete"){
        Update_Profile_Controller.delete(req, res);
    }else if(type=="update"){
        Update_Profile_Controller.update(req, res);
    }
})

module.exports = router;