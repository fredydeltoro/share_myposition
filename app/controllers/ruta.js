var rutaController = function (server) {

	var isntLoggedIn = function (req, res, next) {
		if(!req.session.user){
			res.redirect('/');
			return;
		}

		next();
	};

	server.get('/ruta', isntLoggedIn, function (req, res) {
		res.render('ruta', {
			user:req.session.user
		});
	});
}

module.exports = rutaController;