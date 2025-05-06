class APIResponse {
  static success(
    res,
    data,
    statusCode = 200,
    message = 'Request was successful',
    additionalData = {}
  ) {
    return res.status(statusCode).json({
      status: 'success',
      data,
      message,
      additionalData,
    });
  }

  static fail(res, data, message = 'Request failed') {
    return res.status(400).json({
      status: 'fail',
      data,
      message,
    });
  }

  static error(res, message = 'Internal Server Error', data = null) {
    return res.status(500).json({
      status: 'error',
      message,
      data,
    });
  }
}

module.exports = APIResponse;
