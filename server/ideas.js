const express = require('express');
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router();

ideasRouter.param('ideaId', (req, res, next, id) => {
  if(id == Number(id)){
    req.ideaId = id;
    next();
  }else{
    res.status(404).send('minion ID is not a number');
  }
})

ideasRouter.get('/', (req, res) =>{
  const allIdeas = db.getAllFromDatabase('ideas');
  if(allIdeas){
    res.status(200).send(allIdeas);
 }else{
    res.status(404).send();
  }
});

ideasRouter.get('/:ideaId', (req, res) =>{
  const idea = db.getFromDatabaseById('ideas', req.ideaId);
  if(idea){
    res.status(200).send(idea);
 }else{
    res.status(404).send();
  }
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdeaObject = req.body;
  const ideaId = db.addToDatabase ('ideas', newIdeaObject);
    if(ideaId){
     res.status(201).send(ideaId);
   }else{
     res.status(404).send();
   }
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) =>{
  if(req.params.ideaId !== req.body.id) {
    res.status(404).send();
  }else{
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
  }
});

ideasRouter.delete('/:ideaId', (req, res) =>{
  const result = db.deleteFromDatabasebyId('ideas', req.ideaId);
    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

module.exports = ideasRouter;
