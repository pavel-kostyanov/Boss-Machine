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


app.get('/api/minions', (req, res) =>{
  const allMinions = db.getAllFromDatabase('minions');
  if(allMinions){
    res.status(201).send(allMinions);
 }else{
    res.status(404).send();
  }
});

app.get('/api/minions/:minionId', (req, res, next) =>{
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  if(minion){
    res.status(201).send(minion);
 }else{
    res.status(404).send();
  }

});

app.get('/api/minions/:minionId/work', (req, res, next) =>{
  console.log(req.params.minionId);
  const works = db.getFromDatabaseById('work', req.params.minionId);

 //  if(work){
 //    res.status(201).send(work);
 // }else{
 //    res.status(404).send();
 //  }
});

app.post('/api/minions', (req, res, next) => {
  const newMinionObject = req.body;
  const minionId = db.addToDatabase ('minions', newMinionObject);
    if(minionId){
     res.status(201).send(minionId);
   }else{
     res.status(404).send();
   }
});

app.put('/api/minions/:minionId', (req, res) =>{
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    if(updatedMinion){
      res.status(201).send(updatedMinion);
    }else{
      res.status(404).send();
    }
});

app.delete('/api/minions/:minionId', (req, res) =>{
  const result = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if(result){
      res.status(201).send(result);
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

app.get('/api/ideas/:ideaId', (req, res) =>{
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if(idea){
    res.status(201).send(idea);
 }else{
    res.status(404).send();
  }
});

app.post('/api/ideas', (req, res, next) => {
  const newIdeaObject = req.body;
  const ideaId = db.addToDatabase ('ideas', newIdeaObject);
    if(ideaId){
     res.status(201).send(ideaId);
   }else{
     res.status(404).send();
   }
});

app.put('/api/ideas/:ideaId', (req, res) =>{
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    if(updatedIdea){
      res.status(201).send(updatedIdea);
    }else{
      res.status(404).send();
    }
});

app.delete('/api/ideas/:ideaId', (req, res) =>{
  const result = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(result){
      res.status(201).send(result);
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

app.post('/api/meetings', (req, res, next) => {
  const newMeeting = db.createMeeting ();
    if(newMeeting){
     res.status(201).send(newMeeting);
   }else{
     res.status(404).send();
   }
});

app.delete('/api/meetings', (req, res) =>{
  const result = db.deleteAllFromDatabase('meetings');
    if(result){
      res.status(201).send(result);
    }else{
      res.status(404).send();
    }
});

app.post('/api/minions/:minionId/work', (req, res, next) => {
   const newWork = db.addToDatabase ('work', req.body);
   console.log(newWork);
    if(newWork){
     res.status(201).send(newWork);
   }else{
     res.status(404).send();
   }
});
// module.exports = app;
app.listen(4001, () => {console.log('app is running on port 4001')});
