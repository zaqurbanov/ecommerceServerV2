const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const logger = require("../Logger/logger")
const generateResult = require("./resultGenerator")

const getCatchError = (error, res = null) => {
      logger.error(`${messages.serverError}  ${error}  `)
      const result = Response.error(error, error, HTTP_CODE.server_error.internal_server_error)
      if (res) {

            generateResult(res, result)
      } else {
            return result
      }

}

module.exports = getCatchError