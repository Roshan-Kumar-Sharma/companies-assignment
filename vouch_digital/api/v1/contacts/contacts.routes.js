const contactsRouter = require("express").Router();
const passport = require("passport");
const Controller = require("./contacts.controller");
const validateContactMiddleware = require("./contacts.middleware");

contactsRouter.get(
    "/add",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        const isContactValid = await validateContactMiddleware(req.body);

        if (!isContactValid.status) {
            return res.status(400).json({
                status: 400,
                message: `Contact was not added due to invalid or missing data [${isContactValid.message}]]`,
                data: req.body,
            });
        }

        next();
    },
    Controller.addContact
);

module.exports = contactsRouter;
