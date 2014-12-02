var express = require('express.io'),
	swig = require('swig');

var server = express();
server.http().io();
var RedisStore = require('connect-redis')(express);

server.engine('html',swig.renderFile);
server.set('view engine','html');
server.set('views','./app/views');

server.use(express.static('./public'));

server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());

	server.use(express.session({
		secret : 'freddy',
		store  : new RedisStore({})
	}));
});

var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');
var sessionsController = require('./app/controllers/sessions');
var rutaController = require('./app/controllers/ruta');

homeController(server);
appController(server);
sessionsController(server);
rutaController(server);

server.listen(80);