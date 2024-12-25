const Update_Profile_Controller = require('../Controllers/Update_Profile_Controller');

const express = require('express');
const router = express.Router();

router.post("/updateprofile/:type/:User_Name", (req, res) => {
    const type = req.params.type;
    if(type=="profile"){
        Update_Profile_Controller.profile(req, res);
    }else if(type=="password"){
        Update_Profile_Controller.password(req, res);
    }
})

module.exports = router;