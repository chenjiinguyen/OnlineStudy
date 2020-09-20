require('dotenv').config();

module.exports = {
    app_name: process.env.WEB_NAME,
    navigation: [{
        menu_title: "Trang Chủ",
        menu: [{
            icon: "dripicons-home",
            name: "Bảng Điều Khiển",
            link: "/admin/"
        }, {
            icon: "dripicons-monitor",
            name: "Khóa Học",
            link: "/admin/course/",
            child_menu: [{
                name: "Danh Sách Khóa Học",
                link: "/admin/course/",
            }, {
                name: "Thêm Khóa học",
                link: "/admin/course/create",
            }]
        }, {
            icon: "dripicons-user",
            name: "Thành Viên",
            link: "/admin/users"
        }]
    }]
}