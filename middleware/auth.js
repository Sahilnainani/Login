const jwt = require('jsonwebtoken')

var checkUserAuth = async (req, resp, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      jwt.verify(token, process.env.JWT_SECRET_KEY)

      next()
    } catch (error) {
      console.log(error)
      resp.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    resp.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

module.exports = {checkUserAuth}