const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
require('dotenv').config();

AWS.config.update({region: process.env.AWS_REGION});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

let responseCode = 200;
let responseBody = "";
let JWT_TOKEN = "";

const Login = async(User_Name) => {
    var params = {
        Key: {
            "User_Name": {
                "S": User_Name
            }
        },
        TableName: "Auth"
    };

    let DB_User_Name = "";
    ddb.getItem(params, (err, data) => {
        if(err){
            console.log(err);
            responseCode = 100;
            responseBody = err;
        }
        else{
            console.log(data);
            DB_User_Name = data.Item.User_Name.S;
        }
    });

    if(DB_User_Name == null){
        responseCode = 404;
        responseBody = "User Not Found In Given User Name";
    }
    else{
        const token = jwt.sign({ User_Name: User_Name}, "my-32-character-ultra-secure-and-ultra-long-secret", {
            expiresIn: '1h',
        });
        JWT_TOKEN = token;
        responseBody = "Successfully Logged In";
    }

    const response = {
        responseCode,
        responseBody,
        JWT_TOKEN
    };

    return response;
}

module.exports = Login;