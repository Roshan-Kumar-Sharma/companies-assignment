const passport = require("passport");
require("../../../configs/passport.jwt.configs");
const contactsModel = require("./contacts.model");

const allowedScopes = ["all", "add", "delete", "update", "find"];

/*
Token validation controller
*/
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
                    return next(
                        new Error(
                            `Invalid scope found in the token: [${payload.scope}]`
                        )
                    );
                }
                return next();
            });
        }
    )(req, res, next);
};

/*
add contact to DB controller
*/
const addContact = async (req, res, next) => {
    try {
        const contact = new contactsModel(req.body);
        const doc = await contact.save();

        res.status(200).json({
            status: 200,
            message: "Contact was added successfully",
            data: { contact: doc },
        });
    } catch (error) {
        res.status(200).json({
            status: 400,
            message: `Contact was not added due to some error`,
            data: {
                contact: req.body,
                error: error.message,
            },
        });
    }
};

/*
add bulk contacts to DB controller
*/
const addBulkContact = async (req, res, next) => {
    for (let i = 0; i < req.valid_contacts.length; i++) {
        try {
            const contact = new contactsModel(req.valid_contacts[i]);
            const doc = await contact.save();
        } catch (err) {
            req.invalid_contacts.push({
                contact: req.valid_contacts[i],
                error: err.message,
            });
            req.valid_contacts.splice(i, 1);
            i--;
        }
    }

    res.status(200).json({
        status: 200,
        message: req.valid_contacts.length
            ? `${req.valid_contacts.length} contacts were added to database`
            : "No valid contacts were found to add",
        data: {
            valid_contacts: req.valid_contacts,
            invalid_contacts: req.invalid_contacts,
        },
    });
};

/*
get contact from DB controller
*/
const getContact = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        let contact = undefined;
        if (email) contact = await contactsModel.findOne({ email });
        else if (phone) contact = await contactsModel.findOne({ phone });

        if (contact) {
            res.status(200).json({
                status: 200,
                message: "Contact found",
                data: {
                    contact,
                },
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Contact not found",
                data: {
                    user: email || phone,
                },
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: "Contact not found",
            data: {
                user: email || phone,
            },
        });
    }
};

/*
add contact from DB controller in paginated way
*/
const paginatedSearch = async (req, res, next) => {
    try {
        let { page_number, contact_per_page } = req.query;

        page_number = parseInt(page_number);
        contact_per_page = parseInt(contact_per_page);

        if (
            !page_number ||
            !contact_per_page ||
            page_number < 1 ||
            contact_per_page < 1
        ) {
            return res.status(400).json({
                status: 400,
                message:
                    "Invalid value of page number or contact per page received",
            });
        }

        const contacts = await contactsModel
            .find()
            .skip((page_number - 1) * contact_per_page)
            .limit(contact_per_page);

        res.status(200).json({
            status: 200,
            message: contacts.length
                ? "Data successfully fetched from database"
                : "Not sufficient data present in the database",
            data: {
                contacts,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "There was an error while getting data from database",
            data: {
                error: err.message,
            },
        });
    }
};

/*
update contact in DB controller
*/
const updateContact = async (req, res, next) => {
    try {
        const { email, phone } = req.body;
        const { update } = req.body;

        let contact = undefined;

        if (email)
            contact = await contactsModel.findOneAndUpdate({ email }, update, {
                new: true,
            });
        else if (phone)
            contact = await contactsModel.findOneAndUpdate({ phone }, update, {
                new: true,
            });

        res.status(200).json({
            status: 200,
            message: "Contact was updated successfully",
            data: {
                contact,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "There was an error while updating the contact",
            data: {
                error: err.message,
            },
        });
    }
};

/*
delete contact from DB controller
*/
const deleteContact = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        let contact = undefined;

        if (email) contact = await contactsModel.deleteOne({ email });
        else if (phone) contact = await contactsModel.deleteOne({ phone });

        res.status(200).json({
            status: 200,
            message: "Contact was deleted successfully",
            data: {
                contact,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "There was an error while deleting the contact",
            data: {
                error: err.message,
            },
        });
    }
};

module.exports = {
    tokenVerifyController,
    addContact,
    addBulkContact,
    getContact,
    paginatedSearch,
    updateContact,
    deleteContact,
};
