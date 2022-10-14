require("dotenv").config();

const express = require("express");
const apiV1Router = require("./api/v1/apiV1.routes");
const { signAccessToken } = require("./utils/token");

const app = express();

// db configuration and app configration
require("./configs/db.configs");
require("./configs/app.configs")(app);

console.log(process.env.JWT_ACCESS_TOKEN_SECRET);

/*
This enpoint will send access token as response with details
such as scope and expiry time
scope: ["all", "add", "update", "delete", "find"] is very important because all the crud operation
required specific scope
*/
app.get("/getToken", async (req, res, next) => {
    const payload = req.body;
    const { exp } = req.query;

    const token = await signAccessToken(payload, exp);

    res.status(200).json({
        status: 200,
        message: "JWT token created successfully",
        data: {
            token,
            expiresIn: exp,
            scope: req.body.scope,
        },
    });
});

// all the req coming on /api/v1 will be redirected to this route
app.use("/api/v1", apiV1Router);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || err.code || 500).json({
        status: err.status || err.code || 500,
        message: err.message || "Something went wrong",
        data: err,
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is listening at PORT:::::${process.env.PORT || 8080}`);
});
