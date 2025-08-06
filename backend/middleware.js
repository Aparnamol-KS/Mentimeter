const jwt = require('jsonwebtoken')
const { UserModel } = require('./model.js');
require('dotenv').config(); 
JWT_KEY = process.env.JWT_KEY

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    let decrypted = jwt.verify(token, JWT_KEY);
    let username = decrypted.username;
    UserModel.findOne({
        username: username
    }).then(function (user) {
        if (!user) {
            res.status(403).json({
                message: "user not found!!"
            })
        } else {
            req.user = user
            next()
        }
    })
}

module.exports = {
    authMiddleware
}