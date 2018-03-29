var express = require('express');


//  create our app
var app = express();


app.use(express.static('public'));


app.listen(process.env.PORT || 3000, function(){

	console.log('Express server is up on port 3000')
});
