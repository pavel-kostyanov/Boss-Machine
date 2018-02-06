const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');
const app = require('../server.js');

const minionsRouter = express.Router();



minionsRouter.get('/', (req, res) =>{
  const allMinions = db.getAllFromDatabase('minions');
  if(allMinions){
    res.status(200).send(allMinions);
 }else{
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId', (req, res, next) =>{
  const minion = db.getFromDatabaseById('minions', req.params.minionId);

  if(minion){
    res.status(200).send(minion);
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
  const result = db.deleteFromDatabasebyId('minions', req.params.minionId);
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
 //  if(work.length < 1){
 //  res.status(404).send('invalid minion ID');
 // }else{
      res.status(200).send(work);
  //}
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) =>{
  console.log(req.minionId + ' ' + req.params.workId);
  const result = db.deleteWorkFromDatabasebyId('work', req.minionId, req.params.workId);

    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

minionsRouter.put('/:minionId/work/:workId', (req, res) =>{
  const updatedWork = db.updateWorkInstanceInDatabase('work', req.params.minionId, req.params.workId, req.body);
  //console.log(updatedWork);
    if(updatedWork !== -1){
      res.status(201).send(updatedWork);
    }else if(updatedWork = -1){
      res.status(400).send();
    }else{
      res.status(404).send();
    }
});


module.exports = minionsRouter;
