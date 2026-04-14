const defaults = {
  title: "All Will Be Well | Outils simples pour prendre du recul",
  description:
    "Message temporel, cohérence cardiaque et aide à la décision : des outils simples pour respirer, réfléchir et voir plus clair.",
  image: null,
};

function normalizePath(path) {
  const clean = path.split("?")[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

const metaPages = [
  {
    route: "/",
    title: "All Will Be Well | Outils simples pour prendre du recul",
    description:
      "Message temporel, cohérence cardiaque et aide à la décision : des outils simples pour respirer, réfléchir et voir plus clair.",
    styles: ["home"],
  },
  {
    route: "/tool/message",
    title: "Message temporel | All Will Be Well",
    description:
      "Écrivez un message aujourd’hui et recevez-le plus tard. Une capsule temporelle numérique simple, personnelle et gratuite.",
    styles: ["timeCapsuleMessage"],
    scripts: ["timeCapsuleMessage"],
  },
  {
    route: "/tool/decision-helper",
    title: "Aide à la décision | All Will Be Well",
    description: "Faites une liste de pour et contre pour clarifier une décision simplement et gratuitement.",
    styles: ["decisionHelper"],
    scripts: ["decisionHelper"],
  },
  {
    route: "/about",
    title: "À propos | All Will Be Well",
    description:
      "Découvrez All Will Be Well, une plateforme d’outils simples pour prendre du recul, mieux respirer et voir plus clair.",
  },
];

export function resolveMeta(req, overrides = {}) {
  const currentPath = normalizePath(req.path);

  const base = metaPages.find((p) => p.route === currentPath) || {};

  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  return {
    ...defaults,
    ...base,
    ...overrides,
    url,
    canonical: url,
  };
}
