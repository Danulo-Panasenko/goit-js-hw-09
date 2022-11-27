const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', onClick);
function onClick() {
  timerId = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);

  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
}

stopBtn.addEventListener('click', stopClick);

function stopClick() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
}
