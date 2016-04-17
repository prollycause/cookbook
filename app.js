var express = require('express'), app = express(),
mongoose = require('mongoose'), morgan = require('morgan'),
bodyParser = require('body-parser'), methodOverride = require('method-override'),
router = express.Router(), parseUrlEncoded = bodyParser.urlencoded({'extended':'true'});

var recipe = require('./routes/recipe.js');
var port = process.env.PORT || 9001;


	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.urlencoded({'extended':'true'})); // encode urls
	app.use(bodyParser.json());  // use json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse vnd.api as json
	app.use(methodOverride());
	app.use(morgan('dev'));
	app.use('/api/recipe', recipe);

app.get('*', function(req, res) {
    res.sendFile('./public/index.html'); 
});	

app.listen(port);
console.log('Listening on: ' + port);