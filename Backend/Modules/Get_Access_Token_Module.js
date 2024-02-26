const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({region: process.env.AWS_REGION});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

let responseCode = 200;
let responseBody = "";


const Get_Access_Token = async(User_Name) => {
    var params = {
        Key: {
            "User_Name": {
                "S": User_Name
            }
        },
        TableName: "Auth"
    };

    ddb.getItem(params, function(err, data) {
        if(err){
            console.log(err);
            responseCode = 100;
            responseBody = err;
        }
        else{
            console.log(data);
            responseBody = data.Item.Access_Token.S;
        }
    });

    const response = {
        responseCode,
        responseBody
    };
    return response;
}

module.exports = Get_Access_Token;