const AWS = require('aws-sdk');
const crypto = require('crypto');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();

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

    update: async (User_Name, Password) => {
        const hashedPassword = crypto.createHash('sha256').update(Password).digest('hex');

        const params = {
            TableName: "Auth",
            Key: {
                "User_Name": User_Name
            },
            UpdateExpression: "set Password = :x",
            ExpressionAttributeValues: {
                ":x": hashedPassword
            }
        };

        let responseCode = 200;
        let responseBody = "";

        try {
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
