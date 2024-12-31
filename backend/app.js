"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
// import {Pool} from 'pg';
var authRoutes_1 = require("./routes/authRoutes");
var userRoutes_1 = require("./routes/userRoutes");
var appointmentRoutes_1 = require("./routes/appointmentRoutes");
var app = express();
var port = 3001;
var cors = require('cors');
app.use(cors({
    origin: '*', // Erlaubt alle Urspr�nge
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
// const pool = new Pool({
//   user:     process.env.DB_USER,
//   host:     process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port:     process.env.DB_PORT,
// });
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
