require("dotenv").config();

const AWS = require('aws-sdk');
const hash = require("./hashPwd");
const otpMail = require('../Templates/otpMail');
const mail = require('nodemailer');

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MailGun_API});



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const docClient = new AWS.DynamoDB.DocumentClient();

let responseCode = 100;
let responseBody = "Something went wrong";
let userName = "";


  
async function sendOTP(email,otp){
    console.log("Email :"+email)
    mg.messages.create('codemover.me', {
        from: "Excited User <mailgun@sandbox-123.mailgun.org>",
        to: email,
        subject: "OTP",
        text: `Your OTP is: ${otp}`,
        html: otpMail(email, otp)
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error

}

async function otpGenerator(User_Name){
    
    try{
        let digits="0123456789";
        let otp="";
        for(let i=0;i<4;i++){
            otp+=digits[Math.floor(Math.random()*10)];
        }

        var parameters = {
            Key: {
                "User_Name": {
                    "S": User_Name
                }
            },
            TableName: "Auth"
        };


        let email=""

        const data = await ddb.getItem(parameters).promise();
        
        if (!data.Item || !data.Item.Email) {
            
            return {
                userName: User_Name,
                responseCode: 404,
                responseBody: "No User Exists with Given User Name"
            };
        }

        email = data.Item.Email.S;
        sendOTP(email, otp); // Send OTP through Mailer

        const hashedOTP = await hash.create(otp);
        console.log(`OTP : ${otp} and HashOTP : ${hashedOTP}`);

        const params = {
            TableName: "Auth",
            Key: {
                "User_Name": User_Name
            },
            UpdateExpression: "set OTP = :x",
            ExpressionAttributeValues: {
                ":x": hashedOTP
            }
        };

        await docClient.update(params).promise();

        return {
            userName: User_Name,
            responseCode: 200,
            responseBody: "Successfully Updated OTP"
        };
    

    }catch(error){
        responseBody = error;
        responseCode = 400;
    }
    const response = {
        userName,
        responseCode,
        responseBody
    };
    
    return response
}

const otpModule = async(req) =>{
    var params = {
        Key: {
            "User_Name": {
                "S": req.params.User_Name
            }
        },
        TableName: "Auth"
    };
    const data = await ddb.getItem(params).promise();
    console.log(data.Item.OTP.S+" OTP : "+req.body.otp);
    const isMatch = await hash.verify(data.Item.OTP.S,req.body.otp);
    if(isMatch){
        responseCode=200;
        responseBody="Successfully Verified"
    }
    else{
        responseCode=404;
        responseBody="Invalid OTP"
    }
    const response = {
        responseCode,
        responseBody
    };
        
    return response;
}

module.exports= {
    otpModule,
    otpGenerator
}