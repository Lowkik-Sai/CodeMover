const Register_Controller = require('../Controllers/Register_Controller');
const express = require('express');

const router = express.Router();

router.post("/register", (req, res) => {
    Register_Controller.setAccountCreds(req, res);
});

router.post("/auth/github/callback", (req, res) => {
    Register_Controller.githubCallback(req, res);
});

module.exports = router;