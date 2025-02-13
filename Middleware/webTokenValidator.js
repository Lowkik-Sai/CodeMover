const jwt = require('jsonwebtoken');

async function tokenValidator(req, res, next) {
    const jwtToken = req.headers.authorization;  // JWT Token
    const accessToken = req.headers["x-access-token"]; // GitHub Access Token

    if (!jwtToken) {
        return res.status(401).json({ "ERROR": "No JWT Token. Warning." });
    }

    try {
        // Verify JWT Token
        const decodedToken = jwt.verify(jwtToken.split(" ")[1], "my-32-character-ultra-secure-and-ultra-long-secret");
        req.User_Name = decodedToken.User_Name;
        req.Access_Token = accessToken; // Store Access Token in request object for further use
        next();
    } catch (error) {
        return res.status(401).json({ "ERROR": "Unauthorized access. Warning." });
    }
}


module.exports = tokenValidator;