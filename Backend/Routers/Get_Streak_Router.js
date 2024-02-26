const Get_Streak_Controller = require('../Controllers/Get_Streak_Controller');
const express = require('express');

const router = express.Router();

router.get("/getstreak/:User_Name", (req, res) => {
    Get_Streak_Controller(req, res);
})

module.exports = router;