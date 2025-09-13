const express = require("express");
const router = express.Router();

const form = require("./controllers/form/form.controller.js");
const { getForm, postMessage } = form;

const about = require("./controllers/about/about.controller.js");
const { getAbout } = about;

const error404 = require("./controllers/errors/404.controller.js");
const { get404 } = error404;

router.get("/", getForm);
router.get("/about", getAbout);
router.post("/add-message", postMessage);

// 404
router.use(get404);

module.exports = router;
