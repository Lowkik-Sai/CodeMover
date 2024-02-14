const AWS = require('aws-sdk');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const Validate_UserName = require('../Middleware/Validate_UserName');
AWS.config.update({region: process.env.AWS_REGION});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

let response = {
    responseCode: 200,
    responseBody: ""
};

const Register_Module = async(User_Name, Password, Access_Token) => {
    try {
        const access_token_response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${Access_Token}`
            }
        });

    } catch (error) {
        response.responseCode = 100;
        response.responseBody = "Invalid Access Token";
        console.log(error);
        return response;
    }

    const Validate_User_response = await Validate_UserName(User_Name);
    if(!Validate_User_response){
        response.responseCode = 404;
        response.responseBody = "Invalid Github User Name";
        return response;
    }

    const hashedPassword = crypto.createHash('sha256').update(Password).digest('hex');

    var params = {
        TableName: "Auth",
        Item: {
            User_Name: { S: User_Name },
            Password: { S: hashedPassword },
            Access_Token: { S: Access_Token }
        }
    };

    ddb.putItem(params, (err, data) => {
        if(err){
            console.log(err);
            response.responseCode = 422;
            response.responseBody = "Failed to Add User to Database";
        }
        else{
            response.responseBody = "Successfully Added User to Database";
        }
    });
    return response;
}

module.exports = Register_Module;