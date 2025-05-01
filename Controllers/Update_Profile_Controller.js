const Update_Profile_Module = require('../Modules/Update_Profile_Module');

const Update_Profile_Controller = {
    delete : async(req, res) => {
        const User_Name = req.params.User_Name;
        const Update_Profile_response = await Update_Profile_Module.delete(User_Name);
        if(Update_Profile_response.responseCode == 200){
            res.status(200).json(Update_Profile_response.responseBody);
        }
        else{
            res.status(Update_Profile_response.responseCode).json(Update_Profile_response.responseBody);
        }
    },

    update : async(req,res) => {
        const User_Name = req.params.User_Name;
        const { Password, newPassword } = req.body;
        const Update_Profile_response = await Update_Profile_Module.update(User_Name, Password, newPassword);
        if(Update_Profile_response.responseCode == 200){
            res.status(200).json(Update_Profile_response.responseBody);
        }
        else{
            res.status(Update_Profile_response.responseCode).json(Update_Profile_response.responseBody);
        }
    }
}

module.exports = Update_Profile_Controller;