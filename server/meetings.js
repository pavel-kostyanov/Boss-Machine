const express = require('express');
const db = require('./db.js');

const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res) =>{
  const allMeetings = db.getAllFromDatabase('meetings');
    if(allMeetings){
      res.status(200).send(allMeetings);
    }else{
      res.status(404).send();
  }
});

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = db.createMeeting ();
    if(newMeeting){
    db.addToDatabase('meetings', newMeeting);  
     res.status(201).send(newMeeting);
   }else{
     res.status(404).send();
   }
});

meetingsRouter.delete('/', (req, res) =>{
  const result = db.deleteAllFromDatabase('meetings');
    if(result){
      res.status(204).send(result);
    }else{
      res.status(404).send();
    }
});

module.exports = meetingsRouter;
