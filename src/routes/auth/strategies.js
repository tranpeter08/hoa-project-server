const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt');
const bcrypt = require('bcryptjs');
const app = require('../../app');
const UserServices = require('../../services/UserServices');
const {JWT_SECRET} = require('../../config');

const db = app.get('db');

const localStrat = new LocalStrategy(async (username, password, done) => {
  try {
    const result = await UserServices.userIsExist(db, username);

    if (!result) {
      return done(null, false, {message: 'Username not found'});
    }

    const hash = await UserServices.getHash(db, username);
    const isValid = await bcrypt.compare(username, hash);

    if (!isValid) {
      return done(null, false, {message: 'Incorred Password'});
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