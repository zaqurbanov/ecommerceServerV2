const express = require('express');
const { PORT, MONGO_URL, CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_API_SECRET } = require('./config/environment');
const Mongo = require('./config/connectMongoDb');
const cors = require('cors')

const userRouter = require('./Routers/userRouter')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const cloudinary = require('cloudinary').v2
const helmet = require('helmet')


const routes = require('./Routers/routes');
const messages = require('./config/Messages');
const HTTP_CODE = require('./config/HTTP_CODE');
const logger = require('./Logger/logger');
const verifyToken = require('./middlewares/verifyToken');
const verifyAdmin = require('./middlewares/verifyAdmin');
const errorMiddleware = require('./middlewares/errorMiddlewares');
const limiter = require('./middlewares/rateLimit');

const app = express()

// app.use(helmet())

// app.use(limiter)


app.use(cors())


app.use(cookieParser())


app.use(express.json({
    strict: true,

    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (err) {
            logger.error(`${err.status || HTTP_CODE.server_error.internal_server_error} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).json({
                statusCode: HTTP_CODE.client_error.bad_request,
                success: false,
                message: messages.jsonError,
                error: err.message
            });
        }
    }
}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname,'tmp') 
}))



cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});


Mongo.connect(MONGO_URL);






app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use('/user', userRouter)


app.use('/', routes)


//! Data tapilmirsa mesajda not found yazilacaq.  Servicde
// !Product update olanda error verir temphfile tapilmir
app.listen(PORT, () => {
    console.log(`Server listening port on  ${PORT} `);
})

