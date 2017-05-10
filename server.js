/**
 * Created by Piyu on 5/19/2017.
 */
/*var connect = require('connect');
var port = 3000;
connect.createServer
*/
const express = require('express');
const bodyParser= require('body-parser');
var validator = require('express-validator');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
var https = require('https');
var mongojs = require('mongojs');
var db = mongojs('quotes', ['quotes']);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(validator());
var request = require('request');
var passport = require('passport');
var OAuthStrategy = require('passport-oauth').OAuthStrategy;
//var canvas = require('canvas');
var fs = require('fs');
//var text2png = require('text2png');

var FormData = require('form-data');
var FB = require('fb');
var request = require('request');
var authToken = "EAACEdEose0cBAFElCyIdQljRtxLBCZADxwvWiwhjrmjdEjpetZAVzx1NK43VNiNoZBSHWshEej37s5mbrHD2jz69uPpvs0DZAZBTrrfvpSW4CQeFK0Xlh4KZBZAYvFMS8TvovV6aDxBOMZCkqO1Ee6OBWiD8ZAr9krQXA1TO0vztHiPmZCJwsNtON2N3ZBblPDpitIZD";


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
         db.quotes.find().toArray((err, result) => {
         if (err) return console.log(err)
         res.render('get_quotes.ejs', {output: result})
       //  fs.writeFileSync('upload.png',text2png(output,{textColor: 'blue'}));
        });
    });

///post on facebook
    app.post('/post_fb', (req, res) => {
        console.log("Posting on Facebook");
    request.post(
        {
            url: 'https://graph.facebook.com/me/photos?access_token=' + authToken, 
            formData: {
                message: "DaFUCK! Please Chal Jaa Bhai, Allah ke qahar se darr",
                source: fs.createReadStream("./test2.jpg") 
                    }
        }
    );
        console.log("outta");
        res.redirect('/');
});
///post on insta
app.post('/post_insta', (req, res) => {
        console.log("Posting on insta");
         res.render('rollback.ejs');
    });
app.listen(3000);
console.log("Server running on port 3000")
