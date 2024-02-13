const axios = require('axios');
let responseCode = 200;
let responseBody = "";

const Get_Repo_Module =  {
    Get_Repo : async(User_Name, Access_Token) => {
        try {
            const api_response = await axios.get(`https://api.github.com/users/${User_Name}/repos`, {
                headers: {
                    Authorization: `Bearer ${Access_Token}`
                }
            });
            const repo_names = api_response.data.map(obj => obj.name);
            console.log(repo_names);
            responseBody = repo_names;
        } catch (error) {
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