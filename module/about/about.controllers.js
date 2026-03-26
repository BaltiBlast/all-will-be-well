import * as services from "./about.services.js";

export async function getAboutPage(req, res) {
  try {
    const pageData = await services.aboutPageData();

    return res.render("about", { landingVisitCount: pageData });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}
