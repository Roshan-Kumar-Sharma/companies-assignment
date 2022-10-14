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
    address: customFields.name.required().error(() => {
        return new Error("Address is required");
    }),
});

module.exports = contactValidation;
