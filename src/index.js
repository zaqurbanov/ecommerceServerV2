const express = require('express');
const { PORT, MONGO_URL } = require('./config/envoirment');
const Mongo = require('./config/connectMongoDb');

const app = express()


const routes = require('./Routers/routes');
const messages = require('./config/Messages');
const HTTP_CODE = require('./config/HTTP_CODE');
const logger = require('./Logger/logger');
Mongo.connect(MONGO_URL);

app.use(express.json({ 
        strict: true, 
       
        verify: (req, res, buf) => {
            try {
                JSON.parse(buf); 
            } catch (err) {
                logger.error(`${err.status || HTTP_CODE.server_error.internal_server_error} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).json({
                        statusCode:HTTP_CODE.client_error.bad_request,
                    success: false,
                    message: messages.jsonError,
                    error:err.message
                }); 
            }
        } 
    }));
 



 
app.use('/', routes)


    //! Data tapilmirsa mesajda not found yazilacaq.  Servicde
app.listen(PORT,()=>{
        console.log(`Server listening port on  ${PORT} `);
})            