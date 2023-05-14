const btnEl = document.querySelector('.js-buttons__wrapper');
const clockEl = document.querySelector('.js-clock-items');

let intervalId = null;
const timeZone = -new Date().getTimezoneOffset() / 60;
console.log(timeZone);

btnEl.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  const showBtn = e.target.matches('button.js-show');
  const hideBtn = e.target.matches('button.js-hide');

  if (showBtn) {
    document.querySelector('.clock').classList.remove('is-hidden');
    btnEl.querySelector('.js-show').classList.add('is-hidden');
    btnEl.querySelector('.js-hide').classList.remove('is-hidden');
    btnEl.querySelector('.js-change').classList.remove('is-hidden');
    startClock(clockEl);
  }
}

function startClock(rootSelector) {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const { hours, minutes, seconds } = getTimeComponents(currentTime);
    rootSelector.querySelector('.js-clock__hours').textContent = addPad(hours);
    rootSelector.querySelector('.js-clock__minutes').textContent =
      addPad(minutes);
    rootSelector.querySelector('.js-clock__seconds').textContent =
      addPad(seconds);

    //---///
    rootSelector.querySelector('.js-clock__hours').dataset.title =
      declensionNum(hours, ['година', 'години', 'годин']);
    rootSelector.querySelector('.js-clock__minutes').dataset.title =
      declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
    rootSelector.querySelector('.js-clock__seconds').dataset.title =
      declensionNum(seconds, ['секунда', 'секунди', 'секунд']);
  }, 1000);
}

function addPad(value) {
  return String(value).padStart(2, 0);
}

function getTimeComponents(time) {
  let hours = Math.floor(((time / 1000 / 60 / 60) % 24) + timeZone);
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

function declensionNum(num, words) {
  return words[
    num % 100 > 4 && num % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
  ];
}
