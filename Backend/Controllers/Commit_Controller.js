const commitCodeModule = require("../Modules/Commit_Module");
const path = require("path")

const commitController = async (req,res) => {
    //req = owner, ownerMail, repo, path, commitMessage, content
    const owner = req.params.owner;
    const repo = req.params.repo;
    const dataStructure = req.params.dataStructure;
    const title = req.params.title;
    const codePath = dataStructure+"/"+title;
    const commitMessage = req.body.commitMessage;
    const ownerMail = req.body.ownerMail;
    const content = req.body.content;
    const path = encodeURIComponent(codePath);
    const getCommitModule = await commitCodeModule.commitCode(owner, ownerMail, repo, path, commitMessage, content);
    res.status(getCommitModule.responseCode).json(getCommitModule.responseMessage)

}

module.exports = commitController;