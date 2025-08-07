import express from "express";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import * as path from "node:path";

const app = express();
const port = 3001;
const cors = require('cors');

app.use(express.static(path.join(__dirname, '../frontend/dist')));
// @ts-ignore
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  message: "Too many requests from this IP, please try again later"
}));

app.use(bodyParser.json());


app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', appointmentRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

/*
    pm2 start backend
    pm2 reload backend
    pm2 stop backend
*/
