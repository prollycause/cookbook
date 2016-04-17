var express = require('express'),mongoose = require('mongoose'), router = express.Router();
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
mongoose.connect('mongodb://localhost:27017/cookbook'); 

router.route('/')

.get(function(req, res) {
    CookBook.find(function(err, recipes) {
    	if(err) 
    		res.send(err)
    	res.json(recipes);
    });
})

.post(function(req, res) {
    CookBook.create({ name : req.body.name,
    				author : req.body.author,
        			ingredients : req.body.ingredients,
        			instructions : req.body.instructions },
     function(err, cook) {
        if (err)
            res.send(err);
        CookBook.find(function(err, recipes) {
            if (err)
                res.send(err)
            res.json(recipes);
        });
    });
})

.delete(function(req, res) {
    CookBook.find('{*}').remove().exec(); 
});

module.exports = router;