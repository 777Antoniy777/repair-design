import {tns} from "../../../node_modules/tiny-slider/src/tiny-slider";
import {InnerSliderOption} from "./enums";
const mql = window.matchMedia("(min-width: 1024px)");
const firstSliders = document.querySelectorAll('.first-slider');
let outerSliderArr = [];

const initOuterSliderInstance = (elements, mode, mouseDrag, touch) => {
  const [container, navContainer, prevButton, nextButton] = elements;

  const slider = tns({
    container,
    mode,
    items: 1,
    center: true,
    controls: true,
    prevButton: prevButton,
    nextButton: nextButton,
    nav: true,
    navContainer,
    mouseDrag,
    touch,
    loop: false,
    nested: "inner",
  });

  return slider;
};

const initInnerSliderInstance = (elements, items, gutter, mouseDrag, touch) => {
  const [container, controlsContainer] = elements;

  const slider = tns({
    container,
    items,
    controls: true,
    controlsContainer,
    nav: false,
    gutter,
    mouseDrag,
    touch,
    loop: false,
    nested: "outer",
  });

  return slider;
};

const setButtonClass = (leftBtn, rightBtn, currentSlide, sliders, btnClass) => {
  leftBtn.classList.remove(btnClass);
  rightBtn.classList.remove(btnClass);

  if (currentSlide === 0) {
    leftBtn.classList.add(btnClass);
  }

  if (currentSlide === sliders.length - 1) {
    rightBtn.classList.add(btnClass);
  }
}

const setInnerButtonClass = (innerSlider) => {
  const info = innerSlider.getInfo();
  const {slideItems: sliders, index: currentSlide, controlsContainer} = info;
  const controlsItems = controlsContainer.children;

  setButtonClass(controlsItems[0], controlsItems[1], currentSlide, sliders, 'disabled-inner-button');
}

const setNavClass = (slider, tabList) => {
  const info = slider.getInfo();
  const {slideItems: sliders, index: currentSlide, indexCached: previousSlide, navContainer, prevButton, nextButton} = info;
  const navItems = navContainer.children;
  const tabItems = tabList.children;

  navItems[previousSlide].classList.remove('radio-active');
  navItems[currentSlide].classList.add('radio-active');
  tabItems[previousSlide].classList.remove('nav-active');
  tabItems[currentSlide].classList.add('nav-active');

  setButtonClass(prevButton, nextButton, currentSlide, sliders, 'disabled-outer-button');
}

const setInnerSliderOptions = (outerItems, items, gutter, mouseDrag, touch) => {
  outerItems.forEach((elem, i) => {
    const innerList = elem.querySelector('.first-slider__inner-list');
    const innerControlContainer = elem.querySelector('.first-slider__inner-control-wrapper');
    let innerSlider;

    if (innerSlider && innerSlider.isOn) {
      innerSlider.destroy();
    }
  
    innerSlider = initInnerSliderInstance([innerList, innerControlContainer], items, gutter, mouseDrag, touch);

    if (innerSlider) {
      const handleInnerSliderItemChange = () => {
        setInnerButtonClass(innerSlider);
      }
    
      if (innerSlider.isOn) {
        innerSlider.events.off('indexChanged', handleInnerSliderItemChange);
        innerSlider.events.on('indexChanged', handleInnerSliderItemChange);
      }
    }
  });
};

const handleOrientationChange = (mql) => {
  outerSliderArr.forEach(elem => {
    if (elem && elem.isOn) {
      elem.destroy();
    }
  });

  outerSliderArr = [];

  if (mql.matches) {
    const navList = document.querySelectorAll('.first-slider__nav-list');

    firstSliders.forEach((elem, i) => {
      const outerList = elem.querySelector('.first-slider__outer-list');
      const outerItemsList = outerList.querySelectorAll('.first-slider__outer-item');
      const outerControlList = elem.querySelector('.first-slider__outer-control-list');
      const leftOuterButton = elem.querySelector('.first-slider__outer-button--left');
      const rightOuterButton = elem.querySelector('.first-slider__outer-button--right');
      const navListItems = navList[i].querySelectorAll('.first-slider__nav-item');

      const outerSlider = initOuterSliderInstance([outerList, outerControlList, leftOuterButton, rightOuterButton], 'gallery', false, false);

      outerSliderArr.push(outerSlider);

      setInnerSliderOptions(outerItemsList, InnerSliderOption.INNER_ITEMS_DT, InnerSliderOption.INNER_GUTTER_DT, true, true);

      if (navListItems.length) {
        navListItems.forEach(elem => {
          elem.classList.remove('nav-active');
        });

        navListItems[0].classList.add('nav-active');
      }
    });
    
    outerSliderArr.forEach((elem, i) => {
      const handleSliderItemChange = () => {
        setNavClass(elem, navList[i]);
      };
      
      const handleNavListClick = (evt) => {
        const target = evt.target;
      
        if (target !== target.closest('button')) return false; 
      
        const index = target.dataset.index;
        if (elem.isOn) elem.goTo(index);
      };

      if (elem.isOn) {
        elem.events.off('indexChanged', handleSliderItemChange);
        elem.events.on('indexChanged', handleSliderItemChange);
        navList[i].addEventListener('click', handleNavListClick);
      }
    });
  } else {
    firstSliders.forEach(elem => {
      const outerList = elem.querySelector('.first-slider__outer-list');
      const outerItemsList = outerList.querySelectorAll('.first-slider__outer-item');
      const outerControlList = elem.querySelector('.first-slider__outer-control-list');
      const leftOuterButton = elem.querySelector('.first-slider__outer-button--left');
      const rightOuterButton = elem.querySelector('.first-slider__outer-button--right');

      const outerSlider = initOuterSliderInstance([outerList, outerControlList, leftOuterButton, rightOuterButton], 'carousel', true, true);

      outerSliderArr.push(outerSlider);

      setInnerSliderOptions(outerItemsList, InnerSliderOption.INNER_ITEMS_MB, InnerSliderOption.INNER_GUTTER_MB, false, false);
    });
  }
}

if (firstSliders.length) {
  // Run the orientation change handler once.
  handleOrientationChange(mql);

  // Add the callback function as a listener to the query list.
  mql.addListener(handleOrientationChange);
}
