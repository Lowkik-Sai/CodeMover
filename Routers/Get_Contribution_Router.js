const Get_Contribution_Controller = require('../Controllers/Get_Contributions_Controller');
const express = require('express');

const router = express.Router();

router.get("/getcontribution/:User_Name", (req, res) => {
    Get_Contribution_Controller(req, res);
})

module.exports = router;