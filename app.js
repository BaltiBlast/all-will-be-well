const express = require("express");
const router = require("./router.js");
const session = require("express-session");
const flash = require("connect-flash");
const flashMessage = require("./middlewares/message.middleware.js");
const initDailyJob = require("./services/scheduler/dailyMessages.job");

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 60 * 1000 },
  })
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));
app.use(flash());
app.use(flashMessage);
app.use(router);
initDailyJob();

app.listen(PORT, () => {
  console.log(`La broche tourne sur http://localhost:${PORT}`);
});
