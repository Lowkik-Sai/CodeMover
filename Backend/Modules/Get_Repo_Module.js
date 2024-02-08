const axios = require('axios');
let responseCode = 200;
let responseBody = "";

const Get_Repo_Module =  {
    Get_Repo : async(User_Name) => {
        try {
            const api_response = await axios.get(`https://api.github.com/users/${User_Name}/repos`);
            console.log(api_response);
            if(api_response.status == 200){
                const responseBody = api_response.data;
            }
            else{
                console.log("Error in fetching Repositories", api_response.statusText);
                responseCode = 100;
                responseBody = api_response.statusText;
            }
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