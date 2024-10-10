const getCatchError = require("../helpers/catchErrorGenerator")
const generateResult = require("../helpers/resultGenerator")

const notFound = (req, res) => {
    res.status(404).json({
        statusCode: 404,
        message: "Page not found",
        error: "The requested resource could not be found."
    });
}

module.exports= notFound