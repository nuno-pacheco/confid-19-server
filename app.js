require("dotenv/config")

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");





//Router definition
const userRouter = require("./routes/user.route");
const feelingRouter = require("./routes/feelings.route");
const newsRoute = require("./routes/news.route")


require("./config/db.config");

const app = express();

//CORS middleware 
app.use(
  cors({
    credentials: true,
    origin: [process.env.ORIGIN]
  })
);

console.log(process.env.ORIGIN)

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use("/user", userRouter);
app.use("/all_feelings", feelingRouter);
app.use("/news", newsRoute)



module.exports = app;
