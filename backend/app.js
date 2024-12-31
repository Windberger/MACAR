"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var express_rate_limit_1 = require("express-rate-limit");
var authRoutes_1 = require("./routes/authRoutes");
var userRoutes_1 = require("./routes/userRoutes");
var appointmentRoutes_1 = require("./routes/appointmentRoutes");
var app = express();
var port = 3001;
var cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    message: "Too many requests from this IP, please try again later"
}));
app.use(bodyParser.json());
app.use('/', authRoutes_1.default);
app.use('/', userRoutes_1.default);
app.use('/', appointmentRoutes_1.default);
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
module.exports = app;
/*
    pm2 start backend
    pm2 reload backend
    pm2 stop backend
*/
