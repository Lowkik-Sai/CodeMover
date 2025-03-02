const Register_Module = require('../Modules/Register_Module');

const Register_Controller = {
    setAccountCreds : async(req, res) => {
        const { User_Name, Password, Access_Token, Email_ID } = req.body;
        const Register_response = await Register_Module.setAccountCreds(User_Name, Password, Access_Token, Email_ID);
        res.status(Register_response.responseCode).json({message: Register_response.responseBody});
    },

    githubCallback : async(req, res) => {
        const { code, type } = req.body;
        const Register_response = await Register_Module.githubCallback(code, type);
        res.status(Register_response.responseCode).json(Register_response);
    }
}

module.exports = Register_Controller;