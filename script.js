const MENU = document.querySelector('.navigation');
const PHONES = document.querySelectorAll('.phone');
const PORTFOLIO = document.querySelector('.portfolio');
const PORTFOLIO_TAGS = document.querySelector('.portfolio__tags');
const POPUP = document.querySelector('.modal');
const BUTTON = document.querySelector('.button');
const BUTTON_CLOSE = document.querySelector('.button-close');
const CONTROL_PREV = document.querySelector('.slider__control-prev');
const CONTROL_NEXT = document.querySelector('.slider__control-next');
const FORM = document.querySelector('form');

MENU.addEventListener('click', (evt) => {
  MENU.querySelectorAll('.navigation__link').forEach(el => el.classList.remove('active'));
  evt.target.closest('.navigation__link').classList.add('active');
})

// slider
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
  let allowedTime = 300;

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
    console.log(elapsedTime, distX, distY)

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

// Phones displays

PHONES.forEach(el => {
  el.addEventListener('click', () => {
    const phoneDisplay =  el.querySelector('.phone__display');
      if (phoneDisplay.className.includes('phone__display_off')) {
        phoneDisplay.classList.remove('phone__display_off');
      } else {
        phoneDisplay.classList.add('phone__display_off');
      }
  })
})

// Portfolio

PORTFOLIO_TAGS.addEventListener('click', (evt) => {
  PORTFOLIO_TAGS.querySelectorAll('.portfolio__tag').forEach(el => el.classList.remove('selected'));
    evt.target.closest('.portfolio__tag').classList.add('selected');

    function getRandomInt(max) {
      return String(Math.floor(Math.random() * Math.floor(max)));
    }

    PORTFOLIO.querySelectorAll('.portfolio__item').forEach(el => {
    el.style.order = getRandomInt(12);
    el.classList.remove('onclick');
    });
})

PORTFOLIO.addEventListener('click', (evt) => {

  PORTFOLIO.querySelectorAll('.portfolio__item').forEach(el => el.classList.remove('onclick'));
    evt.target.closest('.portfolio__item').classList.add('onclick');
})

// Form

FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (FORM.checkValidity()) {
  const subject = document.querySelector('.subject').value;
  const description = document.querySelector('.description').value;
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

  POPUP.classList.add('modal_show');
  }

  FORM.reset();
  return false;
})

BUTTON_CLOSE.addEventListener('click', (evt) => {
  POPUP.classList.remove('modal_show');
})

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode == 27) {
    POPUP.classList.remove('modal_show');
  }
});
