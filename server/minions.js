const express = require('express');
const app = express();
const db = require('./db.js');
const apiRouter = require('api.js');
const bodyParser = require('body-parser');

apiRouter.get('/minions', (req, res, next){
  const allMinions = db.findDataArrayByName(minions);
  console.log(allMinions);
});

apiRouter.post('/minions/new', (req, res, next){
  console.log('prishlo');
  const newMinionObject = req.body.bodyParser.json();
  console.log(newMinionObject);
  db.addToDatabase (minions, newMinionObject);
})
