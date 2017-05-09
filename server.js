/**
 * Created by Piyu on 5/19/2017.
 */
/*var connect = require('connect');
var port = 3000;
connect.createServer
*/
const express = require('express');
const bodyParser= require('body-parser');
const fs = require('fs');
var validator = require('express-validator');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

var mongojs = require('mongojs');
var db = mongojs('quotes', ['quotes']);
var FB = require('fb');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(validator());

           ///For index.html*/
    app.post('/post_quote', (req, res) =>{
        console.log("Posting Quote to DBs");
        console.log(req.body);
      
        db.quotes.insert(req.body, function(err, doc)
            {
                console.log(req.body.saying);
                console.log(req.body.by);
                console.log(req.body.genre);
                res.redirect('/');
            });
    });

   
//////////to do here
    app.post('/get_quote', (req, res) => {
        console.log("Getting Quote of Genre :::");
        console.log(req.body.genre);
        //res.render('company_unregistered.ejs');  
         db.quotes.find().toArray((err, result) => {
         if (err) return console.log(err)
        // renders index.ejs
         res.render('get_quotes.ejs', {output: result})
        });
    });

app.post('/post_fb', (req, res) => {
        FB.setAccessToken('access_token');
 
        FB.api('me/photos', 'post', { source: fs.createReadStream('my-vacation.jpg'), caption: 'My vacation' }, function (res) {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
          }
          console.log('Post Id: ' + res.post_id);
        });

       /* FB.api('me/photos', 'post', { source: { value: photoBuffer, options: { contentType: 'image/jpeg' } }, caption: 'My vacation' }, function (res) {
          if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
          }
          console.log('Post Id: ' + res.post_id);
        });*/
    
});


app.listen(3000);
console.log("Server running on port 3000")
