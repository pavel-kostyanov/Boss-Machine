const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./server/db.js');

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    var headers = {};
    "Access-Control-Allow-Origin", ["*"];
    "Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS";
    "Access-Control-Allow-Credentials", false;
    "Access-Control-Max-Age", '86400'; // 24 hours
    "Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.set(headers);
    res.status(200);

  }
  // res.setHeader('Access-Control-Allow-Origin', null);
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      next();
});

app.post('/api/minions', (req, res, next) => {

  const newMinionObject = req.body;
  //res.status(201).send(newMinionObject);
  const minionId = db.addToDatabase ('minions', newMinionObject);

   if(minionId){
     res.status(201).send(minionId);
  }else{
     res.status(404).send();
   }
});

app.get('/api/minions', (req, res) =>{
  const allMinions = db.getAllFromDatabase('minions');
  if(allMinions){
    res.status(201).send(allMinions);
 }else{
    res.status(404).send();
  }
});

app.get('/api/minions/:minionId', (req, res) =>{
  const minion = db.getFromDatabaseById(req.params);
  if(minion){
    res.status(201).send(minion);
 }else{
    res.status(404).send();
  }
});

app.get('/api/ideas', (req, res) =>{
  const allIdeas = db.getAllFromDatabase('ideas');
  if(allIdeas){
    res.status(201).send(allIdeas);
 }else{
    res.status(404).send();
  }
});

app.get('/api/meetings', (req, res) =>{
  const allMeetings = db.getAllFromDatabase('meetings');
  if(allMeetings){
    res.status(201).send(allMeetings);
 }else{
    res.status(404).send();
  }
});



// module.exports = app;
app.listen(4001, () => {console.log('app is running on port 4001')});
