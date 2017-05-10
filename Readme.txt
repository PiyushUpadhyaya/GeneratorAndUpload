Modules required before running the app: 
-bodyParser
-https
-mongojs
-request
-passport
-canvas
-text2png
-passport-oauth
-fs
-form-data
-fb
RUNS AT LOCALHOST : 3000 Port number
***************************************************instructions********************************************************
1. authToken needs to be changed as the entered would have expired by then (in every 6 hour). Please enter the access token of any other FB account.

2. /post_quote : Allows to post a quote into the database. (if running first time then database needs to be filled with quotes). On insertion of the quote,
				 page is redirected to the initial home page.
				 
3. Database used is MongoDB and is named as 'quotes'. The collection storing the quotes is too named 'quotes'.

4./get_quote : On clicking a random quote is fetched from the MongoDB stored quotes. JAVASCRipt random function is used to generate a random index in the matching 
				genre results of the quotes. This page takes to an Express JavaScript template named  'get_quotes.ejs'.
			Then it saves the output result as a png file using text2png module.
			
5. /post_fb :the above requested page asks to publish the image on facebook. On clicking it the page redirects to homepage with posting the quote image on Facebook access token's 
			profile.
			Request package  posts the message with image as caption on FB. And redirects to the home page.
6. /post_insta: Still under construction.


***************************************************Directory Structure******************************************************
1.Views: Contains all the  EJS templates (models for the pages/requests)
2.Public: Contains main index.html file.

***************************************************Run App******************************************************
1. Go to the parent folder.
2. Run using command : node server.js
3. Open Browser and type : localhost:3000 and press enter.