// ================================================================================ //
// SELECTORS
// ================================================================================ //
// Burger menu
const burgerButton = document.getElementById("burger-button");
const closeMenuButton = document.getElementById("close-menu-button");
const sideMenu = document.getElementById("side-menu");
const overlay = document.getElementById("side-menu-overlay");

const burgerMenu = {
  init: () => {
    burgerMenu.sideMenuBurger();
  },

  sideMenuBurger: () => {
    burgerButton.addEventListener("click", burgerMenu.openMenu);
    closeMenuButton.addEventListener("click", burgerMenu.closeMenu);
    overlay.addEventListener("click", burgerMenu.closeMenu);
  },

  openMenu: () => {
    sideMenu.classList.add("open");
    overlay.classList.add("open");
  },

  closeMenu: () => {
    sideMenu.classList.remove("open");
    overlay.classList.remove("open");
  },
};

document.addEventListener("DOMContentLoaded", burgerMenu.init());
