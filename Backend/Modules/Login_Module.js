const AWS = require('aws-sdk');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const Login = async (User_Name, Password) => {
    const response = {
        responseCode: 200,
        responseBody: "",
        JWT_TOKEN: ""
    };

    const params = {
        Key: {
            "User_Name": { "S": User_Name }
        },
        TableName: "Auth"
    };

    try {
        const data = await ddb.getItem(params).promise();
        if (!data.Item) {
            response.responseCode = 404;
            response.responseBody = "User Not Found";
            return response;
        }

        const DB_Password = data.Item.Password.S;
        const hashedPassword = crypto.createHash('sha256').update(Password).digest('hex');
        console.log(DB_Password, hashedPassword);
        let isValid = true;
        
        if(DB_Password !== hashedPassword) isValid = false;

        if (!isValid) {
            response.responseCode = 401;
            response.responseBody = "Incorrect Password";
            return response;
        }

        const token = jwt.sign({ User_Name: User_Name }, "my-32-character-ultra-secure-and-ultra-long-secret", {
            expiresIn: '1h',
        });
        response.JWT_TOKEN = token;
        response.responseBody = "Successfully Logged In"; 

    } catch (error) {
        console.error("Error:", error);
        response.responseCode = 500;
        response.responseBody = "Internal Server Error";
    }

    return response;
};

module.exports = Login;
