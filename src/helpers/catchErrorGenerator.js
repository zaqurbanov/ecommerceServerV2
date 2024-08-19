const HTTP_CODE = require("../config/HTTP_CODE")
const messages = require("../config/Messages")
const Response = require("../config/Response")
const logger = require("../Logger/logger")

const getCatchError = (error)=>{
        logger.error(`${messages.serverError}  ${error.message}  `)
        return Response.error(messages.serverError,error.message,HTTP_CODE.server_error.internal_server_error)
}

module.exports = getCatchError