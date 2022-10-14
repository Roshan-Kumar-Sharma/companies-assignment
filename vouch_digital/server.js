require("dotenv").config();

const express = require("express");
const apiV1Router = require("./api/v1/apiV1.routes");
const { signAccessToken } = require("./utils/token");

const app = express();

require("./configs/db.configs");
require("./configs/app.configs")(app);

console.log(process.env.JWT_ACCESS_TOKEN_SECRET);

app.get("/getToken", async (req, res, next) => {
    const payload = req.body;
    const { exp } = req.query;

    const token = await signAccessToken(payload, exp);

    res.status(200).json({
        status: 200,
        message: "JWT token created successfully",
        data: {
            token,
        },
    });
});

app.use("/api/v1", apiV1Router);

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
