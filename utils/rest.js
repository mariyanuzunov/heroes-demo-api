const successRes = (res, payload, status = 200) => {
  res.status(status).json({
    success: true,
    payload
  })
}

const errorRes = (res, error, status = 500, metadata = {}) => {
  if (status > 500) {
    status = 500
    error = 'Database error'
  }

  res.status(status).json({
    success: false,
    message: error.message || error,
    metadata
  })
}

export default {
  successRes,
  errorRes
}
