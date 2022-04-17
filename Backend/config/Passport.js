const {DB} = require("./Database")
const SECRET = 'your_jwt_secret'
const passport = require('passport')
const bcrypt = require('bcrypt')

const passportJWT = require("passport-jwt"),
    ExtractJWT = passportJWT.ExtractJwt,
    JWTStrategy = passportJWT.Strategy,
    LocalStrategy = require('passport-local').Strategy

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, cb) => {
        console.log('User: ', username, password)
        console.log(typeof(DB.users));
        const user = await DB.users.find(item => item.username == username)
        if (user) {
            const hash = await bcrypt.compare(password,user.password)
            if (hash){
                return cb(null,
                    user ,
                    { message: 'Logged In Successfully' })
            }
            else{
                return cb(null, false, { message: 'Incorrect user or password.' })
            }
        }
        else{
            return cb(null,false,
                { message : 'User not found !!'})
        }

    }));

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET
    },
        async (jwtPayload, cb) => {
            try {
                // find the user in db if needed
                console.log('jwt strategy')
                const user = await DB.users.find(item => item.username == username)
                if(user){
                    return cb(null,user);
                }
                else{
                    return cb(null,false)
                }
            } catch (error) {
                return cb(error, false);
            }
        }
    ));