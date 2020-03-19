# **js.countdown**

Countdown helper with vanilla Javascript for all platforms (at least, we want it).

Here is an example of use. README will be updated.

```javascript
import CountDown from '@estharian/js.countdown';

const countDown = new CountDown(dateTime, {
  yearDOM: document.querySelectorAll('.year'),
  dayDOM: document.querySelectorAll('.day'),
  hourDOM: document.querySelectorAll('.hour'),
  minuteDOM: document.querySelectorAll('.minute'),
  secondDOM: document.querySelectorAll('.second'),
});
```
