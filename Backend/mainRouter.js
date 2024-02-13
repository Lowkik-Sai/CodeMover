const express = require('express');
const router = express.Router();
const Get_Repo = require('./Routers/Get_Repo_Route');
const Get_Access_Token = require('./Routers/Get_Access_Token_Router');
const webTokenValidator = require('./Middleware/webTokenValidator');
const Login = require('./Routers/Login_Router');

router.use("/", Get_Repo);
router.use("/restricted", webTokenValidator, Get_Access_Token);
router.use("/", Login);


module.exports = router;