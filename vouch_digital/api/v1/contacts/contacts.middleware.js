const Validators = require("./contacts.validation");

const validateContactMiddleware = async (contact) => {
    try {
        const validateContact =
            await Validators.contactValidation.validateAsync(contact);

        console.log("VALIDATION SUCCESSFUL");

        return {
            status: true,
            message: "Contact is validated. It can be added to database",
        };
    } catch (err) {
        console.log("VALIDATION ERROR");
        return {
            status: false,
            message: err.message,
        };
    }
};

const validateEmailMiddleware = async (email) => {
    try {
        await Validators.emailValidator.validateAsync(email);

        return {
            status: true,
            message: "Valid Email",
        };
    } catch (error) {
        return {
            status: false,
            message: "Invalid Email",
        };
    }
};

const validatePhoneMiddleware = async (phone) => {
    try {
        await Validators.phoneValidator.validateAsync(phone);

        return {
            status: true,
            message: "Valid Phone number",
        };
    } catch (error) {
        return {
            status: false,
            message: "Invalid Phone number",
        };
    }
};

const validateStringMiddleware = async (data) => {
    try {
        await Validators.stringValidator.validateAsync(data);

        return {
            status: true,
            message: "Valid data",
        };
    } catch (error) {
        return {
            status: false,
            message: "Invalid data. String required",
        };
    }
};

module.exports = {
    validateContactMiddleware,
    validateEmailMiddleware,
    validatePhoneMiddleware,
    validateStringMiddleware,
};
