const Get_Repo_Controller = require('../Controllers/Get_Repo_Controller');
const express = require('express');

const router = express.Router();

router.get("/getrepos/:User_Name", (req, res) => {
    Get_Repo_Controller(req, res);
});

module.exports = router;