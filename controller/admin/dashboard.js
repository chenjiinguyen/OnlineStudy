var config = require('../../config/global');
var User = require('../../model/User');

async function dashboard(req, res, next) {
    config.title = "Admin Panel";
    var user = await User.findById(req.session.passport.user);
    res.render('components.admin.dashboard', { config: config, user: user, readcrumbs: req.breadcrumbs(), });
}

module.exports = dashboard;