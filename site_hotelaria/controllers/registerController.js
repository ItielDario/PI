class RegisterController {

    registerView(req, res) {
        res.render('register/register', {layout: 'register/register'});
    }
}

module.exports = RegisterController;