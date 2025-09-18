import { placeholders } from "./utils.script.js";
const formMessage = document.getElementById("formMessage");
const textarea = document.getElementById("message");
const modal = document.getElementById("confirmFormMessage");
const closeModalButton = document.getElementById("messageFormClosedButton");
const formSubmitButton = document.getElementById("messageFormSubmitButton");

const messageForm = {
  init: () => {
    messageForm.animatePlaceholder();
    messageForm.characterCounter();
    messageForm.confirmBeforeSubmit();
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
      messageForm.setPlaceholderText(fakePlaceholder, placeholders[index]);
      fakePlaceholder.classList.remove("out");
    }, 500);
  },

  animatePlaceholder: () => {
    const fakePlaceholder = document.getElementById("fake-placeholder");
    if (!textarea || !fakePlaceholder) return;

    let index = 0;
    fakePlaceholder.style.display = textarea.value ? "none" : "block";
    messageForm.switchPlaceholder(fakePlaceholder, placeholders, index);

    setInterval(() => {
      if (!textarea.value) {
        index = (index + 1) % placeholders.length;
        messageForm.switchPlaceholder(fakePlaceholder, placeholders, index);
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

  // ================================================================================ //
  // Submtid form manager
  // ================================================================================ //
  confirmBeforeSubmit: () => {
    if (!formMessage || !modal) return;

    formMessage.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.showModal();
    });

    closeModalButton.addEventListener("click", () => {
      modal.close();
    });

    formSubmitButton.addEventListener("click", () => {
      formSubmitButton.disabled = true;
      modal.close();
      formMessage.submit();
    });
  },
};

document.addEventListener("DOMContentLoaded", messageForm.init());
