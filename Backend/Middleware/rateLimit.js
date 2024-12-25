const {Octokit} = require("@octokit/core")
const fetch = require('node-fetch-commonjs')
require("dotenv").config()

const octokit = new Octokit({
    request: { fetch },
    auth : process.env.gitToken
})

async function rateLimitCheck(req,res,next){
    try{
        const response =await octokit.request('GET /rate_limit',{
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
        })
        const {limit,used,remaining} = response.data.rate
        console.log(limit,used,remaining)
    }catch(error){
        console.log(error)
    }
    
    next()
}

module.exports = rateLimitCheck;