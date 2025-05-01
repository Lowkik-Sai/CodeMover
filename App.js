require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mainRouter = require('./mainRouter');

const allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || '[]');

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Access-Token'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

app.options('*', cors(corsOptions)); // Handles preflight requests
app.use("/",mainRouter);

app.get("/test", (req, res) => {
    res.status(200).json({message: "Hello World from Code-Mover"});
})

const port = process.env.PORT || 5000;
app.listen(process.env.PORT || 3000, function(){
  console.log("Server listening on port %d in %s mode", this.address().port, app.settings.env);
});
