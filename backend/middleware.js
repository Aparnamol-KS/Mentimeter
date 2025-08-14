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


function verifyAdmin(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        let decrypted = jwt.verify(token, JWT_KEY);
        let username = decrypted.username;

        UserModel.findOne({ username })
            .then(user => {
                if (user && user.role === 'admin') {
                    req.user = user;
                    next();
                } else {
                    res.status(403).json({ message: "user not found!!" });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: "Server error" });
            });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}


module.exports = {
    authMiddleware,
    verifyAdmin
}