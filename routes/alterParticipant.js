const express = require('express');
const router = express.Router();

//validator for POST and PUT object to account for presence of all required fields and correct format.
const validateInput = require('../middleware/validationMiddleware');

const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.CYCLIC_DB);
let participants = db.collection('participants');


//POST new participant, default active : 1(means active by default)
router.post('/participants/add', validateInput, async function (req, res, next ) {
    await participants.set( req.body.email, {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        date : req.body.date,
        active : 1
        }, { $index : ['active']
    });
    await participants.item(req.body.email)
        .fragment('work').set({
            company : req.body.companyname,
            salary : req.body.salary,
            currency : req.body.currency
         }); 
    await participants.item(req.body.email)
         .fragment('home').set({
            country : req.body.country,
            city : req.body.city
        });
    res.status(200).json({ statusCode : 200, message : 'Participant created'});
});

//PUT change participant of email
router.put('/participants/:email', validateInput, async function ( req, res, next ) {
    try{
        await participants.set( req.params.email, {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            date : req.body.date,
            active : 1
            }, { $index : ['active']
        });
        await participants.item(req.params.email)
            .fragment('work').set({
                company : req.body.companyname,
                salary : req.body.salary,
                currency : req.body.currency
             }); 
        await participants.item(req.params.email)
             .fragment('home').set({
                country : req.body.country,
                city : req.body.city
            })        
    }catch(err){ console.log(err); res.status(404).json({ statusCode : 404, error : 'participant of email not found.'})}
    res.status(200).json({ statusCode : 200, message : 'Participant altered.'});
});

//DELETE "soft-delete" participant of email
router.delete('/participants/:email', async function ( req, res, next ) {
    //change "active" status, do not delete
    const email = /^(?=.*@)(?=.*\.).+$/
    if( !email.test(req.params.email) ){
        return res.status(400).json({ status: 404, error : 'email in parameters incorrect'})
    }
    try{
        await participants.set( req.params.email, {
            active : 0
        })
    }
    catch(err){ console.log(err); res.status(500).json({ statusCode : 500, error : 'Unable to update database, please try again later.'}) };

    res.status(200).json({ statusCode : 200, message : 'Participant of provided email active status altered to inactive.'})
});

module.exports = router;