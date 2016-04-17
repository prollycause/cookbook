var express = require('express'), app = express(),
mongoose = require('mongoose'), morgan = require('morgan'),
bodyParser = require('body-parser'), methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/cookbook'); 

app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev')); // log requests
app.use(bodyParser.urlencoded({'extended':'true'})); // encode urls
app.use(bodyParser.json());  // use json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse vnd.api as json
app.use(methodOverride());

var port = process.env.PORT || 9001;
// model

var Schema = mongoose.Schema;

var cookBookSchema = new Schema({
	name: String,
	author: String,
	ingredients: String,
	instructions: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	likes: Number
});

var CookBook = mongoose.model('CookBook', cookBookSchema);
	


app.get('/test', function(req, res) {
    CookBook.find(function(err, recipes) {
    	res.json(recipes);
    });
});

app.get('/api/recipe', function(req, res) {
    CookBook.find(function(err, recipes) {
    	if(err) 
    		res.send(err)
    	res.json(recipes);
    });
});

// CookBook.remove({});

app.post('/api/recipe', function(req, res) {
    CookBook.create({
        name : req.body.name,
        author : req.body.author,
        ingredients : req.body.ingredients,
        instructions : req.body.instructions,
        done : false
    }, function(err, cook) {
        if (err)
            res.send(err);
        // get and return all the data after you create more
        CookBook.find(function(err, recipes) {
            if (err)
                res.send(err)
            res.json(recipes);
        });
    });
});


app.delete('/api/recipe/', function(req, res) {
    CookBook.find('{*}').remove().exec();
    
    
});

app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); 

          });

app.listen(port);
console.log("Server running on port " + port);