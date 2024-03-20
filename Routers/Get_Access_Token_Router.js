const Get_Access_Token_Controller = require('../Controllers/Get_Access_Token_Controller');
const express = require('express');

const router = express.Router();

router.get("/getaccesstoken/:User_Name", (req, res) => {
    Get_Access_Token_Controller(req, res);
})

module.exports = router;