module.exports = {
  login(req, res, next) {
    const loginKeys = ['username', 'password'];
    const reqKeys = Object.keys(req.body);

    for (key of loginKeys) {
      if (!reqKeys.includes(key)) {
        return res.status(400).json({
          message: `Missing required field: ${key}`,
          location: key
        });
      }

      const val = req.body[key];

      if (!val || val.trim() === '') {
        return res.status(400).json({
          message: `Field cannot be empty: ${key}`,
          location: key
        });
      }
    }

    return next();
  },

  register() {

  }
}