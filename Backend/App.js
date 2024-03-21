const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./mainRouter');

app.use(express.json());
app.use(cors());
require('dotenv').config();

// app.use("/",mainRouter);

app.get("/", (req, res) => {
    res.send("Hello World from Code-Mover");
})

const port = process.env.SERVER_PORT || 5000;
app.listen(port, (req, res) => {
    console.log(`Server is Listening on Port ${port}...`);
})