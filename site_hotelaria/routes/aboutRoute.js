const express = require('express');
const AboutController = require('../controllers/aboutController');

class AboutRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrl = new AboutController();
        this.#router.get('/', ctrl.aboutView);
    }
}

module.exports = AboutRoute;