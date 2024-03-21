const Get_Streak_Module = require('../Modules/Get_Streak_Module');

const Get_Streak_Controller = async(req, res) => {
    const User_Name = req.params.User_Name;
    const Get_Streak_response = await Get_Streak_Module(User_Name);
    if(Get_Streak_response.responseCode == 200){
        res.status(200).json(Get_Streak_response.responseBody);
    }
    else{
        res.status(100).json(Get_Streak_response.responseBody);
    }
}


module.exports = Get_Streak_Controller;