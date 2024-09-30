const commitCodeModule = require("../Modules/Commit_Module");

const commitController = async (req,res) => {
    
    //req = owner, ownerMail, repo, path, commitMessage, content, Access_Token
    const owner = req.params.owner;
    const Access_Token = req.body.Access_Token;
    const repo = req.params.repo;
    const dataStructure = req.params.dataStructure;
    const title = req.params.title;
    const codePath = `${dataStructure}/${title}`;
    const commitMessage = req.body.commitMessage;
    const ownerMail = req.body.ownerMail;
    const content = req.body.content;

    // console.log("Access_Token at Commit Controller: ", Access_Token);

    const getCommitModule = await commitCodeModule.commitCode(owner, ownerMail, repo, codePath, commitMessage, content, Access_Token);
    res.status(getCommitModule.responseCode).json(getCommitModule.responseMessage)

}

module.exports = commitController;
