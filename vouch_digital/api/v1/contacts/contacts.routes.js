const contactsRouter = require("express").Router();
const passport = require("passport");
const Controller = require("./contacts.controller");
const Middleware = require("./contacts.middleware");

/*
This endpoint will add single contact in DB 
*/
contactsRouter.post(
    "/add",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        if (!["add", "all"].includes(req.user.scope)) {
            return res.status(400).json({
                status: 400,
                message: `Unauthorized scope found in the token`,
                data: {
                    contact: req.body,
                    invalid_scope: `Scope: [${req.user.scope}] has no access to add contact`,
                },
            });
        }

        const isContactValid = await Middleware.validateContactMiddleware(
            req.body
        );

        if (!isContactValid.status) {
            return res.status(400).json({
                status: 400,
                message: `Contact was not added due to invalid or missing data`,
                data: {
                    contact: req.body,
                    missing_field: isContactValid.message,
                },
            });
        }

        next();
    },
    Controller.addContact
);

/*
This endpoint will add bulk contacts in DB 
*/
contactsRouter.post(
    "/add/bulk_contact",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        if (!["add", "all"].includes(req.user.scope)) {
            return res.status(400).json({
                status: 400,
                message: `Unauthorized scope found in the token`,
                data: {
                    contact: req.body,
                    invalid_scope: `Scope: [${req.user.scope}] has no access to add bulk contact`,
                },
            });
        }

        if (!Array.isArray(req.body)) {
            return res.status(400).json({
                status: 400,
                message: `No bulk contacts found. If you are trying to add single contact use '/add' endpoint with proper scope`,
                data: {
                    contact: req.body,
                },
            });
        }

        let invalid_contacts = [];
        let valid_contacts = [];

        for (let i = 0; i < req.body.length; i++) {
            try {
                console.log(req.body[i]);

                const isContactValid =
                    await Middleware.validateContactMiddleware(req.body[i]);

                console.log(isContactValid);

                if (isContactValid.status) {
                    valid_contacts.push(req.body[i]);
                } else {
                    invalid_contacts.push({
                        contact: req.body[i],
                        error: err.message,
                    });
                }
            } catch (err) {
                return next(
                    new Error("Error occured in validating the contact")
                );
            }
        }

        req.invalid_contacts = invalid_contacts;
        req.valid_contacts = valid_contacts;

        next();
    },
    Controller.addBulkContact
);

/*
This endpoint find contact based on email or phone from DB 
*/
contactsRouter.get(
    "/find",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        if (!["find", "all"].includes(req.user.scope)) {
            return res.status(400).json({
                status: 400,
                message: `Unauthorized scope found in the token`,
                data: {
                    contact: req.body,
                    invalid_scope: `Scope: [${req.user.scope}] has no access to find/search contact`,
                },
            });
        }

        const { email, phone } = req.body;
        let isDataValid = undefined;

        if (email) {
            isDataValid = await Middleware.validateEmailMiddleware(email);
        } else if (phone) {
            isDataValid = await Middleware.validatePhoneMiddleware(phone);
        }

        console.log(isDataValid);

        if (!isDataValid.status) {
            return res.status(400).json({
                status: 400,
                message: `Invalid email or phone number`,
                data: {
                    user: email || phone,
                    error: isDataValid.message,
                },
            });
        }

        next();
    },
    Controller.getContact
);

/*
This endpoint find contact based on pagination
*/
contactsRouter.get(
    "/find/pagination",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        if (!["find", "all"].includes(req.user.scope)) {
            return res.status(400).json({
                status: 400,
                message: `Unauthorized scope found in the token`,
                data: {
                    contact: req.body,
                    invalid_scope: `Scope: [${req.user.scope}] has no access to find/search contact`,
                },
            });
        }

        next();
    },
    Controller.paginatedSearch
);

/*
This endpoint find update contact based on email or phone
*/
contactsRouter.put(
    "/update",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        if (!["all", "update"].includes(req.user.scope)) {
            return res.status(400).json({
                status: 400,
                message: `Unauthorized scope found in the token`,
                data: {
                    contact: req.body,
                    invalid_scope: `Scope: [${req.user.scope}] has no access to update contact`,
                },
            });
        }

        const { email, phone } = req.body;
        let isDataValid = undefined;

        if (email) {
            isDataValid = await Middleware.validateEmailMiddleware(email);
        } else if (phone) {
            isDataValid = await Middleware.validatePhoneMiddleware(phone);
        }

        console.log(isDataValid);

        if (!isDataValid.status) {
            return res.status(400).json({
                status: 400,
                message: `Invalid email or phone number`,
                data: {
                    user: email || phone,
                    error: isDataValid.message,
                },
            });
        }

        next();
    },
    Controller.updateContact
);

/*
This endpoint find delete contact based on email or phone
*/
contactsRouter.delete(
    "/delete",
    Controller.tokenVerifyController,
    async (req, res, next) => {
        if (!["all", "delete"].includes(req.user.scope)) {
            return res.status(400).json({
                status: 400,
                message: `Unauthorized scope found in the token`,
                data: {
                    contact: req.body,
                    invalid_scope: `Scope: [${req.user.scope}] has no access to delete contact`,
                },
            });
        }

        const { email, phone } = req.body;
        let isDataValid = undefined;

        if (email) {
            isDataValid = await Middleware.validateEmailMiddleware(email);
        } else if (phone) {
            isDataValid = await Middleware.validatePhoneMiddleware(phone);
        }

        console.log(isDataValid);

        if (!isDataValid.status) {
            return res.status(400).json({
                status: 400,
                message: `Invalid email or phone number`,
                data: {
                    user: email || phone,
                    error: isDataValid.message,
                },
            });
        }

        next();
    },
    Controller.deleteContact
);

module.exports = contactsRouter;
