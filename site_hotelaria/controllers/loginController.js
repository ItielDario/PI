class LoginController {

    loginView(req, res) {
        res.render('login/login', {layout: 'login/login'});
    }
}

module.exports = LoginController;