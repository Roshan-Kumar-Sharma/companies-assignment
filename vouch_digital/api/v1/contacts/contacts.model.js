const { Schema, default: mongoose } = require("mongoose");

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is a required and must be unique for each user"],
    },
    email: {
        type: String,
        unique: true,
        required: [
            true,
            "Email is a required and must be unique for each user",
        ],
    },
    phone: {
        type: Number,
        unique: true,
        required: [
            true,
            "Phone number is a required and must be unique for each user",
        ],
    },
    address: {
        type: String,
        required: [true, "Address is a required field"],
    },
});

const contactsModel = mongoose.model("Contact", contactsSchema);

module.exports = contactsModel;
