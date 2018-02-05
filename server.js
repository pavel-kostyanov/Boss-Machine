const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./server/db.js');

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4001;

const apiRouter = require('./server/api.js');
app.use('/api', apiRouter);


if (!module.parent) {
  app.listen(PORT, console.log('app is running on port 4001'));
 }

module.exports = app;
