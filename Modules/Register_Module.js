require('dotenv').config();

const AWS = require('aws-sdk');
const axios = require('axios');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Validate_UserName = require('../Middleware/Validate_UserName');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

let response = {
    responseCode: 400,
    responseBody: "Bad Request",
    signupToken : "",
    avatar_url : ""
};

const Register_Module = {
    setPassword : async(User_Name, Password, Access_Token, Email_ID) => {
        try {
                // Check if a User already exists with the given User_Name
                const data = await ddb.getItem({
                    Key: {
                        "User_Name": { "S": User_Name }
                    },
                    TableName: "Auth"
                }).promise();
        
                if (data.Item && data.Item.User_Name.S === User_Name) {
                    console.log(data.Item);
                    response.responseCode = 420;
                    response.responseBody = "Already Exists, Login Instead";
                    return response;
                }
        
        
            // Insert User Details to DynamoDB
            const hashedPassword = crypto.createHash('sha256').update(Password).digest('hex');
        
            var params = {
                TableName: "Auth",
                Item: {
                    User_Name: { S: User_Name },
                    Password: { S: hashedPassword },
                    Access_Token: { S: Access_Token },
                    Email: { S: Email_ID },
                    Total_Contributions: { N: "0" },
                    OTP: { S: "" }
                }
            };
        
            ddb.putItem(params, (err, data) => {
                if(err){
                    console.log(err);
                    response.responseCode = 422;
                    response.responseBody = "Failed to Add User to Database";
                }
                else{
                    response.responseCode = 200;
                    response.responseBody = "Successfully Added User to Database";
                    return response;
                }
            }).promise();
            
        } catch (error) {
            response.responseCode = 500;
            response.responseBody = "Internal Server Error";
        }

        return response;

    },

    githubCallback : async(code) => {
        try {
            // Exchange code for access token
            const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
                    client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
                    code,
                }),
            });

            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            const response = await axios.get('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${accessToken}`
                }
            });

            const username = response.login;
            const avatar_url = response.avatar_url;

            const token = jwt.sign({ 
                                    User_Name: username,
                                    Access_Token: accessToken
                                }, "my-32-character-ultra-secure-and-ultra-long-secret", {
                                expiresIn: '1h',
                            });
            
            response.responseCode = 202;
            response.responseBody = "Successfully Authenticated with GitHub";
            response.signupToken = token;
            response.avatar_url = avatar_url; //In future, this can be used to display user's avatar in frontend
                        
        } catch (error) {
            response.responseCode = 400;
            response.responseBody = "Failed to Authenticate with GitHub";
            console.error('Error:', error);
        }finally{
            return response;
        }
    }
}

module.exports = Register_Module;
