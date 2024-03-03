const {otpModule,otpGenerator} = require("../Modules/otpModule");

const otpController = async(req,res)=>{
    const otpGenerate=await otpGenerator(req.params.User_Name);
    if(otpGenerate.responseCode==200){
        // const otpResponse = otpModule(req)
        // if(otpResponse.responseCode == 200){
        //     res.status(200).json(otpResponse.responseBody);
        // }
        // else{
        //     res.status(100).json(otpResponse.responseBody);
        // }
        res.status(200).json(otpGenerate.responseBody)
    }else{
        //Email not exists or OTP sending failed
        res.status(404).json(otpGenerate.responseBody)
    }
}

module.exports= otpController;