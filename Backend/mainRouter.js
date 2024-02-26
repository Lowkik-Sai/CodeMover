const express = require('express');
const router = express.Router();

const Get_Repo = require('./Routers/Get_Repo_Route');
const Get_Access_Token = require('./Routers/Get_Access_Token_Router');
const Get_Contribution = require('./Routers/Get_Contribution_Router');
const Get_Streak = require('./Routers/Get_Streak_Router');
const Login = require('./Routers/Login_Router');
const Register = require('./Routers/Register_Router');
const commit = require('./Routers/Commit_Route');

//Middlewares
const webTokenValidator = require('./Middleware/webTokenValidator');
const rateLimitCheck = require('./Middleware/rateLimit');

router.use("/", rateLimitCheck, Get_Repo);
router.use("/restricted", webTokenValidator, Get_Access_Token);
router.use("/", Login);
router.use("/", Register);
router.use("/",commit);
router.use("/", rateLimitCheck, commit);
router.use("/", Get_Contribution);
router.use("/", Get_Streak);


module.exports = router;
