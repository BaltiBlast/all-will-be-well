const CoreMapper = require("./core.mapper.js");
const counterSchema = require("../schemas/counter.schema.js");

class CounterMapper extends CoreMapper {
  counter = this.mongoose.model("Counter", counterSchema);

  async getCounterMessageSent() {
    return await this.counter.findOne({ _id: "singleton" });
  }

  async incrementCounter() {
    await this.counter.findOneAndUpdate({ _id: "singleton" }, { $inc: { sentMessageCount: 1 } });
  }
}

module.exports = CounterMapper;
