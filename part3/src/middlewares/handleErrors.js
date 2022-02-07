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
  } else res.status(500).end()
}
