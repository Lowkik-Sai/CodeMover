































const express = require('express');
const router = express.Router();

const Get_Repo = require('./Routers/Get_Repo_Route');
const Get_Access_Token = require('./Routers/Get_Access_Token_Router');
const Login = require('./Routers/Login_Router');
const Register = require('./Routers/Register_Router');
const commit = require('./Routers/Commit_Route');
const webTokenValidator = require('./Middleware/webTokenValidator');


//Middlewares
const webTokenValidator = require('./Middleware/webTokenValidator');
const rateLimitCheck = require('./Middleware/rateLimit')

router.use("/", rateLimitCheck, Get_Repo);
router.use("/restricted", webTokenValidator, Get_Access_Token);
router.use("/", Login);
router.use("/", Register);
router.use("/",commit);
router.use("/", rateLimitCheck, commit);


module.exports = router;