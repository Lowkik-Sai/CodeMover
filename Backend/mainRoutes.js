const express = require('express');
const router = express.Router();
const Get_Repo = require('../Backend/Routers/Get_Repo_Route');
const Get_Access_Token = require('../Backend/Routers/Get_Access_Token_Router');

router.use("/", Get_Repo);
router.use("/", Get_Access_Token);


module.exports = router;