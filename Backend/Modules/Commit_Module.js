const { Octokit } = require("@octokit/core");
require('dotenv').config();

const octokit = new Octokit({
    auth: process.env.gitToken
})

let responseCode = 200;
let responseMessage = "Undefined";

const commitCodeModule = {
    commitCode: async (owner, ownerMail, repo, path, commitMessage, content) => {
        try {
            console.log(`Path in module : ${path}`);
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
