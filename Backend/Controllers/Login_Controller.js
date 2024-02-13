const Login_Module = require('../Modules/Login_Module');

const Login_Controller = async(req, res) => {
    const { User_Name } = req.body;
    const Login_response = await Login_Module(User_Name);
    if(Login_response.responseCode == 200){
        res.status(200).json(Login_response.JWT_TOKEN);
    }
    else{
        res.status(404).json({message: "User Not Found"});
    }
}

module.exports = Login_Controller;