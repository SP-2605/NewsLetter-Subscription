const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function(){
    console.log('Localhost activated on port 3000');
});

// -------------------------------------------------------

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
});


app.post('/', function(req, res){
    var fname = req.body.Fname;
    var lname = req.body.Lname;
    var email = req.body.Email;
    var phno = req.body.PhNo;

    var data = {
        members : [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname,
                    PHONE:phno,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    

    var options = {
        url: "https://us8.api.mailchimp.com/3.0/lists/af1ded3969",
        method: "POST",
        headers: {
            "Authorization" : "SuriyaPrasath 15a3d57555d4101e399a288a41719484-us8"
        },
        body: jsonData,
    };


    request(options, function (error, response, body){
        if (error){
            res.sendFile('Bad Error!');
        } else {
            if (response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
            } else { 
                res.sendFile(__dirname + '/failure.html');
            }
        }
    })

});


app.post('/success', function(req, res){
    res.redirect('/');
});

app.post('/failure', function(req, res){
    res.redirect('/');
});

//API Key
// 15a3d57555d4101e399a288a41719484-us8

//List
//af1ded3969