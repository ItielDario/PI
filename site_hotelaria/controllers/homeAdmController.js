
class HomeAdmController {

    constructor() {

    }

    homeView(req, res) {
        res.render('homeAdm/index', {layout: 'homeAdm/index'});
    }
}


module.exports = HomeAdmController;