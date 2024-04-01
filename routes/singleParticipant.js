const express = require('express');
const router = express.Router();

//return JSON object on everything!
//only participant NOT DELETED

//GET participent of email, personal details
router.get('/participants/details/:email', async function( req, res, next ) {
//GET fname,lname,active of email(not deleted)
res.end();
});


//GET participant of email, work details
router.get('/participants/work/:email', async function( req, res, next ) {
//GET company name, salary, currency(not deleted)
res.end();
});


//GET participant of email, home details
router.get('/participants/home/:email', async function( req, res, next ) {
//GET country, city of email (not deleted)
res.end();
});

module.exports = router;