const bcrypt = require('bcrypt');
const SECRET = 'your_jwt_secret'
const passport = require('passport');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { DB } = require('../config/Database')
exports.login = async (req, res, next) => {
    console.log(req.body);
    try {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('Login: ', req.body, user, err, info)
            if (err) return next(err)
            if (user) {
                const token = jwt.sign(user, SECRET, {
                    expiresIn: '1d'
                })
                // req.cookie.token = token
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        maxAge: 60 * 60,
                        sameSite: "strict",
                        path: "/",
                    })
                );
                res.statusCode = 200
                return res.json({ user, token, message: info.message })
            } else
                return res.json(info)
        })(req, res, next)

    } catch (error) {
        console.log(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { username, password, email, name, surname } = req.body;
        console.log(req.body);
        if (!username || !password || !email || !name || !surname) {
            return res.json({ message: "Cannot register with empty", register: false })
        } else {
            const user = DB.users.find(item => item.username == username || item.email == email)
            console.log(user)

            if (user) {
                return res.json({ message: "Already has username or email", register: false })
            }
            else {
                let id = (DB.users.length) ? DB.users[DB.users.length - 1].id + 1 : 1
                const hash = await bcrypt.hash(password, 10)
                DB.users.push({ id, username, password: hash, email, name, surname})
                console.log(DB.users)
                return res.json({ message: "Register success", data: DB.users, register: true })

            }
        }
    } catch (error) {
        console.log(error);
        res.status(422).json({ message: "Cannot register", register: false })
    }
};

exports.logout = async (req, res, next) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
};

exports.user = async (req, res, next) => {
    try {
        res.json(DB.users);
    } catch (error) {
        return res.json({ message: 'ERROR !!' })
    }
}