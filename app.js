var express = require('express');
var app = express();
require('dotenv').config();
var passport = require('passport');
var path = require('path');
var { engine } = require('express-edge');
var flash = require('connect-flash');
var breadcrumbs = require('express-breadcrumbs');

var fileUpload = require('express-fileupload');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var database = require('./config/database');
app.use(breadcrumbs.init());

database();

app.use(engine);
app.use(fileUpload())
app.set('views', `${__dirname}/views`);
app.use(morgan('dev')); // sử dụng để log mọi request ra console
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(bodyParser()); // lấy thông tin từ form HTML
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
require('./config/passport')(passport);

app.use(session({ secret: 'CONMEONGUNGOC' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set Breadcrumbs home information
app.use(breadcrumbs.setHome());

// Mount the breadcrumbs at `/admin`
app.use('/admin', breadcrumbs.setHome({
    name: 'Bảng Điều Khiển',
    url: '/admin'
}));

require('./routes/client')(app, passport);
require('./routes/admin')(app, passport);



module.exports = app;