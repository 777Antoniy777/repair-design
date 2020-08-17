const html = document.querySelector('html');
const overlay = html.querySelector('.overlay');
const headerNavButtonOpen = document.querySelector('.main-header .nav__button-request');
const footerNavButtonOpen = document.querySelector('.main-footer .nav__button-request');
const popupButtonClose = overlay.querySelector('.popup__button-close');

const handleNavButtonClick = (evt) => {
  evt.preventDefault();

  html.classList.add('overflow-y-hidden');
  overlay.classList.remove('popup-animation-close');
  overlay.classList.add('popup-animation-show');
};

const handleOverlayClick = (evt) => {
  const target = evt.target;
  const isButtonClose = target.closest('.popup__button-close');
  const isOverlay = target.classList.contains('overlay');

  if (isButtonClose || isOverlay) {
    evt.preventDefault();

    html.classList.remove('overflow-y-hidden');
    overlay.classList.remove('popup-animation-show');
    overlay.classList.add('popup-animation-close');

    return true;
  }

  return false;
};

const handleESCKeydown = (evt) => {
  if (evt.keyCode === 27) {
    html.classList.remove('overflow-y-hidden');
    overlay.classList.remove('popup-animation-show');
    overlay.classList.add('popup-animation-close');

    return true;
  }

  return false;
};

headerNavButtonOpen.addEventListener('click', handleNavButtonClick);
footerNavButtonOpen.addEventListener('click', handleNavButtonClick);
overlay.addEventListener('click', handleOverlayClick);
document.removeEventListener('keydown', handleESCKeydown);
document.addEventListener('keydown', handleESCKeydown);
