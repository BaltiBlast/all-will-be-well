const error404 = {
  get404: (req, res) => {
    res.render("404", { navbar: false, footer: false });
  },
};

module.exports = error404;
