import ux from "./ux.script.js";
import messageForm from "./messageForm.script.js";

const scriptManager = {
  init: () => {
    ux.init();
    messageForm.init();
  },
};

document.addEventListener("DOMContentLoaded", scriptManager.init());
