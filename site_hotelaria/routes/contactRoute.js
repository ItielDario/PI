const express = require('express');
const ContactController = require('../controllers/contactController');

class ContactRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.router = express.Router();
        let ctrl = new ContactController();

        this.#router.get('/', ctrl.contactView);
   }
}

module.exports = ContactRoute;