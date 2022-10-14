const passport = require("passport");
require("../../../configs/passport.jwt.configs");
const contactsModel = require("./contacts.model");

const allowedScopes = ["all", "delete", "update", "get"];

const tokenVerifyController = async (req, res, next) => {
    passport.authenticate(
        "jwtVerify",
        {
            session: false,
        },
        (err, payload, info) => {
            if (err || !payload) {
                return next(info);
            }
            req.login(payload, { session: false }, async (err) => {
                if (err) return next(err);
                if (!payload.scope || !allowedScopes.includes(payload.scope)) {
                    return next(new Error("Invalid scope in the token"));
                }
                return next();
            });
        }
    )(req, res, next);
};

const addContact = async (req, res, next) => {
    try {
        const contact = new contactsModel(req.body);
        const doc = await contact.save();

        res.status(200).json({
            status: 200,
            message: "Contact was added successfully",
            data: doc,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: `Contact was not added due to some error: [${error.message}]`,
            data: req.body,
        });
    }
};

module.exports = {
    tokenVerifyController,
    addContact,
};
