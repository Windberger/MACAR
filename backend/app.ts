import * as express from "express";
import * as bodyParser from "body-parser";
// import {Pool} from 'pg';
import authRoutes from "./routes/authRoutes";

const app = express();
const port = 3001;
const cors = require('cors');

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

app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

/*
    pm2 start backend
    pm2 reload backend
    pm2 stop backend
*/
