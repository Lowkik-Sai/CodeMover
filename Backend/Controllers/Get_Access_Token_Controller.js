const Get_Access_Token_Module = require('../Modules/Get_Access_Token_Module');

const Get_Access_Token_Controller = async(req, res) => {
    const User_Name = req.params.User_Name;
    const Get_Access_Token_response = await Get_Access_Token_Module(User_Name);
    if(Get_Access_Token_response.responseCode == 200){
        res.status(200).json(Get_Access_Token_response.responseBody);
    }
    else{
        res.status(100).json(Get_Access_Token_response.responseBody);
    }
}


module.exports = Get_Access_Token_Controller;