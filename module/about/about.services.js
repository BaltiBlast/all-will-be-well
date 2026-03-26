import { CounterVisitor } from "../../models/index.mapper.js";

export async function aboutPageData() {
  const visitor = await CounterVisitor.getVisitorCounter();
  const { landingVisitCount } = visitor;

  return landingVisitCount;
}
