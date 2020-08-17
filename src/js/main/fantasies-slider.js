import {tns} from "../../../node_modules/tiny-slider/src/tiny-slider";
const mql = window.matchMedia("(min-width: 1024px)");
const secondSliders = document.querySelectorAll('.second-slider');
let outerSliderArr = [];

const initOuterSliderInstance = (elements) => {
  const [container, controlsContainer] = elements;

  const slider = tns({
    container,
    items: 1,
    center: true,
    controls: true,
    controlsContainer,
    nav: false,
    mouseDrag: true,
    touch: true,
    loop: false,
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

const setOuterButtonClass = (outerSliders) => {
  outerSliders.forEach(elem => {
    const info = elem.getInfo();
    const {slideItems: slides, index: currentSlide, prevButton, nextButton} = info;

    setButtonClass(prevButton, nextButton, currentSlide, slides, 'disabled-inner-button');
  });
}

const handleSliderItemChange = () => {
  setOuterButtonClass(outerSliderArr);
}

const handleOrientationChange = (mql) => {
  if (mql.matches) {
    if (outerSliderArr.length) {
      outerSliderArr.forEach(elem => {
        if (elem.isOn) {
          elem.destroy();
        }
      });
    }

  } else {
    let indexSliderInstance = 0;

    secondSliders.forEach(elem => {
      const outerWrappers = elem.querySelectorAll('.second-slider__outer-wrapper');

      outerWrappers.forEach((elem, i) => {
        let itemSliderInstance = outerSliderArr[indexSliderInstance];

        if (!itemSliderInstance) {
          const outerList = elem.querySelector('.second-slider__outer-list');
          const outerControlContainer = elem.querySelector('.second-slider__outer-control-wrapper')

          const outerSlider = initOuterSliderInstance([outerList, outerControlContainer]);

          itemSliderInstance = outerSlider;
          outerSliderArr.push(outerSlider);
        } else if (itemSliderInstance && !itemSliderInstance.isOn) {
          outerSliderArr[indexSliderInstance] = itemSliderInstance.rebuild();
          itemSliderInstance = outerSliderArr[indexSliderInstance];
        }

        indexSliderInstance++;

        itemSliderInstance.events.off('indexChanged', handleSliderItemChange);
        itemSliderInstance.events.on('indexChanged', handleSliderItemChange);
      });
    });
  }
}

if (secondSliders.length) {
  // Run the orientation change handler once.
  handleOrientationChange(mql);

  // Add the callback function as a listener to the query list.
  mql.addListener(handleOrientationChange);
}

export {outerSliderArr};



// const sliderWrapper = document.querySelector('.fantasies__slider-wrapper');
// let imagesWrappers;
// let slider = null;
// let sliderArr = [];

// if (sliderWrapper) imagesWrappers = sliderWrapper.querySelectorAll('.fantasies__images-wrapper');

// const initSliderInstance = (index) => {
//   slider = tns({
//     container: `.fantasies__slider-wrapper .fantasies__slide-wrapper:nth-child(${index}) .fantasies__images-wrapper`,
//     items: 1,
//     center: true,
//     controls: true,
//     controlsContainer: `.fantasies__slider-wrapper .fantasies__slide-wrapper:nth-child(${index}) .fantasies__control-wrapper`,
//     nav: false,
//     mouseDrag: true,
//     touch: true,
//     loop: false,
//   });

//   return slider;
// };

// const createSlidersArr = () => {
//   imagesWrappers.forEach((elem, index) => {
//     index = index + 1;
//     slider = initSliderInstance(index);

//     sliderArr.push(slider);
//   });
// };

// if (imagesWrappers) createSlidersArr();

// const setButtonClass = (leftBtn, rightBtn, currentSlide, sliders, btnClass) => {
//   leftBtn.classList.remove(btnClass);
//   rightBtn.classList.remove(btnClass);

//   if (currentSlide === 0) {
//     leftBtn.classList.add(btnClass);
//   }

//   if (currentSlide === sliders.length - 1) {
//     rightBtn.classList.add(btnClass);
//   }
// }

// const setOuterButtonClass = (sliderArr) => {
//   sliderArr.forEach(elem => {
//     const info = elem.getInfo();
//     const {slideItems: slides, index: currentSlide, prevButton, nextButton} = info;

//     setButtonClass(prevButton, nextButton, currentSlide, slides, 'disabled-inner-button');
//   });
// }

// const handleSliderItemChange = () => {
//   setOuterButtonClass(sliderArr);
// }

// const handleOrientationChange = (mql) => {
//   if (mql.matches) {
//     sliderArr.forEach(elem => {
//       if (elem.isOn) {
//         elem.destroy();
//       }
//     });
//   } else {
//     sliderArr.forEach((elem, i) => {
//       if (!elem.isOn) {
//         sliderArr[i] = elem.rebuild();
//       }

//       sliderArr[i].events.off('indexChanged', handleSliderItemChange);
//       sliderArr[i].events.on('indexChanged', handleSliderItemChange);
//     });
//   }
// }

// if (sliderWrapper) {
//   // Run the orientation change handler once.
//   handleOrientationChange(mql);

//   // Add the callback function as a listener to the query list.
//   mql.addListener(handleOrientationChange);
// }

// export {sliderArr};
