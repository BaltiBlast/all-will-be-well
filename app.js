import express from "express";
import router from "./router.js";
import session from "express-session";
import flash from "connect-flash";
import flashMessage from "./middlewares/message.middleware.js";
import messageDispatch from "./services/scheduler/dailyTasks.job.js";
import { resolveMeta } from "./utils/metaRegistry.js";

// console.log(resolveMeta.resolveMeta);

const app = express();
const PORT = 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 60 * 1000 },
  }),
);

app.use((req, res, next) => {
  res.locals.meta = resolveMeta(req);
  next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));
app.use(flash());
app.use(flashMessage);
app.use(router);
messageDispatch.init();

app.listen(PORT, () => {
  console.log(`La broche tourne sur http://localhost:${PORT}`);
});
