
var JsonDB = require('node-json-db');
var db;

var exports = module.exports = {};

var users = [{}];

exports.init = function(){
	// {userId:"test1", password:"test1", clientId:"test1", clientSecret:"test1", grantType:"password", token:{}}
	db = new JsonDB("./oauth/tokenDataBase", true, false);
	db.reload();
	users = db.getData("/users");

	console.log(users);
};

exports.getClient = function(clientId, clientSecret, callback) {  

  console.log("call getClient() ");

  var Client = {"id":"", "redirectUris":"", "accessTokenLifetime":3600, "refreshTokenLifetime":3600, "grants":['authorization_code', 'password', 'refresh_token', 'client_credentials']};

  // Searching clientId
  for(var index=0; index < users.length; index++){
      var object = users[index];

      if(object.clientId == clientId){
        Client.id = clientId;
      }
  }

  callback(false, Client);
};

exports.grantTypeAllowed = function(clientId, grantType, callback) {

  console.log("call grantTypeAllowed() ");

  // Searching clientId
  for(var index=0; index < users.length; index++){
      var object = users[index];

      if(object.clientId == clientId){
       	if (object.grantType == 'password') {
		      callback(false, true);
       		return;
       	}else if(object.grantType == 'client_credentials') {
          callback(false, true);
          return;
        }
      }
  }

  callback(false, false);
};

exports.getUser = function(username, password, callback) {
	console.log("call getUser() ");

  // Searching clientId
  for(var index=0; index < users.length; index++){
      var object = users[index];

      if(object.userId == username){      
 			callback(null, object.userId);
       		return;
      }
  }

  callback(false);
};


exports.saveAccessToken = function(token, clientId, expires, userId, callback){
  console.log("call saveAccessToken() ");
  console.log("token :"+token);
  
  // Searching clientId
  for(var index=0; index < users.length; index++){
      var object = users[index];

      if(object.userId == userId){      
		object.token.bearerToken = token;
		object.token.userId = userId;		
		object.token.clientId= clientId;
		object.token.expires = expires;	

		users[index] = object;

		db.push("/users", users);
		db.save();

 		callback(false);
       	return;
      }
  }

  callback(true);
};

exports.getAccessToken = function(bearerToken, callback) {

	console.log("call getAccessToken() ");
	console.log("bearerToken : "+bearerToken);

  // Searching token
  for(var index=0; index < users.length; index++){
      var token = users[index].token;

      if(token.bearerToken == bearerToken){
       		callback(false, token);
       		return;
      }
  }

  callback(false, null);
};


exports.getUserFromClient = function(clientId, clientSecret, callback) {
  console.log("call getUserFromClient() ");
  console.log("clientId : "+clientId);
  console.log("clientSecret : "+clientSecret);

  // Searching token
  for(var index=0; index < users.length; index++){
      var user_clientId = users[index].clientId;
      var userId = users[index].userId;
      
      if(user_clientId == clientId){
          callback(false, userId);
          return;
      }
  }

  callback(false, null);
}


function revokeToken(token){
	console.log("call revokeToken() ");

	var Token = {};

	return Token;
}

function saveToken(token, client, user){
	console.log("call saveToken() ");

	var Token = {};

	return Token;
}

function getAuthorizationCode(code){
	console.log("call getAuthorizationCode() ");

	var Token = {};

	return Token;
}

function saveAuthorizationCode(code, client, user){
	console.log("call saveAuthorizationCode() ");

	var Token = {};

	return Token;
}

function getRefreshToken(refreshToken) {
	console.log("call getRefreshToken() ");

	var Token = {};

	return Token;	
}