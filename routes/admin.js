require('dotenv').config();
var config = require('../config/global');

var dashboardController = require('../controller/admin/dashboard');

var courseController = require('../controller/admin/course');
var createCourseController = require('../controller/admin/course/create');

module.exports = function(app, passport) {


    // Dashboard
    app.get('/admin/', isLoggedIn, dashboardController);


    // Course
    app.get('/admin/course', isLoggedIn, courseController);
    app.get('/admin/course/create', isLoggedIn, createCourseController)


    // Login

    app.get('/admin/login', isNotLoggedIn, async function(req, res, next) {
        let config_login = config;
        config_login.title = "Đăng Nhập";
        res.render('components.admin.auth.login', { config: config_login, message: req.flash('loginMessage') });
    });

    app.post('/admin/login', passport.authenticate('local-login', {
        successRedirect: '/admin/',
        failureRedirect: '/admin/login',
        failureFlash: true
    }));

    // Register

    app.get('/admin/register', isNotLoggedIn, async function(req, res, next) {
        let config_register = config;
        config_register.title = "Đăng Kí";
        res.render('components.admin.auth.register', { config: config_register, message: req.flash('signupMessage') });
    });

    app.post('/admin/register', passport.authenticate('local-signup', {
        successRedirect: '/admin/',
        failureRedirect: '/admin/register',
        failureFlash: true
    }));

    // Logout

    app.get('/admin/logout', function(req, res) {
        req.logout();
        res.redirect('/admin/login');
    });


}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/admin/login');
}

function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/admin/');
}