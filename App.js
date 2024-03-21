const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./mainRouter');

app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use("/",mainRouter);

app.get("/test", (req, res) => {
    res.status(200).json({message: "Hello World from Code-Mover"});
})

const port = process.env.PORT || 5000;
app.listen(process.env.PORT || 3000, function(){
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});
