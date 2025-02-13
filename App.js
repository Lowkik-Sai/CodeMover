require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./mainRouter');

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Access-Token' 
  ],
};

app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
});

app.use("/",mainRouter);

app.get("/test", (req, res) => {
    res.status(200).json({message: "Hello World from Code-Mover"});
})

const port = process.env.PORT || 5000;
app.listen(process.env.PORT || 3000, function(){
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});
