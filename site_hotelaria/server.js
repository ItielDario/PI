const express = require('express');
const EjsLayout = require('express-ejs-layouts');
const HomeRoute = require('./routes/homeRoute');
const AboutRoute = require('./routes/aboutRoute');
const RoomsRoute = require('./routes/roomsRoute');
const BlogRoute = require('./routes/blogRoute');
const BookingRoute = require('./routes/bookingRoute');
const ServicesRoute = require('./routes/servicesRoute');
const ContactRoute = require('./routes/contactRoute');
const LoginRoute = require('./routes/loginRoute');
const RegistertRoute = require('./routes/registerRoute');
const HomeAdmRoute = require('./routes/homeAdmRoute');
var mysql = require('mysql2');

const app = express();
const host = 'localhost';
const port = '5000';

app.set('View', './views');
app.set('layout', './layout');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(EjsLayout)

let homeRota = new HomeRoute();
app.use('/', homeRota.router);

let aboutRota = new AboutRoute();
app.use('/about', aboutRota.router);

let rooomsRota = new RoomsRoute();
app.use('/rooms', rooomsRota.router);

let blogRota = new BlogRoute();
app.use('/blog', blogRota.router);

let bookingRota = new BookingRoute();
app.use('/booking', bookingRota.router);

let servicesRota = new ServicesRoute();
app.use('/services', servicesRota.router);

let contactRota = new ContactRoute();
app.use('/contact', contactRota.router);

let loginRota = new LoginRoute();
app.use('/login', loginRota.router);

let registerRota = new RegistertRoute();
app.use('/register', registerRota.router);

let homeAdmRota = new HomeAdmRoute();
app.use('/adm', homeAdmRota.router);

app.listen(port, () => {
    console.log('http://'+host+':'+port);
})