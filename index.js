const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

const userRoute = require("./routes/user/userRoute");
const authRoute = require("./routes/auth/authRoute");
const uploadRoute = require("./routes/upload/uploadRoute");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;

//***DATABASE CONNECTION***
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

//***API ROUTES***
app.use("/public/api/v1/user/", userRoute);
app.use("/public/api/v1/auth/", authRoute);
app.use("/public/api/v1/upload/", uploadRoute);

//***PORT LOG***
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
