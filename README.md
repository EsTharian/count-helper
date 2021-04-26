# **count-helper**

Count helper with vanilla JavaScript.

Here is an example of use. README will be updated on next patch.

```javascript
import {Counter} from 'count-helper';

const counter = new Counter(new Date(2021, 3, 26), {
  fullYearDOM: document.querySelector('.js-full-year'),
  fullDayDOM: document.querySelector('.js-full-day'),
  fullHourDOM: document.querySelector('.js-full-hour'),
  fullMinuteDOM: document.querySelector('.js-full-minute'),
  fullSecondDOM: document.querySelector('.js-full-second'),
  yearDOM: document.querySelector('.js-year'),
  dayDOM: document.querySelector('.js-day'),
  hourDOM: document.querySelector('.js-hour'),
  minuteDOM: document.querySelector('.js-minute'),
  secondDOM: document.querySelector('.js-second'),
  type: 'countup'
});

document.querySelector('.js-second')
  .addEventListener('countdown.negative', () => {
    console.log('negative counting stopped the counter');
  });

const time = document.timeline.currentTime;

counter.initialize(time);
```
