const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'token missing or invalid user extractor'
    })
  }

  let decodedToken = ''
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_JWT)
  } catch (error) {
    next(error)
  }

  // guardando el id del usuario en la request.
  const { id: userId } = decodedToken
  req.userId = userId

  next()
}
