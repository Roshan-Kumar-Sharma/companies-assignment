const serverRouter = require("express").Router();

serverRouter.get("/", (req, res, next) => {
    next(new Error("Invalid"));
    // res.status(200).json({
    //     status: 200,
    //     message: "Received req at root route",
    // });
});

module.exports = serverRouter;
