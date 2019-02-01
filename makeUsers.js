
// init userData;

var JsonDB = require('node-json-db');
var db = new JsonDB("./oauth/tokenDataBase", true, false);

db.reload();

 var users = [
    	{userId:"test1", password:"test1", clientId:"test1", clientSecret:"test1", grantType:"password", token:{}},
    	{userId:"test2", password:"test2", clientId:"test2", clientSecret:"test2", grantType:"client_credentials", token:{}}
];

db.push("/users", users);	
db.save();
