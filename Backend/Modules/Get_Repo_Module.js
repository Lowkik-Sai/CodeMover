const {Octokit} = require("@octokit/core")
require("dotenv").config()


let responseCode = 200;
let responseBody = "";

const Get_Repo_Module =  {
    getRepo : async(Access_Token)=>{
        try{

            const octokit = new Octokit({
                auth: Access_Token
            })

            const api_response = await octokit.request('GET /user/repos',{
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                    
                }
            })
            const repo_names = api_response.data.map(obj => obj.name);
            responseBody = repo_names;

        }catch (error) {
            console.log(error);
            responseCode = 100;
            responseBody = error;
        }

        const response = {
            responseCode,
            responseBody
        };
        return response;
    }
}
module.exports = Get_Repo_Module;