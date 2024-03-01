const Get_Email_Module = require('../Modules/Get_Email_Module');

const Get_Email_Controller = async(req, res) => {
    const User_Name = req.params.User_Name;
    const Get_Email_response = await Get_Email_Module(User_Name);
    if(Get_Email_response.responseCode == 200){
        res.status(200).json(Get_Email_response.responseBody);
    }
    else{
        res.status(100).json(Get_Email_response.responseBody);
    }
}


module.exports = Get_Email_Controller;