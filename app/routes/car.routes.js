const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
// const UserController = require('./controllers/user.controller');
const CarController = require('../controllers/car.controller');

// User Authentication Routes
// router.post('/signup', UserController.signup);
// router.post('/login', UserController.login);

// Car-related Routes
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/cars', CarController.browse);
    app.post('/cars/bookmark', [authJwt.verifyToken], CarController.bookmark);
    app.get('/cars/cart', [authJwt.verifyToken], CarController.getSavedCar);
    //getSavedCar
    app.get('/cars/search', CarController.search);

}
