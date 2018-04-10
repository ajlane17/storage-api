/*jshint esversion: 6 */

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const cors           = require('cors');

const app            = express();
const https          = require("https");
const fs             = require("fs");
const helmet         = require("helmet");

const options = {
  key: fs.readFileSync("/usr/src/app/adrianjlane.key"),
  cert: fs.readFileSync("/usr/src/app/adrianjlane-public.pem")
};

const port = 3000;

app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log('REQ BODY', req.body);
  next();
});

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    database = database.db("storage-api")
    require('./app/routes')(app, database);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
    https.createServer(options, app).listen(443);
});

