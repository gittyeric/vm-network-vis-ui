// Initialize the app
var express = require('express');

module.exports = function serveNetworkView(netViewerFactoryGenerator, viewFile, port = 3000) {
	var app = express();

	// Load ejs views for rendering HTML
	app.engine('ejs', require('ejs').renderFile);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.use(express.static('static'));

	// This is the route for the index page
	app.get('/', function (req, res) {
		let factoryPromise = netViewerFactoryGenerator();
		if (!factoryPromise.then) {
			factoryPromise = Promise.resolve(factoryPromise);
		}
		factoryPromise.then((viewFactory) => {
			const viewModel = viewFactory.newViewModel();
			console.log(viewModel);
			res.render(viewFile, {
				...viewModel,
			});
		});
	});

	// Start the server
	var server = app.listen(port, function () {
		console.log('Listening on port %d', server.address().port);
	});
}