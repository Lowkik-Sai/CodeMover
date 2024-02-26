const jwt = require('jsonwebtoken');

async function tokenValidator(req, res, next){
    const token = req.headers.authorization;
    if(!token){
        res.status(401).send({
            "ERROR": "No Token. Warning."
        });
        return;
    }
    
    try {
        const decodedToken = jwt.verify(token, "my-32-character-ultra-secure-and-ultra-long-secret");
        req.User_Name = decodedToken.User_Name;
        next();
    } catch (error) {
        res.status(401).send({
            "ERROR": "Unauthorized access. Warning."
        });
    }
}

module.exports = tokenValidator;