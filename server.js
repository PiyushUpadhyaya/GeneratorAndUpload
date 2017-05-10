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


var Jimp  = require('jimp');
var fs = require('fs');
var text2png = require('text2png');

var FormData = require('form-data');
var FB = require('fb');
var request = require('request');
var access_token = "EAACEdEose0cBAN8nowi0in5wllGV7qZBsEoqCAYZAPyDRbSo8e9ixGccGLitgEsgSWB0IIhmpIXDybQaZA96TxxoZCligZBZACxsC4Ejo9AD3PdAEgzlhGs5ZB7u61UK1CZAk40natLZC3qUP68ZBLcK8h5qG4t4wHAEVBiUZAUXuBKg4RnMC9mKEQmC2BszxMZBw6pZBqCt95EvQ6EhXwZB0FrsAGVZCI6qn6z5vgZD";


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
         fs.writeFileSync('upload.png',text2png(output,{textColor: 'blue'}));
        });
    });

///post on facebook
    app.post('/post_fb', (req,res) => {
         var form = new FormData();
        var options = {
            method: 'post',
            host: 'www.facebook.com',
            path: '/me/photos?access_token='+access_token,
            headers: form.getHeaders(),
        }
         var request = https.request(options,function (res) {
            console.log("Looks like something is going fine");
          //  console.log(res);
        });
        
        request.post(
            {
                url: 'https://graph.facebook.com/me/photos?access_token=' + access_token, 
                formData: {
                    message: 'message',
                    source: fs.createReadStream('/images/test.jpg') 
                }
            }, function(err, res, body) {
                var bodyJSON = JSON.parse(body);
                if(bodyJSON.error) {
                    console.log(bodyJSON.error.message);
                }
            }
        );
       /* FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            var access_token = response.authResponse.accessToken;
              console.log(access_token)
          } 
        });
        console.log("initial stage of posting data to FB");
        console.log(req.body);
            
        var form = new FormData();
        form.append('file',fs.createReadStream(__dirname+'/test.jpg'));
        form.append('message',"Gaitoo");

        var options = {
            method: 'post',
            host: 'www.facebook.com',
            path: '/me/photos?access_token='+access_token,
            headers: form.getHeaders(),
        }
        var request = https.request(options,function (res) {
            console.log("Looks like something is going fine");
          //  console.log(res);
        });
        console.log("makng form pipe")
        form.pipe(request);
        console.log("we are here out of request");
        request.on('error', function (error) {
            console.log("requestwise error on facebook")
            console.log(error);
        });*/
        
    })
app.listen(3000);
console.log("Server running on port 3000")
