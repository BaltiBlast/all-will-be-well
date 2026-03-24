import CoreMapper from "./core.mapper.js";
import counterSchema from "../schemas/counter.schema.js";

class CounterMapper extends CoreMapper {
  counter = this.mongoose.model("Counter", counterSchema);

  async getCounterMessageSent() {
    return await this.counter.findOne({ _id: "singleton" });
  }

  async incrementCounter() {
    await this.counter.findOneAndUpdate({ _id: "singleton" }, { $inc: { sentMessageCount: 1 } });
  }
}

export default CounterMapper;
