const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');

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
     res.status(404).send();
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

minionsRouter.get('/:minionId/work', (req, res) =>{
  // const minionID = Number(req.params.minionId);
  // console.log(minionID);
  // console.log(Number.isInteger(minionID));
  const work = db.getWorkFromDatabaseById('work', req.params.minionId);


  if(work){
    res.status(200).send(work);
 }else{
    res.status(404).send();
  }
});

minionsRouter.post('/:minionId/work', (req, res) => {
   const newWork = db.addToDatabase ('work', req.body);
    if(newWork){
     res.status(201).send(newWork);
   }else{
     res.status(404).send();
   }
});

minionsRouter.put('/:minionId/work/:workId', (req, res) =>{
  const updatedWork = db.updateWorkInstanceInDatabase('work', req.params.minionId, req.params.workId, req.body);
    if(updatedWork){
      res.status(201).send(updatedWork);
    }else if(updatedWork = null){
      res.status(400).send();
    }else{
      res.status(404).send();
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) =>{
  const result = db.deleteWorkFromDatabasebyId('work', req.params.minionId, req.params.workId);
    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

module.exports = minionsRouter;
