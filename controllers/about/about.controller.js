const { CounterVisitor } = require("../../models/index.mapper.js");

const about = {
  getAbout: async (req, res) => {
    const visitor = await CounterVisitor.getVisitorCounter();
    const { landingVisitCount } = visitor;

    res.render("about", { landingVisitCount });
  },
};

module.exports = about;
