const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later');
}

module.exports = errorHandlerMiddleware;
