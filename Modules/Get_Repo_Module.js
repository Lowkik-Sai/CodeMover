const { Octokit } = require("@octokit/core");
require("dotenv").config();

const Get_Repo_Module = {
    getRepo: async (Access_Token) => {
        Access_Token = String(Access_Token).trim();

        if (Access_Token === '') {
            console.error("Invalid Access Token provided.");
            return {
                responseCode: 400,
                responseBody: "Invalid Access Token"
            };
        }

        try {
            const octokit = new Octokit({
                auth: Access_Token
            });

            const api_response = await octokit.request('GET /user/repos', {
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });

            const repo_names = api_response.data.map(obj => obj.name);

            return {
                responseCode: 200,
                responseBody: repo_names
            };

        } catch (error) {
            console.error("GitHub API Error:", error.response?.data || error.message);

            return {
                responseCode: error.status || 500,
                responseBody: error.response?.data?.message || "Unknown Error"
            };
        }
    }
};

module.exports = Get_Repo_Module;
