const express = require('express');
const ServicesController = require('../controllers/servicesController');

class ServicesRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrl = new ServicesController();

        this.#router.get('/', ctrl.servicesView);
    }
}

module.exports = ServicesRoute;