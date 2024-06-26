const Update_Profile_Module = require('../Modules/Update_Profile_Module');

const Update_Profile_Controller = {
    profile : async(req, res) => {
        const User_Name = req.params.User_Name;
        const { Email, Access_Token } = req.body;
        const Update_Profile_response = await Update_Profile_Module.profile(User_Name, Email, Access_Token);
        if(Update_Profile_response.responseCode == 200){
            res.status(200).json(Update_Profile_response.responseBody);
        }
        else{
            res.status(100).json(Update_Profile_response.responseBody);
        }
    },

    password : async(req,res) => {
        const User_Name = req.params.User_Name;
        const { Password } = req.body;
        const Update_Profile_response = await Update_Profile_Module.password(User_Name, Password);
        if(Update_Profile_response.responseCode == 200){
            res.status(200).json(Update_Profile_response.responseBody);
        }
        else{
            res.status(100).json(Update_Profile_response.responseBody);
        }
    }
}

module.exports = Update_Profile_Controller;