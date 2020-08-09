module.exports.isAuthorised = function (req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers.token
  /// / decode token
  if (token) {
    const jwt = require('jsonwebtoken')
    // verifies secret and checks exp
    jwt.verify(token, require('./../config/constants').jwtSecret, function (err, decoded) {
      if (err) {
        return res.json({ status: 403, message: 'Failed to authenticate token.', err: err })
      } else {
        // if everything is good, save to request for use in other routes
        console.log('\n\n decoded', decoded)
        req.decoded = decoded
        if (decoded.role) {
          next()
        } else {
          return res.status(403).send({
            status: 403,
            message: 'You dont have rights to access this api!'
          })
        }
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      status: 403,
      message: 'No token provided.'
    })
  }
}
