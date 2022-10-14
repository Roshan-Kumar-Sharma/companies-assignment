require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
};

const verifyCallback = (payload, done) => {
    console.log(
        "This is JWT verifyCallback. I will get the payload the from the token and attach this payload to req.user"
    );
    console.log(
        "I will send the info object {payload: true/false, message: ''}"
    );
    console.log(payload);
    if (!payload) {
        return done(null, false, {
            payload: false,
            message: "Unable to get payload. Maybe JWT token not present.",
        });
    }
    return done(null, payload, {
        payload: true,
        message: "Got the payload.",
    });
};

passport.use("jwtVerify", new JwtStrategy(options, verifyCallback));
