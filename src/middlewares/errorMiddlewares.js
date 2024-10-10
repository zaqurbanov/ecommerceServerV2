// const logger = require('../Logger/logger');
// const Response = require('../config/Response');
// const HTTP_CODE = require('../config/HTTP_CODE');
// const generateResult = require('../helpers/resultGenerator');

// const errorMiddleware = (err, req, res, next) => {
//   logger.error(`${err.message || 'Unknown error occurred'} - ${req.method} ${req.url}`);

 
//     const result = Response.error(err.message,err,HTTP_CODE.server_error.internal_server_error)
//   return generateResult(res,result)
// };

// module.exports = errorMiddleware;

//! dont use this code