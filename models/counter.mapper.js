const CoreMapper = require("./core.mapper.js");
const counterSchema = require("../schemas/counter.schema.js");

class CounterMapper extends CoreMapper {
  counter = this.mongoose.model("Counter", counterSchema);

  async incrementCounter() {
    const res = await this.counter
      .findOneAndUpdate({ _id: "singleton" }, { $inc: { sentMessageCount: +1 } }, { upsert: true, new: true })
      .lean();

    return res.sentCount;
  }
}

module.exports = CounterMapper;
