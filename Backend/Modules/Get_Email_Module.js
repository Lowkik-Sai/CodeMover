const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

let responseCode = 200;
let responseBody = "";

const Get_Email = async(User_Name) => {
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
            responseBody = data.Item.Email.S;
        }
    });

    const response = {
        responseCode,
        responseBody
    };
    return response;
}

module.exports = Get_Email;