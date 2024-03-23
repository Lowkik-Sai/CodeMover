const express = require("express")
const router = express.Router()

const otpController = require("../Controllers/otpController")

router.post("/otp/generate/:User_Name",(req,res)=>{
    otpController.otpGenerate(req,res);
})

router.post("/otp/verify/:User_Name",(req,res)=>{
    otpController.otpVerify(req,res);
})

module.exports=router;