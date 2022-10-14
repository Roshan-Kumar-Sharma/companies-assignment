const contactValidation = require("./contacts.validation");

const validateContactMiddleware = async (contact) => {
    try {
        const validateContact = await contactValidation.validateAsync(contact);

        return {
            status: true,
            message: "Contact is validate. It can be added to database",
        };
    } catch (err) {
        return {
            status: false,
            message: err.message,
        };
    }
};

module.exports = validateContactMiddleware;
