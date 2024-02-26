const Get_Contribution_Module = require('../Modules/Get_Contribution_Module');

const Get_Contribution_Controller = async(req, res) => {
    const User_Name = req.params.User_Name;
    const Get_Contribution_response = await Get_Contribution_Module(User_Name);
    if(Get_Contribution_response.responseCode == 200){
        res.status(200).json(Get_Contribution_response.responseBody);
    }
    else{
        res.status(100).json(Get_Contribution_response.responseBody);
    }
}


module.exports = Get_Contribution_Controller;