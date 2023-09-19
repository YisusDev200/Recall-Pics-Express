const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const app = express();
const path = require("path");
const uuid = require("uuid").v4;
const mongoose = require("mongoose");
const { format } = require("timeago.js");
require("dotenv").config();

//settings
app.set("port", process.env.PORT || 3000);
app.set("MONGODB_URI", process.env.MONGODB_URI);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single("image"));
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});
//Routes
app.use(require("./routes"));

//public
app.use(express.static(path.join(__dirname, "public")));

//mongo
mongoose.set("strictQuery", true);

mongoose
  .connect(app.get("MONGODB_URI"))
  .then(() => {
    console.log("BD connected");
    app.listen(app.get("port"), () => {
      console.log(`server on port ${app.get("port")}`);
    });
  })
  .catch((error) => console.error(error));

app.use((req, res, next) => {
  res.status(404).send("Page not found");
});
