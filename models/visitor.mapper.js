const CoreMapper = require("./core.mapper.js");
const counterVisitorSchema = require("../schemas/visitor.schema.js");

class VisitorMapper extends CoreMapper {
  counter = this.mongoose.models.Visitor || this.mongoose.model("Visitor", counterVisitorSchema);

  async getVisitorCounter() {
    const res = await this.counter.findOne({ _id: "singleton" }).lean();
    return res ?? { _id: "singleton", landingVisitCount: 0 };
  }

  async incrementCounter() {
    const res = await this.counter
      .findOneAndUpdate(
        { _id: "singleton" },
        { $inc: { landingVisitCount: 1 } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
      .lean();
    return res.landingVisitCount;
  }
}

module.exports = VisitorMapper;
