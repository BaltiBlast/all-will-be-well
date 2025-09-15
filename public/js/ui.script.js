import { placeholders } from "./utils.script.js";
const textarea = document.getElementById("message");

const ux = {
  init: () => {
    ux.animatePlaceholder();
    ux.characterCounter();
  },
  // ================================================================================ //
  // Textarea placeholder's animation
  // ================================================================================ //
  setPlaceholderText: (fakePlaceholder, text) => {
    fakePlaceholder.textContent = text;
  },

  switchPlaceholder: (fakePlaceholder, placeholders, index) => {
    fakePlaceholder.classList.add("out");

    setTimeout(() => {
      ux.setPlaceholderText(fakePlaceholder, placeholders[index]);
      fakePlaceholder.classList.remove("out");
    }, 500);
  },

  animatePlaceholder: () => {
    const fakePlaceholder = document.getElementById("fake-placeholder");
    if (!textarea || !fakePlaceholder) return;

    let index = 0;

    ux.switchPlaceholder(fakePlaceholder, placeholders, index);

    setInterval(() => {
      if (!textarea.value) {
        index = (index + 1) % placeholders.length;
        ux.switchPlaceholder(fakePlaceholder, placeholders, index);
      }
    }, 4000);

    textarea.addEventListener("input", () => {
      fakePlaceholder.style.display = textarea.value ? "none" : "block";
    });
  },

  // ================================================================================ //
  // Textarea character counter
  // ================================================================================ //
  characterCounter: () => {
    const counter = document.getElementById("char-counter");
    const max = textarea.getAttribute("maxlength");
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / ${max}`;
    });
  },
};

export default ux;
