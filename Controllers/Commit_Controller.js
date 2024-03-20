const commitCodeModule = require("../Modules/Commit_Module");

const commitController = async (req,res) => {
    
    //req = owner, ownerMail, repo, path, commitMessage, content
    const owner = req.params.owner;
    const repo = req.params.repo;
    const dataStructure = req.params.dataStructure;
    const title = req.params.title;
    const codePath = `${dataStructure}/${title}`;
    const commitMessage = req.body.commitMessage;
    const ownerMail = req.body.ownerMail;
    const content = req.body.content;

    const getCommitModule = await commitCodeModule.commitCode(owner, ownerMail, repo, codePath, commitMessage, content);
    res.status(getCommitModule.responseCode).json(getCommitModule.responseMessage)

}

module.exports = commitController;