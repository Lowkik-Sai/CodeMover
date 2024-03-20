const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());

app.use(express.json());

function displayAnswers(req,res){
    console.log(req.body.answersReceived)
    res.json({ message: `${req.body.answersReceived}` });
}


app.post("/api/getAnswers",(req,res)=>{
    displayAnswers(req,res);
})

app.listen(8080,()=>{
    console.log("Listening to port 8080");
})