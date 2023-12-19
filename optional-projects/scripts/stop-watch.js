const timer = document.querySelector(".js-timer");
let isTimerOn = false;
let intervalId;

let time = JSON.parse(localStorage.getItem('time'));
if (time === null) {
  time = {
    seconds: '00',
    minutes: '00'
  };
}

timer.innerHTML = `${time.minutes} : ${time.seconds}`;

const startButton = document.querySelector(".js-start-button");

startButton.addEventListener('click', () => {
  if (!isTimerOn) {
    isTimerOn = true;
    intervalId = setInterval(() => {
      //SECONDS
      time.seconds++;
      if (time.seconds < 10) time.seconds = `0${time.seconds}`;
      if (time.seconds === 60) {
        time.seconds = '00';
        //MINUTES
        time.minutes++;
        if(time.minutes < 10) time.minutes = `0${time.minutes}`;   
      };
      timer.innerHTML = `${time.minutes} : ${time.seconds}`;

      localStorage.setItem('time', JSON.stringify(time));
    }, 1000);

    startButton.innerHTML = 'Stop';
  } else {
    isTimerOn = false;
    clearInterval(intervalId);

    startButton.innerHTML = 'Start';
  }
});

const resetButton = document.querySelector(".js-reset-button");

resetButton.addEventListener('click', () => {
  localStorage.removeItem('time');
  time.seconds = '00';
  time.minutes = '00';
  timer.innerHTML = `${time.minutes} : ${time.seconds}`;
});
