var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Model Video
 */

var Video = new Schema({
    video_id: String,
    course_id: String,
    name: String,
    author: {
        id: Number,
        name: String
    },
    description: String,
    created_time: Date,
    updated_time: Date
});

module.exports = mongoose.model('video', Video);