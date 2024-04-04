Karen Beate Røstvik Høiskar SRV CA, klow43
===========================================

## App usage
App created for maintaining participants.(Census)  

POST, PUT, DELETE, GET single participant.  
GET: 
- work  
- home  
- details  

GET lists of participants:
- active   
- inactive  
- all  

All CRUD methods can only be implemented by authenticated user.


## Link to Cyclic.sh app
[link](https://alive-gold-button.cyclic.app)

## POST and PUT object structure :
POST and PUT object is case sensitive and keys must be sent with lowercase only, see structure below on what is accepted as POST and PUT body:

    {  
        email : must contain @ and .  
        firstname : must be letters only, spacing is allowed  
        lastname : must be letters only, spacing is allowed  
        date : must be in format with specific seperating forward slash "YYYY/MM/DD"  
        companyname : must not be empty or null  
        salary : must be type number  
        currency : must be in type currency initals fx ZAR, must not be longer then 3 letters   
        country : must be letters only, spacing is allowed  
        city : must be letters only, spacing is allowed  
     } 

-----------------------------------------------------
## .env file contains:
CYCLIC_DB   
CYCLIC_BUCKET_NAME  
ISSUER_BASE_URL  
 
AWS_REGION  
AWS_ACCESS_KEY_ID  
AWS_SECRET_ACCESS_KEY  
AWS_SESSION_TOKEN  

---------------------------------------------
# tech stack
JavaScript  
ExpressJS  
@cyclic.sh/dynamodb  
ejs  
dotenv  
