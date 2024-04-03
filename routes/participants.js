const express = require('express');
const router = express.Router();

const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.CYCLIC_DB);
let participants = db.collection('participants');

//GET participant list ALL, active and not active. include fname and lname
router.get('/participants', async function(req, res, next) {
let list;
try{
  list = await participants.list();
  }catch(err){ console.log(err); res.status(500).json({ statusCode : 500, error : 'Could not retrieve records from database, please try again later.'}) }
  
  res.status(200).json({ statusCode : 200, list });
});

//GET participant list ACTIVE : 1, fname, lname included.
router.get('/participants/details', async function(req, res, next) {
  let participant;
  try{
    participant = await participants.filter({ 'active' : 1});
  }catch(err){ console.log(err); res.status(500).json({ statusCode : 500, error : 'Could not retrieve records from database, please try again later.'}) }
  
  res.status(200).json({ statusCode : 200, participant });
});

//GET participant list "DELETED", ACTIVE : 0, fname, lname included.
router.get('/participants/deleted', async function(req, res, next){
  let participant;
  try{
    participant = await participants.filter({ 'active' : 0 });
  }catch(err){ console.log(err); res.status(500).json({ statusCode : 500, error : 'Could not retrieve records from database, please try again later.'}) }

  res.status(200).json({ statusCode : 200, participant });
});

module.exports = router;
