const { Octokit } = require("@octokit/core");
require('dotenv').config();

const octokit = new Octokit({
    auth: process.env.gitToken
})

const AWS = require('aws-sdk');


AWS.config.update({region: process.env.AWS_REGION});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

let responseCode = 200;
let responseMessage = "Undefined";

const commitCodeModule = {
    commitCode: async (owner, ownerMail, repo, path, commitMessage, content) => {
        try {
            const fileContent = Buffer.from(content).toString('base64');

            const { data: { sha } } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner,
                repo
            });

            await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner,
                repo,
                path,
                message: commitMessage,
                content: fileContent,
                committer: {
                    name: owner,
                    email: ownerMail
                },
                sha // Include the SHA hash of the file
            });

            
            // Update total contributions in database
            const params = {
                TableName: "Auth",
                Key: {
                    "User_Name": { "S": owner }
                },
                UpdateExpression: "SET Total_Contributions = if_not_exists(Total_Contributions, :zero) + :one",
                ExpressionAttributeValues: {
                    ":zero": { "N": "0" },
                    ":one": { "N": "1" }
                },
                ReturnValues: "UPDATED_NEW"
            };

            const updatedContributions = await ddb.updateItem(params).promise();
            console.log("Updated total contributions:", updatedContributions);

            responseMessage = "Alright!";
        } catch (error) {
            console.log(error);
            responseCode = 404;
            responseMessage = error;
        }

        const status = {
            responseCode,
            responseMessage
        };

        return status;
    }
}

module.exports = commitCodeModule;
