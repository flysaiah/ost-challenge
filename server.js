const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const router = express.Router();
const config = require('./server/config/database.js')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;

mongoose.connect(config.uri, {}, (err) => {
  if (err) {
    console.log('Could not connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Bypass CORS restrictions
app.use(cors());

// API files for interacting with MongoDB
const mainAPI = require('./server/routes/mainAPI')(router);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// API locations
app.use('/api', mainAPI);

//Set Port
const port = process.env.PORT || '3131';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
