const firstSliders = document.querySelectorAll('.first-slider');
const navItemTemplate = document.querySelector('#slider-nav-item').content;
const radioButtonTemplate = document.querySelector('#slider-radio-button').content;
let outerSliderItems;
let navList;
let outerControlList;
let lastItemValue;

const onIsCountSliderItems = (navValue, lastValue, itemButton) => {
  if (!navValue) {
    itemButton.textContent = lastValue;
  } else {
    itemButton.textContent = navValue;
  }
}; 

const onSetDatasetAttr = (itemButton, i) => {
  itemButton.dataset.index = i;
};

const createSliderNavigation = (outerItems, temp, activeClass, wrapper, cb1, cb2) => {
  outerItems.forEach((elem, i) => {
    const index = i + 1;
    const navItemValue = elem.dataset.nav;
    const itemClonned = temp.cloneNode(true);
    const item = itemClonned.querySelector('li');
    const itemButton = item.querySelector('button');

    if (i === 0) item.classList.add(activeClass);
    if (navItemValue) lastItemValue = navItemValue;

    if (cb1) cb1(navItemValue, lastItemValue, itemButton);

    itemButton.ariaLabel = `Slide ${index}`;

    if (cb2) cb2(itemButton, i);

    wrapper.append(item);
  });
};

if (firstSliders.length) {
  firstSliders.forEach(elem => {
    outerSliderItems = elem.querySelectorAll('.first-slider__outer-item');
    navList = elem.querySelector('.first-slider__nav-list');
    outerControlList = elem.querySelector('.first-slider__outer-control-list');

    createSliderNavigation(outerSliderItems, navItemTemplate, 'nav-active', navList, onIsCountSliderItems, onSetDatasetAttr);

    // create radio button navigation
    createSliderNavigation(outerSliderItems, radioButtonTemplate, 'radio-active', outerControlList);
  });
}
