const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt');
const bcrypt = require('bcryptjs');
const app = require('../../app');
const UserService = require('../../services/UserService');
const {JWT_SECRET} = require('../../config');

const db = app.get('db');

const localStrat = new LocalStrategy( async (username, password, done) => {
  try {

    console.log('db in local',db);
    const user = await UserServices.getUserLogin(db, username);

    if (!user) {
      return done(null, false, {message: 'Username not found'});
    }

    const isValid = await bcrypt.compare(password, user.user_pw);

    if (!isValid) {
      return done(null, false, {message: 'Incorrect Password'});
    }

    return done(null, user);
  
  } catch (error) {
    return done(error);
  }
});

const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['HA256']
}

const jwtStrat = new JWTStrategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = {localStrat, jwtStrat};