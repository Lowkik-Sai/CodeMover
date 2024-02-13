const Get_Repo_Module = require('../Modules/Get_Repo_Module');

const Get_Repo_Controller = async(req, res) => {
    const User_Name = req.params.User_Name
    const Access_Token = req.body.Access_Token;
    const Get_Repo_response = await Get_Repo_Module.Get_Repo(User_Name, Access_Token);
    res.status(Get_Repo_response.responseCode).json(Get_Repo_response.responseBody);
}

module.exports = Get_Repo_Controller;