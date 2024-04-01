const express = require('express');
const { Module } = require('module');
const router = express.Router();

//return JSON object on everything!

//POST new participant
router.post('/participants/add', async function (req, res, next ) {
    //POST participant
    //email(PK), fname,lname,date,active
    //fragment work: company name, salary, currency
    //fragment home: country, city
    res.end();
});

//PUT change participant of email
router.put('/participants/:email', async function ( req, res, next ) {
    //same as POST, validate all
    res.end();
});

//DELETE "soft-delete" participant of email
router.delete('/participants/:email', async function ( req, res, next ) {
    //change "active" status, do not delete
    res.end();
});

module.exports = router;