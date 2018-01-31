const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');

const minionsRouter = express.Router();

minionsRouter.get('/', (req, res) =>{
  const allMinions = db.getAllFromDatabase('minions');
  if(allMinions){
    res.status(201).send(allMinions);
 }else{
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId', (req, res, next) =>{
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  if(minion){
    res.status(201).send(minion);
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
      res.status(201).send(result);
    }else{
      res.status(404).send();
    }
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
   const newWork = db.addToDatabase ('work', req.body);
    if(newWork){
     res.status(201).send(newWork);
   }else{
     res.status(404).send();
   }
});

minionsRouter.get('/:minionId/work', (req, res, next) =>{  
  const works = db.getFromDatabaseById('work', req.params.minionId);

 //  if(work){
 //    res.status(201).send(work);
 // }else{
 //    res.status(404).send();
 //  }
});

module.exports = minionsRouter;
