require("dotenv").config();

const AWS = require('aws-sdk');
const hash = require("./hashPwd");
const otpMail = require('../Templates/otpMail');
const mail = require('nodemailer');

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MailGun_API});



// const { google } = require("googleapis")
// const OAuth2 = google.auth.OAuth2
// const OAuth2_client = new OAuth2(process.env.clientId,process.env.clientSecret)
// OAuth2_client.setCredentials({
//     refresh_token : process.env.refreshToken
// })

// sendEmail = (recipient, message, attachment) =>
//   new Promise((resolve, reject) => {
//     const data = {
//       from: 'Gobinda Thakur <info@mg.gobindathakur.com>',
//       to: recipient,
//       subject: message.subject,
//       text: message.text,
//       inline: attachment,
//       html: message.html,
//     };

//     mailgun.messages().send(data, (error) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve();
//     });
//   });


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const docClient = new AWS.DynamoDB.DocumentClient();

let responseCode = 200;
let responseBody = "";


  
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

        // return new Promise((resolve, reject) => {
        //     const data = {
        //         from: 'kokhilpotnuru@gmail.com',
        //         to: email,
        //         subject: "Subject OTP",
        //         text: `Your OTP is: ${otp}`,
        //         // inline: { attachment: attachment }, // Assuming 'attachment' is the path or URL of the attachment
        //         html: otpMail(email, otp),
        //     };
    
        //     mailgun.messages().send(data, (error) => {
        //         if (error) {
        //             return reject(error);
        //         }
        //         console.log("Successfully Mailed!")
        //         return resolve();
        //     });
        // });
    

    // var smtpConfig = {
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true, // use SSL
    //     auth: {
    //         user: 'naganathan1555@gmail.com',
    //         pass: 'fffoghzljfpqapll'
    //     }
    // };
    // var transporter = mail.createTransport(smtpConfig);
    
    // var transporter = mail.createTransport({
    //     host: 'mail.openjavascript.info',
    //     port: 1025,
    //     secure: false, // true for 465, false for other ports
    //     logger: true,
    //     debug: true,
    //     secureConnection: false,
    //     auth: {
    //         user: 'lowkiksaipotnuru@gmail.com',
    //         pass: 'lacyharhoqkzxscv'
    //     },
    //     tls:{
    //         rejectUnAuthorized:true
    //     }
    // })

    // const transporter = mail.createTransport({
    //     host: 'localhost',
    //     port: 1025,
    //     secure: false, // true for 465, false for other ports
    //     logger: true,
    //     debug: true,
    //     secureConnection: false,
    //     auth: {
    //         user: 'project.1',
    //         pass: 'secret.1'
    //     },
    //     tls:{
    //         rejectUnAuthorized:true
    //     }
    // });

    // const transporter = mail.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // Use `true` for port 465, `false` for all other ports
    //     auth: {
    //         user: 'naganathan1555@gmail.com',
    //         pass: 'fffoghzljfpqapll'
    //     },
    // });

    // let transporter = mail.createTransport({
    //     host: 'box1109.bluehost.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'naganathan1555@gmail.com',
    //         pass: 'fffoghzljfpqapll'
    //     }
    // });

    // await transporter.verify((err, success) => {
    //     if (err) console.error(err);
    //     console.log('Your config is correct');
    // });


    // let mailOptions;
    // mailOptions = {
    //     from : 'lowkiksaipotnuru@gmail.com',
    //     to : 'kokhilpotnuru@gmail.com',
    //     subject : 'OTP for reset password - Code Mover',
    //     html : otpMail(email, otp)
    // }

    // const accessToken = OAuth2_client.getAccessToken()
    // const transporter = mail.createTransport({
    //     service: 'gmail',
    //     auth:{
    //         type:"OAuth2",
    //         user:"lowkiksaipotnuru@gmail.com",
    //         clientId:process.env.clientId,
    //         clientSecret:process.env.clientSecret,
    //         refreshToken:process.env.refreshToken,
    //         accessToken:accessToken

    //     }
    // })

    // let mailOptions = {
    //     from : 'lowkiksaipotnuru@gmail.com',
    //     to : 'kokhilpotnuru@gmail.com',
    //     subject : 'OTP for reset password - Code Mover',
    //     html : otpMail(email, otp)
    // }

    // transporter.sendMail(mailOptions,function(error,result){
    //     if(error){
    //         console.log("Error in sending mail ",error)
    //     }else{
    //         console.log("Result for sending mail ",result)
    //     }
    //     transporter.close()
    // })

    // try{
    //   await transporter.sendMail(mailOptions);
    //   console.log("Sent mail successfully")
    // }
    // catch(err){
    //   if(err){
    //     console.log("Error in sending mail " +err);
    //   }
    // }

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

        await ddb.getItem(parameters, (err, data) => {
            if(err){
                console.log(err);
                responseCode = 404;
                responseBody = "Error in Reading Database";
                const response = {
                    responseCode,
                    responseBody
                };
                return response;
            }

            if(data.Item.User_Name.S === User_Name){
                email=data.Item.Email.S
                        
                sendOTP(email,otp)//Send OTP through Mailer
                
            }else{
                responseCode = 420;
                responseBody = "No User Exists with Given User Name";
                const response = {
                    responseCode,
                    responseBody
                };
                return response;
            }
        })
        





        const hashedOTP = await hash.create(otp);
        console.log(`OTP : ${otp} and HashOTP : ${hashedOTP}`)

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
    
        await docClient.update(params, function(err, data) {
            if(err){
                responseCode = 100;
                responseBody = "Error in Updating OTP";
                return false;
            }
            else{
                responseBody = "Successfully Updated OTP ";
                responseCode = 200;
            }
        });
    

    }catch(error){
        responseBody = error;
        responseCode = 400;
    }
    const response = {
        responseCode,
        responseBody
    };
    
    return response
}

const otpModule = async(req) =>{
    var params = {
        Key: {
            "Email": {
                "S": req.params.email
            }
        },
        TableName: "Auth"
    };

    await ddb.getItem(params, function(err, data) {
        if(err){
            console.log(err);
            responseCode = 100;
            responseBody = err;
        }
        else{
            console.log(data+" OTP : "+req.body.otp);
            if(req.body.otp === data.Item.OTP.S){
                responseCode=200;
                responseCode="Successfully Verified"
            }
            else{
                responseCode=404;
                responseCode="Invalid OTP"
            }
        }
    });

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