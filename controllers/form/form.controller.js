const form = {
  getForm: (req, res) => {
    res.render("form");
  },

  postMessage: (req, res) => {
    console.log(req.body);
  },
};

module.exports = form;
