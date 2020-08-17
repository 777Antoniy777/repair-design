const scrollButtonWrapper = document.querySelector('.intro__scroll-wrapper');
const scrollButton = scrollButtonWrapper.querySelector('.intro__scroll-button');

const handleScrollButtonClick = (evt) => {
  evt.preventDefault();
  const coords = scrollButtonWrapper.getBoundingClientRect();
  const {bottom} = coords; 
  const scrollHeight = `${bottom}`;

  window.scrollBy({
    top: scrollHeight,
    behavior: 'smooth',
  });
};

scrollButton.addEventListener('click', handleScrollButtonClick);
