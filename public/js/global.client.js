// ================================================================================ //
// SELECTORS
// ================================================================================ //
// Burger menu
const burgerButton = document.getElementById("burger-button");
const closeMenuButton = document.getElementById("close-menu-button");
const sideMenu = document.getElementById("side-menu");

const global = {
  init: () => {
    global.sideMenuBurger();
  },

  sideMenuBurger: () => {
    burgerButton.addEventListener("click", global.openMenu);
    closeMenuButton.addEventListener("click", global.closeMenu);
    overlay.addEventListener("click", global.closeMenu);
  },

  openMenu: () => {
    sideMenu.classList.add("open");
  },

  closeMenu: () => {
    sideMenu.classList.remove("open");
  },
};

document.addEventListener("DOMContentLoaded", global.init());
