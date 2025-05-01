const AWS = require('aws-sdk');
const crypto = require('crypto');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const Update_Profile = {
    delete: async (User_Name) => {
        const params = {
            TableName: "Auth",
            Key: {
                "User_Name": User_Name
            }
        };

        let responseCode = 200;
        let responseBody = "";

        try {
            await docClient.delete(params).promise();
            responseBody = "Successfully deleted user profile";
        } catch (err) {
            responseCode = 500;
            responseBody = "Error in deleting profile: " + err.message;
        }

        return {
            responseCode,
            responseBody
        };
    },

    update: async (User_Name, Password, newPassword) => {
        let responseCode = 200;
        let responseBody = "";

        const hashedOldPassword = crypto.createHash('sha256').update(Password).digest('hex');
        const hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

        const fetchOldPassParams = {
            Key: {
                "User_Name": { "S": User_Name }
            },
            TableName: "Auth"
        };

        const params = {
            TableName: "Auth",
            Key: {
                "User_Name": User_Name
            },
            UpdateExpression: "set Password = :x",
            ExpressionAttributeValues: {
                ":x": hashedNewPassword
            }
        };

        try {
            const data = await ddb.getItem(fetchOldPassParams).promise();
            if (!data.Item) {
                response.responseCode = 404;
                response.responseBody = "User Not Found";
                return response;
            }
        
            const DB_Password = data.Item.Password.S;
            let isValid = true;
                
            if(DB_Password !== hashedOldPassword) isValid = false;
        
            if (!isValid) {
                responseCode = 401;
                responseBody = "Incorrect Old Password";
                return {
                    responseCode,
                    responseBody
                };
            }
            await docClient.update(params).promise();
            responseBody = "Successfully updated password";
        } catch (err) {
            responseCode = 500;
            responseBody = "Error in updating password: " + err.message;
        }

        return {
            responseCode,
            responseBody
        };
    }
};

module.exports = Update_Profile;
