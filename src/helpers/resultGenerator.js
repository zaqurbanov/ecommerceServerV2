


const generateResult = (res,result)=>{
    console.log(result);
    return res.status(result.code).json({
        statusCode:result.code,
        message:result.message,
        error:result.error,
        data:result.data
    })
}

module.exports = generateResult