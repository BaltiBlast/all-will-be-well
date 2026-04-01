// ================================================================================ //
// SELECTORS
// ================================================================================ //
// Form
const formMessage = document.getElementById("formMessage");
const textarea = document.getElementById("message");
const modal = document.getElementById("confirmFormMessage");
const closeModalButton = document.getElementById("messageFormClosedButton");
const formSubmitButton = document.getElementById("messageFormSubmitButton");

const placeholders = [
  "Qu’aimerais-tu raconter à ton futur toi aujourd’hui ?",
  "Dans quel état d’esprit es-tu en ce moment ?",
  "Que vis-tu en ce moment, avec tes mots ?",
  "Y a-t-il quelque chose que tu aimerais relire plus tard ?",
  "Qu’aimerais-tu ne pas oublier de cette période ?",
  "Que ressens-tu aujourd’hui ?",
  "Qu’est-ce qui occupe ton esprit en ce moment ?",
  "Y a-t-il une situation sur laquelle tu aimerais prendre du recul ?",
  "Qu’aimerais-tu dire à la personne que tu seras dans quelque temps ?",
  "Que voudrais-tu observer chez toi dans quelques jours ou quelques mois ?",
  "Y a-t-il un choix, un doute ou une étape que tu veux poser par écrit ?",
  "Qu’espères-tu voir évoluer d’ici quelque temps ?",
  "Si tu relis ce message plus tard, qu’aimerais-tu y retrouver ?",
  "Qu’aimerais-tu te rappeler de ce moment précis ?",
  "Que voudrais-tu confier à ton futur toi, simplement ?",
];

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
