const express = require('express');
const router = express.Router();

const CyclicDB = require('@cyclic.sh/dynamodb');
const db = CyclicDB(process.env.CYCLIC_DB);
let participants = db.collection('participants');

const email = /^(?=.*@)(?=.*\.).+$/


//GET participent of email, personal details(not "deleted")
router.get('/participants/details/:email', async function( req, res, next ) {
    if( !email.test(req.params.email)){
        return res.status(400).json({ statusCode : 400, error : 'Not valid email format.'})
    }
    let participant;
    let get = await participants.get(req.params.email)
    if( get.props.active == 1){  
    try{
        participant = await participants.get(req.params.email);
    }
    catch(err){console.log(err); res.status(500).json({ statusCode : 500, error : 'Could not connect to database, please try again later.'})};
        }

    if( participant == null ){ return res.status(404).json({ statusCode : 404, message : 'Email not in database, please check parameters.'})};
    
    res.status(200).json({ participant });
    //Frontend code :
    // participant.email = participant.key;
    // participant.first = participant.props.firstname
    // participant.firstName = "Firstname";
    // participant.second = participant.props.lastname;
    // participant.secondName = "Lastname";
    // participant.third = participant.props.date;
    // participant.thirdName = "Date";
    // let detailName = "details";
    // res.render('singleParticipant',{ statusCode : 200, participant, detailName});
});


//GET participant of email, work fragment(not "deleted")
router.get('/participants/work/:email', async function( req, res, next ) {
    if( !email.test(req.params.email)){
        return res.status(400).json({ statusCode : 400, error : 'Not valid email format.'})
    }
    let participant;
    let get = await participants.get(req.params.email)
    if( get.props.active == 1){
    try{   
          participant = await participants.item(req.params.email).fragment('work').get();  
    }
    catch(err){ console.log(err); res.status(500).json({ statusCode : 500, error : 'Could not connect to database, please try again later.' }); }
        }
    if( participant == null ){ return res.status(404).json({ statusCode : 404, message : 'Email not in database, please check parameters.'})};
    
   res.status(200).json({ participant });
    //Frontend code :   
    // participant.email = participant[0].parent.key;
    // participant.first = participant[0].props.currency;
    // participant.firstName = "Currency";
    // participant.second = participant[0].props.company;
    // participant.secondName = "Company";
    // participant.third = participant[0].props.salary;
    // participant.thirdName = "Salary"
    // let detailName = "work details"
    // res.render('singleParticipant',{ statusCode : 200, participant, detailName }); 
});


//GET participant of email, home fragment(not "deleted")
router.get('/participants/home/:email', async function( req, res, next ) {
    if( !email.test(req.params.email)){
        return res.status(400).json({ statusCode : 400, error : 'Not valid email format.'})
    }
    let participant;
    let get = await participants.get(req.params.email)
    if( get.props.active == 1){
    try{   
          participant = await participants.item(req.params.email).fragment('home').get();  
    }
    catch(err){ console.log(err); res.status(500).json({ statusCode : 500, error : 'Could not connect to database, please try again later.' }); }
        }
    if( participant == null ){ return res.status(404).json({ statusCode : 404, message : 'Email not in database, please check parameters.'})};
    
    res.status(200).json({ participant });
    //Frontend code :
    // participant.email = participant[0].parent.key;
    // participant.first = participant[0].props.city;
    // participant.firstName = "City";
    // participant.second = participant[0].props.country; 
    // participant.secondName = "Country"   
    // let detailName = "home details"
    // res.render('singleParticipant', { statusCode : 200, participant, detailName });   
});

module.exports = router;
