const decisionHelper = {
  init() {
    decisionHelper.bindColumnActions("pros");
    decisionHelper.bindColumnActions("cons");
  },

  // ================================================================================ //
  // Binds all column actions
  // ================================================================================ //
  bindColumnActions(type) {
    decisionHelper.bindAddButton(type);
    decisionHelper.bindRemoveAction(type);
  },

  // ================================================================================ //
  // Handles input addition
  // ================================================================================ //
  bindAddButton(type) {
    const button = document.getElementById(type);
    const list = document.getElementById(`${type}-list`);

    if (!button || !list) return;

    decisionHelper.updateButtonState(button, list);

    list.addEventListener("input", () => {
      decisionHelper.updateButtonState(button, list);
    });

    button.addEventListener("click", () => {
      if (!decisionHelper.canAddInput(list)) return;

      const item = decisionHelper.createItem(type, list);
      list.appendChild(item);
      decisionHelper.updateButtonState(button, list);

      const input = item.querySelector("input");
      if (input) input.focus();
    });
  },

  // ================================================================================ //
  // Handles input removal
  // ================================================================================ //
  bindRemoveAction(type) {
    const list = document.getElementById(`${type}-list`);
    const button = document.getElementById(type);

    if (!list || !button) return;

    list.addEventListener("click", (event) => {
      const removeButton = event.target.closest(".remove-input");

      if (!removeButton) return;

      const item = removeButton.closest("li");

      if (!item) return;

      item.remove();
      decisionHelper.updateButtonState(button, list);
    });
  },

  // ================================================================================ //
  // Checks if a new input can be added
  // ================================================================================ //
  canAddInput(list) {
    const inputs = list.querySelectorAll("input[type='text']");
    const lastInput = inputs[inputs.length - 1];

    if (!lastInput) return false;

    return lastInput.value.trim() !== "";
  },

  // ================================================================================ //
  // Creates a new list item
  // ================================================================================ //
  createItem(type, list) {
    const item = document.createElement("li");
    item.className = "list-item";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = decisionHelper.getPlaceholder(list);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-input";
    removeButton.setAttribute("aria-label", `Remove a ${type}`);
    removeButton.textContent = "×";

    item.append(input, removeButton);

    return item;
  },

  // ================================================================================ //
  // Gets the input placeholder
  // ================================================================================ //
  getPlaceholder(list) {
    const firstInput = list.querySelector("input[type='text']");
    return firstInput ? firstInput.getAttribute("placeholder") : "";
  },

  // ================================================================================ //
  // Updates button state
  // ================================================================================ //
  updateButtonState(button, list) {
    const inputs = list.querySelectorAll("input[type='text']");
    const lastInput = inputs[inputs.length - 1];

    button.disabled = !lastInput || lastInput.value.trim() === "";
  },
};

document.addEventListener("DOMContentLoaded", () => {
  decisionHelper.init();
});
