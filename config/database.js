var mongoose = require('mongoose');
var bluebird = require('bluebird');
require('dotenv').config();
/**
 * Connect to Database
 */

const connectDB = () => {

    mongoose.Promise = bluebird;

    const DB_CONNECTION = process.env.DB_CONNECTION || 'mongodb';
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_POST = process.env.DB_POST || 27017;
    const DB_USER = process.env.DB_USER || '';
    const DB_PASSWORD = process.env.DB_PASSWORD || '';
    const DB_DATABASE = process.env.DB_DATABASE || 'onlinestudy';

    const URI = `${DB_CONNECTION}://${DB_HOST}:${DB_POST}/${DB_DATABASE}`
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(x => console.log('Conneting Database Success!!')).catch(err => console.log(err));
};

module.exports = connectDB;