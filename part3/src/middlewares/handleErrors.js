module.exports = (error, req, res, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    res.status(400).json({
      error: true,
      message: 'information used is malformed'
    })
  } else if (error.code === 11000) {
    res.status(400).json({
      error: true,
      message: 'the username is already taken'
    })
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      error: true,
      message: 'token invaid'
    })
  } else res.status(500).end()
}
