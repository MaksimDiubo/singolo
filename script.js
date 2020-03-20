window.onload = function() {
  // Navigation
  addDocumentScrollHandler();
  addMainMenuClickHandler()
  // Slider
  sliderSwiper();
  phonesToggle();
  // Tags
  addTagClickHandler();
  // Portfolio items
  addPortfolioItemClickHandler();
  //Contacts form
  addFormSubmitHandler();
};

const addTagClickHandler = () => {
  document.querySelector('.portfolio__tags').addEventListener('click', (e) => {
    if (e.target.classList.contains('portfolio__tag')) {
      let clickedElement = e.target;
      let selectedElementClass = 'selected';
      let elements = document.querySelectorAll('.portfolio__tag');
      removeSelectedElement(elements, selectedElementClass);
      selectClickedElement(clickedElement, selectedElementClass);
      shufflePortfolioItems();
    };
  });
};

const removeSelectedElement = (elements, elementsClass) => {
  elements.forEach(element => {
    element.classList.remove(elementsClass);
  });
};

const selectClickedElement = (element, elementClass) => {
  element.classList.add(elementClass);
};

const shufflePortfolioItems = () => {
  let items = document.querySelectorAll('.portfolio__item');
  removeSelectedElement(items, 'onclick');
  let arrayFromItems = Array.from(items);
  let itemsContainer = getPortfolioItemsContainer();
  arrayFromItems.sort(() => Math.random() - 0.5)
      .forEach(item => {
        itemsContainer.append(item)
      });
};

const getPortfolioItemsContainer = () => {
  let itemsContainer = document.querySelector('.portfolio__items');
  itemsContainer.innerHTML = '';
  return itemsContainer;
}

const addPortfolioItemClickHandler = () => {
  document.querySelector('.portfolio__items').addEventListener('click', (e) => {
      let clickedElement = e.target.closest('.portfolio__item');
      let selectedElementClass = 'onclick';
      let elements = document.querySelectorAll('.portfolio__item');
      removeSelectedElement(elements, selectedElementClass);
      selectClickedElement(clickedElement, selectedElementClass);
  });
}

const addFormSubmitHandler = () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let modal = document.querySelector('.modal');
    if (form.checkValidity()) {
      addModalContent();
      selectClickedElement(modal, 'modal_show')
      }
      form.reset();
      return false;
  });
  addModalBtnClickHandler();
}

const addModalContent = () => {
  let subject = document.querySelector('.subject').value;
  let description = document.querySelector('.description').value;
  if (subject) {
    document.querySelector('.modal__subject').innerText = `Тема: ${subject.toString()}`;
  } else {
    document.querySelector('.modal__subject').innerText = 'Без темы';
  }
  if (description) {
    document.querySelector('.modal__description').innerText = `Описание: ${subject.toString()}`;
  } else {
    document.querySelector('.modal__description').innerText = 'Без описания';
  }
}

const addModalBtnClickHandler = () => {
  document.querySelector('.modal__button').addEventListener('click', () => {
    document.querySelector('.modal').classList.remove('modal_show');
  })
}

const sliderSwiper = () => {
let slider = document.querySelector('.slider');
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
};

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('current', direction);
  });
};

function showItem(direction) {
  items[currentItem].classList.add('next',direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('current');
    isEnabled = true;
  });
};

function changeBackgroundColor() {
  if (currentItem === 1) {
    slider.classList.add('bg-blue');
  } else {
    slider.classList.remove('bg-blue');
  }
};

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
  changeBackgroundColor()
};

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
  changeBackgroundColor()
};

document.querySelector('.slider__control-prev').addEventListener('click', function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector('.slider__control-next').addEventListener('click', function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});


const swipeDetect = (el) => {

  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 150;

  surface.addEventListener('mousedown', function(evt) {
    startX = evt.pageX;
    startY = evt.pageY;
    startTime = new Date().getTime();
    evt.preventDefault();
  }, false);


  surface.addEventListener('mouseup', function(evt) {
    distX = evt.pageX - startX;
    distY = evt.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime >= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    evt.preventDefault();
  }, false);

  surface.addEventListener('touchstart', function(evt) {
    if (evt.target.classList.contains('slider__control-prev') || evt.target.classList.contains('slider__control-prev-icon')) {
      if (isEnabled) {
        previousItem(currentItem);
      }
    }
    if (evt.target.classList.contains('slider__control-next') || evt.target.classList.contains('slider__control-next-icon')) {
      if (isEnabled) {
        nextItem(currentItem);
      }
    }

    let touchObj = evt.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    evt.preventDefault();
  }, false);

  surface.addEventListener('touchmove', function(evt) {
    evt.preventDefault();
  }, false);

  surface.addEventListener('touchend', function(evt) {
    let touchObj = evt.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime >= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    evt.preventDefault();
  }, false);

}
swipeDetect(slider);
}

const phonesToggle = () => {
  document.querySelectorAll('.phone').forEach(phone => {
    phone.addEventListener('click', () => {
      phone.querySelector('.phone__display').classList.toggle('phone__display_off');
    })
  })
}

const addDocumentScrollHandler = () => {
  document.addEventListener('scroll', onScroll);
}

const onScroll = () => {
  let mainHeader = document.querySelector('.header');
  let currentPosition = window.scrollY + mainHeader.offsetHeight + 2;
  let navigatedSections = document.querySelectorAll('section');
  let navigationLinks = document.querySelectorAll('.navigation__link a');

  navigatedSections.forEach(el => {
    if (window.innerHeight + window.scrollY === document.body.offsetHeight) {
      removeSelectedElement(navigationLinks, 'active');
      selectClickedElement(document.querySelector('.navigation__link:last-child a'), 'active');
    }
    if (el.offsetTop <= currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition) {
      removeSelectedElement(navigationLinks, 'active');
        navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (el.getAttribute('id') === link.getAttribute('href').substring(1)) {
          selectClickedElement(link, 'active');
        }
      })
    }
  })
}

const addMainMenuClickHandler = () => {
  document.querySelector('.hamburger').addEventListener('click', mobileMenuToggle);
  addMobileMenuClickHandler();
}

const addMobileMenuClickHandler = () => {
  document.querySelector('.mobile_nav .hamburger').addEventListener('click', mobileMenuToggle);
}

const mobileMenuToggle = () => {
  rotateMenuBtn();
  document.querySelector('.mobile_nav').classList.toggle('menu-from-left');
  setTimeout(() => {
    overlayToggle();
  }, 300);
}

const rotateMenuBtn = () => {
  document.querySelector('.hamburger').classList.toggle('rotate-right');
  document.querySelector('.mobile_nav .hamburger').classList.toggle('rotate-right')
}

const overlayToggle = () => {
  document.querySelector('body').classList.toggle('overlay');
}
