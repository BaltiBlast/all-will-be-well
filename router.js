const express = require("express");
const router = express.Router();

const form = require("./controllers/form/form.controller.js");
const { getForm } = form;

const about = require("./controllers/about/about.controller.js");
const { getAbout } = about;

router.get("/", getForm);
router.get("/about", getAbout);

module.exports = router;
