const {Octokit} = require("@octokit/core")
require("dotenv").config()
// Bug Found :)
// const Access_Token = process.env.gitToken;
let responseCode = 200;
let responseBody = "";

const Get_Repo_Module =  {
    getRepo : async(Access_Token)=>{

        Access_Token = String(Access_Token).trim(); 
        if (Access_Token === '') {
            console.error("Invalid Access Token provided.");
            return {
                responseCode: 400,
                responseBody: "Invalid Access Token"
            };
        }
        
        try{
            // console.log("Inside Get Repo Module: ", Access_Token);
            const octokit = new Octokit({
                auth: Access_Token
            })
            
            // console.log("API RESPONSE STARTS HERE !!");
            const api_response = await octokit.request('GET /user/repos',{
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            const repo_names = api_response.data.map(obj => obj.name);
            // console.log("Repo Names: ", repo_names);
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
