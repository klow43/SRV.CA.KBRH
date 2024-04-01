const express = require('express');
const router = express.Router();

//return JSON object on everything!

//GET participant list ALL, delete and no delete
router.get('/participants', function(req, res, next) {
//get list of ALL participants, only names?
  res.end();
});

//GET participant list ACTIVE
router.get('/participants/details', function(req, res, next) {
//get list of fname,lname of all participants not "deleted"/active
  res.end();
});

//GET participant list "DELETED", soft-delete
router.get('/participants/deleted', function(req, res, next){
//get participants fname,lname of all participants "deleted"/not active
  res.end();
});

module.exports = router;
