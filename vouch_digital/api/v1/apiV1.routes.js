const apiV1Router = require("express").Router();
const contactsRouter = require("./contacts/contacts.routes");

apiV1Router.use("/contacts", contactsRouter);

// apiV1Router.get("/contacts", (req, res, next) => {
//     res.send("ehllo");
// });

module.exports = apiV1Router;
