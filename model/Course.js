var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Model Course
 */

var Course = new Schema({
    course_id: String,
    name: String,
    author: Schema.Types.ObjectId,
    description: String,
    rating: Number,
    created_time: Date,
    updated_time: Date
});

module.exports = mongoose.model('course', Course);