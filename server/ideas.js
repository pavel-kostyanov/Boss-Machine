const express = require('express');
const db = require('./db.js');

const ideasRouter = express.Router();

ideasRouter.get('/', (req, res) =>{
  const allIdeas = db.getAllFromDatabase('ideas');
  if(allIdeas){
    res.status(200).send(allIdeas);
 }else{
    res.status(404).send();
  }
});

ideasRouter.get('/:ideaId', (req, res) =>{
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if(idea){
    res.status(200).send(idea);
 }else{
    res.status(404).send();
  }
});

ideasRouter.post('/', (req, res, next) => {
  const newIdeaObject = req.body;
  const ideaId = db.addToDatabase ('ideas', newIdeaObject);
    if(ideaId){
     res.status(201).send(ideaId);
   }else{
     res.status(404).send();
   }
});

ideasRouter.put('/:ideaId', (req, res) =>{
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    if(updatedIdea){
      res.status(201).send(updatedIdea);
    }else{
      res.status(404).send();
    }
});

ideasRouter.delete('/:ideaId', (req, res) =>{
  const result = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

module.exports = ideasRouter;
