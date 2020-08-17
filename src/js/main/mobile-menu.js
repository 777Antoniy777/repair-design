const nav = document.querySelector('.main-header .nav');
const menuButton = nav.querySelector('.nav__menu-button');

const handleMenuButtonClick = (evt) => {
  evt.preventDefault();

  if (nav.classList.contains('menu-open')) {
    nav.classList.add('menu-close');
  } else {
    nav.classList.remove('menu-close');
  }

  nav.classList.toggle('menu-open');
};

menuButton.addEventListener('click', handleMenuButtonClick);
