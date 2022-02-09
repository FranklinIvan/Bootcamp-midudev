const ERROR_HANDLER = {
  CastError: res => res.status(400).json({
    error: true,
    message: 'information used is malformed'
  }),

  JsonWebTokenError: res => res.status(401).json({
    error: true,
    message: 'token invaid'
  }),

  ValidationError: (res, { message }) => res.status(409).json({
    error: true,
    message
  }),

  TokenExpiredError: res => res.status(401).json({
    error: true,
    message: 'token expired'
  }),

  defaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
  console.error(error)

  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError
  handler(res, error)
}
