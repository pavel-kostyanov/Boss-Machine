const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');
const app = require('../server.js');

const minionsRouter = express.Router();

minionsRouter.param('minionId', (req, res, next, id) => {
  if(id == Number(id)){
    req.minionId = id;
    next();
  }else{
    res.status(404).send('minion ID is not a number');
  }
});

minionsRouter.get('/', (req, res) =>{
  const allMinions = db.getAllFromDatabase('minions');
  if(allMinions){
    res.status(200).send(allMinions);
 }else{
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId', (req, res, next) =>{
  const minion = db.getFromDatabaseById('minions', req.minionId);
  if(minion){
    res.send(minion);
  }else{
    res.status(404).send();
  }
});

minionsRouter.post('/', (req, res, next) => {
  const newMinionObject = req.body;
  const minionId = db.addToDatabase ('minions', newMinionObject);
    if(minionId){
     res.status(201).send(minionId);
   }else{
     res.status(400).send();
   }
});

minionsRouter.put('/:minionId', (req, res) =>{
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    if(updatedMinion){
      res.status(201).send(updatedMinion);
    }else{
      res.status(404).send();
    }
});

minionsRouter.delete('/:minionId', (req, res) =>{
  const result = db.deleteFromDatabasebyId('minions', req.minionId);
    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

minionsRouter.post('/:minionId/work', (req, res) => {
   const newWork = db.addToDatabase ('work', req.body);
    if(newWork){
     res.status(201).send(newWork);
   }else{
     res.status(400).send();
   }
});

minionsRouter.param('minionId', (req, res, next, id) => {
  const minionId = Number(id);
  if(!minionId){
    res.status(404).send('minion ID is not a number');
  }else{
    req.minionId = id;
    next();
  }
});

minionsRouter.get('/:minionId/work', (req, res) =>{
  const work = db.getWorkFromDatabaseById('work', req.minionId);
       res.status(200).send(work);
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) =>{
    const result = db.deleteWorkFromDatabasebyId('work', req.minionId, req.params.workId);
    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res) =>{
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  }else{
  const updatedWork = db.updateWorkInstanceInDatabase('work', req.minionId, req.params.workId, req.body);
    res.status(201).send(updatedWork);
    }
});


module.exports = minionsRouter;
