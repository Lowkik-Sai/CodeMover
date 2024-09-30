const Get_Repo_Module = require('../Modules/Get_Repo_Module');

const Get_Repo_Controller = async (req, res) => {
    const Access_Token = req.query.Access_Token;
    const Get_Repo_response = await Get_Repo_Module.getRepo(Access_Token);
    
    // console.log("Log from Controller..");
    // console.log(Get_Repo_response.responseBody);
    return res.status(Get_Repo_response.responseCode).json({ Repos: Get_Repo_response.responseBody });
}

module.exports = Get_Repo_Controller;
