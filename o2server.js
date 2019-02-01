
var model = require('./oauth/model');
model.init();

var express = require('express'),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server');
 
var app = express();
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: model, // See below for specification 
  grants: ['password','client_credentials'],
  allow: ['/devices'],
  debug: true
});
 
app.all('/oauth/access_token', app.oauth.grant());


app.get('/devices', app.oauth.authorise(), function (req, res) {

  var response = {
  	  "requestId": "7b8514e6-230d-41cc-b3c2-512bca15abf0",
 	  "error": {
      "code": "ConstraintViolationError",
      "message": "The request was malformed.",
      "target": "deviceId",
      "details": [null]
  	}
  }

  res.send(response);
});

app.get('/hi', function (req, res) {
  res.send('Public area');
});

 
app.use(app.oauth.errorHandler());
 
app.listen(3000);
console.log("Listening(3000)");