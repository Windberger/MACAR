import * as express from "express";
import * as bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
