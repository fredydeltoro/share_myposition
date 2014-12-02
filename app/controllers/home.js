var homeController = function(server) {

	var isLoggedIn = function (req, res, next) {
			if(req.session.user){
				res.redirect('/app');
				return;
			}

			next();
		};

	server.get('/', isLoggedIn, function (req, res) {
		res.render('home')
	});
}

module.exports = homeController;