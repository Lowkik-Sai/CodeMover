const express = require('express');
const cors = require('cors');

const app = express();
const mainRouter = require('../Backend/mainRoutes');

app.use(express.json());
app.use(cors());
require('dotenv').config();


app.use("/", mainRouter);

app.get("/test", (req, res) => {
    res.status(200).json({message: "Hello World from Code-Mover"});
})

const port = process.env.SERVER_PORT || 5000;
app.listen(port, (req, res) => {
    console.log(`Server is Listening on Port ${port}...`);
})