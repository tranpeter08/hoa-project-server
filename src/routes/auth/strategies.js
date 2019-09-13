const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JWTStrategy} = require('passport-jwt');

const localStrat = new LocalStrategy(function (username, password, done) {
// find username



  // User.findOne({ username: username }, function(err, user) {
  //   if (err) { return done(err); }
  //   if (!user) {
  //     return done(null, false, { message: 'Incorrect username.' });
  //   }
  //   if (!user.validPassword(password)) {
  //     return done(null, false, { message: 'Incorrect password.' });
  //   }
  //   return done(null, user);
  // });
});