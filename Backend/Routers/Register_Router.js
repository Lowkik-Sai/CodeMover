const Register_Controller = require('../Controllers/Register_Controller');
const express = require('express');

const router = express.Router();

router.post("/register", (req, res) => {
    Register_Controller(req, res);
});

module.exports = router;

