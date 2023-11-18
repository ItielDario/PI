const express = require('express');
const RegisterController = require('../controllers/registerController');


class RegistertRoute {

    #router;


    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrl = new RegisterController();

        this.#router.get('/', ctrl.registerView);
    }
}

module.exports = RegistertRoute;