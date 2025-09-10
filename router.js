const express = require("express");
const router = express.Router();

const form = require("./controllers/form/form.controller.js");
const { getForm } = form;

router.get("/", getForm);

module.exports = router;
