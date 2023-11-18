const express = require('express');
const BookingController = require('../controllers/bookingController');

class BookingRoute  {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrl = new BookingController();

        this.#router.get('/', ctrl.bookingView);
    }
}

module.exports = BookingRoute;