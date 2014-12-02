var sessionsController = function (server,users) {

	server.post('/log-in', function (req, res) {
		req.session.user = req.body.username;
		res.redirect('/app');
	});

	server.get('/log-out',function (req, res) {
		req.session.destroy();
		res.redirect('/');
	});
}

module.exports = sessionsController;