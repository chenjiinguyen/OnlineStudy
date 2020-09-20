require('dotenv').config();
var config = require('../config/global')

module.exports = function(app, passport) {

    /* GET home page. */
    app.get('/', async function(req, res, next) {
        config.title = "Trang Chủ";
        res.render('components.web.home', { config: config });
    });

}