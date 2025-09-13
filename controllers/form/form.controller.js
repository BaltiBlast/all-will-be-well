const form = {
  getForm: (req, res) => {
    res.render("form");
  },

  postMessage: (req, res) => {
    console.log("form triggered");
  },
};

module.exports = form;
