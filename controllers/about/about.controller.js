import { CounterVisitor } from "../../models/index.mapper.js";

const about = {
  getAbout: async (req, res) => {
    const visitor = await CounterVisitor.getVisitorCounter();
    const { landingVisitCount } = visitor;

    res.render("about", { landingVisitCount });
  },
};

export default about;
