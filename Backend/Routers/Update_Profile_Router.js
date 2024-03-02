const Update_Profile_Controller = require('../Controllers/Update_Profile_Controller');
const express = require('express');

const router = express.Router();

router.post("/updateprofile/:User_Name", (req, res) => {
    Update_Profile_Controller(req, res);
})

module.exports = router;