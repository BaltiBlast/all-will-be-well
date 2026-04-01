// utils/metaRegistry.js
const defaults = {
  title: "Capsule temporelle gratuite | Florian Fougeray",
  description:
    "Écrivez un message à votre futur vous, gratuitement et simplement. Projet par Florian Fougeray, développeur freelance JS.",
  image: null,
};

// Normalise: retire query/hash et le slash final (sauf pour '/')
function normalizePath(path) {
  const clean = path.split("?")[0].replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

// Tableau central: route exacte + métas
const metaPages = [
  {
    route: "/",
    title: "Envoyez un message à votre futur vous – 100% gratuit",
    description: "Capsule temporelle numérique gratuite : écrivez aujourd’hui, recevez demain, dans 1 an ou 10 ans.",
    styles: ["home"],
  },
  {
    route: "/tool/message",
    title: "Envoyez un message à votre futur vous – 100% gratuit",
    description: "Capsule temporelle numérique gratuite : écrivez aujourd’hui, recevez demain, dans 1 an ou 10 ans.",
    styles: ["timeCapsuleMessage"],
    scripts: ["timeCapsuleMessage"],
  },
  {
    route: "/about",
    title: "À propos | Capsule temporelle gratuite par Florian Fougeray",
    description: "Pourquoi l’app est gratuite, qui l’a créée et comment les données sont gérées.",
  },
];

export function resolveMeta(req, overrides = {}) {
  const currentPath = normalizePath(req.path);

  // Match exact (avec normalisation)
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
