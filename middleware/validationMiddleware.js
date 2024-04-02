const textOnly = /^[a-zA-Z ]*$/;
const date = /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;
const email = /^(?=.*@)(?=.*\.).+$/
//date =  ^\d{4}\/\d{2}\/\d{2}$


//validation for POST and PUT participants: alterparticipants.js
function validateInput(req, res, next){
    if(!req.body.email && !req.params.email){
        return res.res.status(400).json({ statusCode : 400, error : 'Email must be provided' });
    }

    let mail = req.body.email ? req.body.email : req.params.email;

    if( mail == "" || !email.test(mail)){ 
        return res.status(400).json({ statusCode : 400, error : 'Email must be in correct format. Example: "fredflintstone@bedrock.com"' }); 
            }
    if( !req.body.firstname || req.body.firstname == "" || !textOnly.test(req.body.firstname)) { 
        return res.status(400).json({ statusCode : 400, error : 'Firstname must be provided and can be letters only. Example : "Fred"' }); 
            }
    if( !req.body.lastname || req.body.lastname == "" || !textOnly.test(req.body.lastname)) { 
        return res.status(400).json({ statusCode : 400, error : 'Lastname must be provided and can be letters only. Example : "Flintstone"' }); 
            }
    if( !req.body.date || req.body.date == "" || !date.test(req.body.date)){
        return res.status(400).json({ statusCode : 400, error : "Date must be provided and in format with specific forward slash as seperation : 'YYYY/MM/DD' "})
            }
    if( !req.body.companyname || req.body.companyname == ""){ 
        return res.status(400).json({ statusCode : 400, error : 'Company name must be provided and in letters only, spacing allowed. Example : Slate Rock and Gravel Company' }); 
            }
    if( !req.body.salary || typeof(req.body.salary) != 'number') { 
        return res.status(400).json({ statusCode : 400, error : 'Salary must be provided and can be whole number only. Example : 1000' }); 
            }
    if( !req.body.currency || req.body.currency == "" || !textOnly.test(req.body.currency) || req.body.currency.length != 3 ) { 
        return res.status(400).json({ statusCode : 400, error : 'Currency must be provided and can be 3 letters only. Example: "USD"' }); 
            }
    if( !req.body.country || req.body.country == "" || !textOnly.test(req.body.country)) { 
        return res.status(400).json({ statusCode : 400, error : 'Country must be provided and in letters only, spacing allowed. Example : "United States"' }); 
            }
    if( !req.body.city || req.body.city == "" || !textOnly.test(req.body.city)){ 
        return res.status(400).json({ statusCode : 400, error : 'City must be provided and in letters only, spacing allowed. Example : "Bedrock"' }); 
            }
     next();
}

module.exports = validateInput;