const mql = window.matchMedia("(min-width: 1024px)")
const titleWrapper = document.querySelector('.projects__title-wrapper');
let descriptionWrapper;

const setPaddingVal = (val) => {
  descriptionWrapper = document.querySelectorAll('.projects__description-wrapper');

  descriptionWrapper.forEach(elem => {
    elem.style.paddingTop = val;
  });
};

const handleWindowResize = () => {
  const height = titleWrapper.clientHeight;
  const padding = parseInt(getComputedStyle(titleWrapper).paddingTop);
  const pureHeight = height - padding;

  setPaddingVal(`${pureHeight}px`);
};

function handleOrientationChange(mql) {
  if (mql.matches) {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
  } else {
    window.removeEventListener('resize', handleWindowResize);
    setPaddingVal(null);
  }
}

if (titleWrapper) {
  // Run the orientation change handler once.
  handleOrientationChange(mql);

  // Add the callback function as a listener to the query list.
  mql.addListener(handleOrientationChange);
}
