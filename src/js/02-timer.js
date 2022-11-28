import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('[datetime-picker]');
const btnEl = document.querySelector('button[data-start]');
const dayEl = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minutEl = document.querySelector('span[data-minutes]');
const secondEl = document.querySelector('span[data-seconds]');
btnEl.disabled = true;

let chosenTime = null;
let selectedTime = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    chosenTime = selectedDates[0].getTime();
    selectedTime = chosenTime - new Date();
    selectedTime <= 0
      ? (window.alert(
          'You cannot select a past date',
          'Please choose a date in the future',
          'Ok'
        ),
        (btnEl.disabled = true))
      : (btnEl.disabled = false);
  },
};

flatpickr('#datetime-picker', options);
btnEl.addEventListener('click', onStartBtnClick);

const timer = {
  intervalID: null,
  isActive: false,

  onClose() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const curentDate = Date.now();

    let counting = chosenTime - curentDate;

    this.intervalID = setInterval(() => {
      counting = counting -= 1000;
      const timerComponents = convertMs(counting);
      updateClockFace(timerComponents);
      if (counting <= 0) {
        console.log(`Interval width id ${this.intervalID} has stopped!`);
        stopInterval(this.intervalID);
      }
    }, 1000);
  },
};
function stopInterval(intervalID) {
  clearInterval(intervalID);
  console.log(`Interval width id ${intervalID} has stopped!`);
  updateClockFace(00, 00, 00, 00);
}
function onStartBtnClick() {
  timer.onClose();
  btnEl.setAttribute('disabled', true);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  dayEl.textContent = `${days}`;
  hourEl.textContent = `${hours}`;
  minutEl.textContent = `${minutes}`;
  secondEl.textContent = `${seconds}`;
}
