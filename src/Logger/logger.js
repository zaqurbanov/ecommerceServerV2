const winston = require('winston');
const path = require('path')
const {format,transports} = winston;
const {combine,timestamp, printf,colorize} = format

const logFormat = printf(({level,message,timestamp})=>{
    return timestamp + "      " +[level] +  ": " + message
})


const logger = winston.createLogger({
    level:'info',
    format:combine(
        timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        colorize(),
        logFormat,
    
    ),
    transports:[
        // new transports.Console(),
        new transports.File({filename: path.join(__dirname,'logs/combined.log')}),
        
        new transports.File({filename:path.join(__dirname,'logs/info.log'),level:'info'}),

        new transports.File({filename:path.join(__dirname,'logs/warning.log'),level:'warn'}),
        
        new transports.File({filename:path.join(__dirname,'logs/error.log'),level:'error'}),
    ]
})
 

module.exports = logger