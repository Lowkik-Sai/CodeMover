const express = require('express');
const router = express.Router();

const Get_Repo = require('./Routers/Get_Repo_Route');
const Get_Access_Token = require('./Routers/Get_Access_Token_Router');
const Get_Contribution = require('./Routers/Get_Contribution_Router');
const Get_Streak = require('./Routers/Get_Streak_Router');
const Get_Email = require('./Routers/Get_Email_Router');
const Update_Profile = require('./Routers/Update_Profile_Router');
const Login = require('./Routers/Login_Router');
const Register = require('./Routers/Register_Router');
const commit = require('./Routers/Commit_Route');
const otp = require("./Routers/otpRoute");

//Middlewares
const webTokenValidator = require('./Middleware/webTokenValidator');
const rateLimitCheck = require('./Middleware/rateLimit');

router.use("/", rateLimitCheck, Get_Repo);
router.use("/", Get_Access_Token);
router.use("/", Login);
router.use("/", Register);
router.use("/",commit);
router.use("/", rateLimitCheck, commit);
router.use("/", Get_Contribution);
router.use("/", Get_Streak);
router.use("/", Get_Email);
router.use("/", Update_Profile);
router.use("/", otp);


module.exports = router;
