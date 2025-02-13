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

router.use("/", Login);
router.use("/", Register);
router.use("/", otp);
router.use("/", webTokenValidator, Get_Repo);
router.use("/", webTokenValidator, Get_Access_Token);
router.use("/", [webTokenValidator, rateLimitCheck], commit);
router.use("/", webTokenValidator, Get_Contribution);
router.use("/", webTokenValidator, Get_Streak);
router.use("/", webTokenValidator, Get_Email);
router.use("/", webTokenValidator, Update_Profile);


module.exports = router;
