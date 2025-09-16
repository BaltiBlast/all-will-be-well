const ux = {
  init: () => {},

  // ================================================================================ //
  // Toastify messages
  // ================================================================================ //
  toastMessageManager: () => {
    const messageContainer = document.getElementById("toast-message");

    if (messageContainer && messageContainer.dataset.success === "false") {
      ux.toastErrorMessage(message);
    }
  },

  toastErrorMessage: () => {},
};

export default ux;
