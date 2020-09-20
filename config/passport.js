var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var User = require('../model/User');
var avatarGenerator = require('../app/avatarGenerator');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Không tìm thấy người dùng.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Sai mật khẩu.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',

            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                if (req.body.retype_password === req.body.password) {
                    User.findOne({ 'local.email': email }, async function(err, user) {
                        if (err)
                            return done(err);
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'Email đã tồn tại.'));
                        } else {
                            var newUser = new User();
                            newUser.name = req.body.name;
                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);
                            var avatar_filename = await avatarGenerator(email, newUser._id.toString(), path.join(__dirname, '../public/client/img/users/'), 500, false);
                            newUser.avatar = '/client/img/users/' + avatar_filename;
                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });
                } else {
                    return done(null, false, req.flash('signupMessage', 'Password nhập không trùng.'));
                }
            });

        }));


};