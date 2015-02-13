// Base Setup
// ==========

// Call the packages we need
var express    = require('express');	  // call express
var app        = express();		  // define our app using express
var bodyParser = require('body-parser');

// Configure app to use bodyParser().
// This will let us get the data from a POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	  // set our port

var mongoose = require('mongoose');
// Connect to our database
mongoose.connect('mongodb://mongodb://localhost/test');

var Bear = require('./app/models/bear');

// Routes for our API
// ==================

var router = express.Router();		  // get an instance of the express Router

// Middleware to use for all requests
router.use(function(req, res, next) {
    // Do logging
    console.log('Something is happening');
    next(); // make sure we go to the next routes and don't stop here
});

// Test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// More routes for our API will happen here

// On routes that end in /bears
// ----------------------------

router.route('/bears')

    // Create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
    
	var bear = new Bear();	    // create a new instance of the Bear model
	bear.name = req.body.name;  // set the bears name (comes from the request)

	// save the bear and check for errors
	bear.save(function(err) {
	    if (err)
		res.send(err);

	    res.json({ message: 'Bear created!' });
	});

    })

    // Get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
	Bear.find(function(err, bears) {
	    if (err)
		res.send(err);

	    res.json(bears);
	});
    });

// Register Our Routes
// ===================
// All of our routes will be prefixed with /api
app.use('/api', router);

// Start The Server
app.listen(port);
console.log('Magic happens on port ' + port);
