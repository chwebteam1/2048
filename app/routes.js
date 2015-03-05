// set connections to the collections in hug
var DBrecords = require('./models/records');


// -------
// general
// -------
var badRequestError = 400;



module.exports = function(app) {

	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------
	// ---------------------------------- API ----------------------------------
	// -------------------------------------------------------------------------
	// -------------------------------------------------------------------------

	// -----------
	// application
	// -----------


	app.post('/score', function(req, res) {

		DBrecords.remove(function(){}); // empties the score table

		for (var i = 0; i < req.body.length; i++){

			DBrecords.create(req.body[i],function(err){
				if(err)
					console.log(err);
			});

		}

	});

	app.get('/score', function(req, res) {
		DBrecords.find(function(err,data){
			console.log(data);
			res.json(data);
		});
	});
	// -----------
	// application
	// -----------

	app.get('*', function(req, res) {
		res.send('index.html');
	});
}