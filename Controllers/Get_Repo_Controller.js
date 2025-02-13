const Get_Repo_Module = require('../Modules/Get_Repo_Module');

const Get_Repo_Controller = async (req, res) => {
    try {
        const Access_Token = req.headers["x-access-token"];

        if (!Access_Token) {
            return res.status(401).json({ error: "Unauthorized: No Access token provided" });
        }

        const Get_Repo_response = await Get_Repo_Module.getRepo(Access_Token);

        return res.status(Get_Repo_response.responseCode).json({ Repos: Get_Repo_response.responseBody });
    } catch (error) {
        console.error("Error in Get_Repo_Controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = Get_Repo_Controller;
