const { custom } = require("joi");
const JOI = require("joi");

const customFields = {
    name: JOI.string(),
    email: JOI.string().trim().lowercase().email(),
    phone: JOI.number(),
    address: JOI.string(),
};

const contactValidation = JOI.object({
    name: customFields.name.required().error(() => {
        return new Error("Name is required");
    }),
    email: customFields.email.required().error(() => {
        return new Error("Email is required");
    }),
    phone: customFields.phone.required().error(() => {
        return new Error("Phone number is required");
    }),
    address: customFields.address.required().error(() => {
        return new Error("Address is required");
    }),
});

const emailValidator = customFields.email.required().error(() => {
    return new Error("Invalid Email");
});

const phoneValidator = customFields.phone.required().error(() => {
    return new Error("Invalid Phone number");
});

const stringValidator = customFields.name.required().error(() => {
    return new Error("Invalid data format. String required");
});

module.exports = {
    contactValidation,
    emailValidator,
    phoneValidator,
    stringValidator,
};
