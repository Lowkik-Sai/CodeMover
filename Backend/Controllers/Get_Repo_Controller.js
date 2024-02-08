const Get_Repo_Module = require('../Modules/Get_Repo_Module');

const Get_Repo_Controller = async(req, res) => {
    const User_Name = req.params.User_Name
    const Get_Repo_response = await Get_Repo_Module.Get_Repo(User_Name);
    if(Get_Repo_response.responseCode == 200){
        const repos = [];
        for (const repo of Get_Repo_response.responseBody) {
            repos.push(repo.name);
        }
        res.status(200).json(repos);
    }
    else{
        res.status(404).json(Get_Repo_response.responseBody);
    }
}

module.exports = Get_Repo_Controller;