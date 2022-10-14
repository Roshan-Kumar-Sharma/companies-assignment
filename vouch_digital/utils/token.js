require("dotenv").config();
const jwt = require("jsonwebtoken");

const signAccessToken = (payload, exp) => {
    console.log("PAYLOAD IN SIGNACCESS TOKEN--------");
    console.log(payload);

    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: exp || "5m",
        };
        jwt.sign(
            payload,
            process.env.JWT_ACCESS_TOKEN_SECRET,
            options,
            (err, token) => {
                if (err) {
                    return reject(new Error(err));
                }
                return resolve(token);
            }
        );
    });
};

module.exports = { signAccessToken };
