const countDown = new CountDown('2023-01-14T10:41:40.057017Z', {
  yearDOM: document.querySelector('.js-countdown-year'),
  dayDOM: document.querySelector('.js-countdown-day'),
  hourDOM: document.querySelector('.js-countdown-hour'),
  minuteDOM: document.querySelector('.js-countdown-minute'),
  secondDOM: document.querySelector('.js-countdown-second'),
})

countDown.initialize()