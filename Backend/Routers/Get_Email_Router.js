const Get_Email_Controller = require('../Controllers/Get_Email_Controller');
const express = require('express');

const router = express.Router();

router.get("/getemail/:User_Name", (req, res) => {
    Get_Email_Controller(req, res);
})

module.exports = router;