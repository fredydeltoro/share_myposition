var appController = function (server) {

	var cordenadas = {};

	var isntLoggedIn = function (req, res, next) {
		if(!req.session.user){
			res.redirect('/');
			return;
		}

		next();
	};

	server.get('/app', isntLoggedIn, function  (req, res) {

		res.render('app',{
			user:req.session.user
		});

	});

	server.get('/compartir', function (req, res) {

		server.io.route('position', function (data) {
			cordenadas = {
					latitude : data.data.lat,
					longitude: data.data.lng,
					address  : data.data.add,
					user     : req.session.user
				}

			server.io.broadcast('aver',cordenadas);
		});
			res.redirect('/app');
	});
}

module.exports = appController;