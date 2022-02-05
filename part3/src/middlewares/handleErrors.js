module.exports = (error, req, res, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    res.status(400).json({
      error: true,
      message: 'information used is malformed'
    })
  } else res.status(500).end()
}
