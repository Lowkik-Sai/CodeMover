const express = require("express")
const router = express.Router()

const otpController = require("../Controllers/otpController")

router.post("/otp/:User_Name",(req,res)=>{
    otpController(req,res);
})

module.exports=router;