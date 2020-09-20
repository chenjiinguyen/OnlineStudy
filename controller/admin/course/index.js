var config = require('../../../config/global');
var User = require('../../../model/User');
var Course = require('../../../model/Course');

async function course(req, res, next) {
    config.title = "Danh Sách Khóa Học";
    var user = await User.findById(req.session.passport.user);
    var courses = await Course.find();
    console.log(courses[0].rating);
    req.breadcrumbs('Danh Sách Khóa Học');
    res.render('components.admin.course.index', {
        config: config,
        breadcrumbs: req.breadcrumbs(),
        user: user,
        courses: courses
    });
}

module.exports = course;