const commitController = require("../Controllers/Commit_Controller");
const express = require("express")
const router = express.Router();


router.put("/commitCode/:owner/:repo/:dataStructure/:title", (req, res) => {
    commitController(req, res);
})


module.exports = router;