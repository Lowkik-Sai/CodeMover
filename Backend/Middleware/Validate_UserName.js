const axios = require('axios');

const Validate_User_Name = async (User_Name) => {
    const access_token = process.env.gitToken;
    try {
        const response = await axios.get(`https://api.github.com/users/${User_Name}`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            console.error('Error checking user existence:', error.message);
            throw error;
        }
    }
}

module.exports = Validate_User_Name;