const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('./environment')


const generateToken = (user)=>{

    return jwt.sign({
        id:user._id,
        username:user.username,
        role:user.role

    },JWT_SECRET_KEY,
{expiresIn:'1h'})
}

module.exports = generateToken