const Register_Module = require('../Modules/Register_Module');

const Register_Controller = {
    setPassword : async(req, res) => {
        const { User_Name, Password, Access_Token, Email_ID } = req.body;
        const Register_response = await Register_Module.setPassword(User_Name, Password, Access_Token, Email_ID);
        res.status(Register_response.responseCode).json({message: Register_response.responseBody});
    },

    githubCallback : async(req, res) => {
        const { code } = req.body;
        const Register_response = await Register_Module.githubCallback(code);
        res.status(Register_response.responseCode).json({message: Register_response.responseBody});
    }
}

module.exports = Register_Controller;