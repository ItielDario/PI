const express = require('express');
const RoomsController = require('../controllers/roomsController')

class RoomsRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrl = new RoomsController();
        this.#router.get('/', ctrl.roomsView);
    }
}

module.exports = RoomsRoute;