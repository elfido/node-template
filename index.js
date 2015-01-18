var express = require('express'),
	swig = require('swig'),
	config_package = require("./package.json"),
	morgan = require('morgan'), //logger
	bodyParser = require('body-parser'),
	app = express(),
	configuration = {
		server: {
			port: 3001
		}
	};

var views = [
		{path: "/", html: "index"}
	];

var homeCenter = {
	initAPI: function(){
		//start routs here
	},
	initViews: function(){
		console.log("Starting UI");
		var _this = this;
		for (var i=0; i<views.length; i++){
			var view = views[i];
			app.get(view.path, function (req, res) {
				res.render(this.html, {} );
			}.bind(view));
		}
	},
	expressSetup: function(){
		morgan(':remote-addr :method :url');
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.engine('html', swig.renderFile);
		app.set('view engine', 'html');
		app.set('views', __dirname + '/views');
		app.set('view cache', false);
		swig.setDefaults({ cache: false });
		app.use(express.static(__dirname+'/public'));
	},
	init: function(){
		this.expressSetup();
		this.initAPI();
		this.initViews();
		app.listen(configuration.server.port);
		console.log('Application started on port ' + configuration.server.port);
	}
};

homeCenter.init();