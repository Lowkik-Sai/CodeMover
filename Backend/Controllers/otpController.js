const {otpModule,otpGenerator} = require("../Modules/otpModule");

const otpController={
    otpGenerate:async(req,res)=>{
        const otpGenerate=await otpGenerator(req.params.User_Name);
        if(otpGenerate.responseCode==200){
            res.status(200).json(otpGenerate.responseBody)
        }else{
            //Email not exists or OTP sending failed
            res.status(404).json(otpGenerate.responseBody)
        }
    },
    otpVerify:async(req,res)=>{
        const otpResponse = await otpModule(req)
        if(otpResponse.responseCode == 200){
            res.status(200).json(otpResponse.responseBody);
        }
        else{
            res.status(100).json(otpResponse.responseBody);
        }
    }
}


module.exports= otpController;