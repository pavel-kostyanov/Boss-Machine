const express = require('express');
const apiRouter = express.Router();

apiRouter.options((req, res, next) => {
  //if (req.method === 'OPTIONS') {
    var headers = {};
    "Access-Control-Allow-Origin", ["*"];
    "Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS";
    "Access-Control-Allow-Credentials", false;
    "Access-Control-Max-Age", '86400'; // 24 hours
    "Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    res.set(headers);
    res.status(200);

  //}

  // res.setHeader('Access-Control-Allow-Origin', null);
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      // next();
});


const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings', meetingsRouter);

const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas', ideasRouter);

const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);

module.exports = apiRouter;
