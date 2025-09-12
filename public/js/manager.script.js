import ux from "./ui.script.js";

const scriptManager = {
  init: () => {
    ux.init();
  },
};

document.addEventListener("DOMContentLoaded", scriptManager.init());
