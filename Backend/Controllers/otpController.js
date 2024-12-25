const {otpModule,otpGenerator} = require("../Modules/otpModule");

const otpController={
    otpGenerate: async (req, res) => {
        try {
            const otpGenerateResponse = await otpGenerator(req.params.User_Name);
            console.log("OTP Generate Response :", otpGenerateResponse);

            if (otpGenerateResponse.responseCode === 200) {
                res.status(200).json(otpGenerateResponse);
            } else {
                res.status(404).json(otpGenerateResponse);
            }
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ responseBody: "Internal Server Error" });
        }
    },
    otpVerify:async(req,res)=>{
        try {
            const otpResponse = await otpModule(req)
            console.log("OTP Verify Response :", otpResponse);

            if(otpResponse.responseCode == 200){
                res.status(200).json(otpResponse);
            }
            else{
                res.status(100).json(otpResponse);
            }
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ responseBody: "Internal Server Error" });
        }
        
    }
}


module.exports= otpController;