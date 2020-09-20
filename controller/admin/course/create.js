var config = require('../../../config/global');
var User = require('../../../model/User');
var Course = require('../../../model/Course');

async function createCourse(req, res, next) {
    config.title = "Thêm Khóa Học";
    var user = await User.findById(req.session.passport.user);
    req.breadcrumbs('Thêm Khóa Học');
    res.render('components.admin.course.create', {
        config: config,
        breadcrumbs: req.breadcrumbs(),
        user: user,
    });
}

module.exports = createCourse;