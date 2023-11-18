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

const conexao = mysql.createPool({
    host: '132.226.245.178', //endereço do nosso banco de dados na nuvem
    port: '3306',
    database: 'PFS1_10442221580', //a database de cada um de vocês possui a nomenclatura DB_(RA)
    user: '10442221580', // usuario e senha de cada um de vocês é o RA
    password: '10442221580',
});

conexao.query( 'SELECT * FROM tb_fornecedores', function (error, results, fields) {
    if (error) 
        console.log(error);
    else 
        console.log(results);
});

const app = express();
const host = 'localhost';
const port = '5012';

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