import {outerSliderArr} from "./fantasies-slider";
const mqlDt = window.matchMedia("(min-width: 1024px)");
const mqlTb = window.matchMedia("(min-width: 768px)");
const secondSliders = document.querySelectorAll('.second-slider');

const changeLayoutBg = (mql, item, items, layout) => {
  let bg;

  if (!item) {
    const tabListArr = Array.from(items);

    item = tabListArr.find(elem => {
      return elem.classList.contains('fantasies-item-active');
    });
  }

  if (!mql.matches) {
    layout.style.backgroundImage = 'none';

    return false;
  }

  bg = item.dataset.bg;

  layout.style.backgroundImage = `
    -o-linear-gradient(329.04deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.9) 100%), 
    url('${bg}')
  `;
  layout.style.backgroundImage = `
    linear-gradient(120.96deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.9) 100%), 
    url('${bg}')
  `;
};

const setSliderAnimation = (list, item) => {
  const currentOuterItem = item.querySelectorAll('.second-slider__outer-item');

  list.forEach(elem => {
    const outerItems = elem.querySelectorAll('.second-slider__outer-item');

    outerItems.forEach(elem => {
      elem.classList.remove('fantasies-slide-show');
    });
  });

  currentOuterItem.forEach(elem => {
    elem.classList.add('fantasies-slide-show');
  });
};

const toogleActiveClass = (list, item, activeClass, isSlide) => {
  list.forEach(elem => {
    elem.classList.remove(activeClass);
  });

  item.classList.add(activeClass);

  if (isSlide) {
    setSliderAnimation(list, item);
  } else {
    const tabLink = item.querySelector('a');
    tabLink.focus();
  }
};

const setTabOptions = (evt, mql, elements, startIndex, endIndex, onToogleActiveClass, onChangeLayoutBg) => {
  evt.preventDefault();
  const target = evt.target;
  const navItem = target.closest('.second-slider__nav-item');
  const [navItems, outerWrappers, layout] = elements;
  let index;

  if (!navItem) return false;

  index = navItem.dataset.index;
  onToogleActiveClass(navItems, navItem, 'fantasies-item-active', false);
  onToogleActiveClass(outerWrappers, outerWrappers[index], 'fantasies-slide-active', true);
  onChangeLayoutBg(mql, navItem, navItems, layout);

  for (let i = startIndex; i < endIndex; i++) {
    if (outerSliderArr.length && outerSliderArr[i].isOn) {
      outerSliderArr[i].goTo('first');
    }
  }
};

const handleOrientationChangeDt = (mql) => {
  secondSliders.forEach((elem, i) => {
    const navList = elem.querySelector('.second-slider__nav-list');
    const navItems = navList.querySelectorAll('.second-slider__nav-item');

    navItems[0].click();
  });
};

const handleOrientationChangeTb = (mql) => {
  let index = -1;
  let startIndexNavItems = 0;
  let endIndexNavItems = 0;

  secondSliders.forEach((elem, i) => {
    const layout = elem.closest('.fantasies__wrapper');
    const outerWrappers = elem.querySelectorAll('.second-slider__outer-wrapper');
    const navList = elem.querySelector('.second-slider__nav-list');
    const navItems = navList.querySelectorAll('.second-slider__nav-item');
    const elements = [navItems, outerWrappers, layout];

    index++;
    (index === 0) ? startIndexNavItems = index : startIndexNavItems = navItems.length + startIndexNavItems;
    endIndexNavItems = endIndexNavItems + navItems.length;

    const handleLinkClick = (evt) => {
      setTabOptions(evt, mql, elements, startIndexNavItems, endIndexNavItems, toogleActiveClass, changeLayoutBg);
    }

    if (mql.matches) {
      changeLayoutBg(mql, null, navItems, layout);
    } else {
      layout.style.backgroundImage = 'none';
    }

    navList.removeEventListener('click', handleLinkClick);
    navList.addEventListener('click', handleLinkClick);
  });
};

if (secondSliders.length) {
  // Run the orientation change handler once.
  handleOrientationChangeDt(mqlDt);
  handleOrientationChangeTb(mqlTb);

  // Add the callback function as a listener to the query list.
  mqlDt.addListener(handleOrientationChangeDt);
  mqlTb.addListener(handleOrientationChangeTb);
}
