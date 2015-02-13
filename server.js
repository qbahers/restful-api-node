// Base Setup
// ----------

// Call the packages we need
var express    = require('express');	// call express
var app        = express();		// define our app using express
var bodyParser = require('body-parser');

// Configure app to use bodyParser().
// This will let us get the data from a POST.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	// set our port

// Routes for our API
// ------------------

var router = express.Router();		// get an instance of the express Router

// Test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// More routes for our API will happen here

// Register Our Routes
// -------------------
// All of our routes will be prefixed wit /api
app.use('/api', router);

// Start The Server
app.listen(port);
console.log('Magic happens on port ' + port);
