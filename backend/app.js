const express = require("express");
const cokkieParser = require('cookie-parser');
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
const cors = require('cors');

dotenv.config({ path: "backend/config/config.env" })
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cokkieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for error
app.use(errorMiddleware);

module.exports = app;