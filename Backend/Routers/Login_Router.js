const Login_Controller = require('../Controllers/Login_Controller');
const express = require('express');

const router = express.Router();

router.post("/login", (req, res) => {
    Login_Controller(req, res);
});

module.exports = router;