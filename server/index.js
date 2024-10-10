const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./db/db");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const orderRoute = require("./routes/orderRoute");

//env config
dotenv.config({ path: path.join(__dirname, ".", ".env") });

//cors
app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));

// connect database
connectDatabase();

// Routes
app.use("/", productRoute, categoryRoute, orderRoute);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
