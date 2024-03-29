/***********************************************************************************************************************
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 * String.prototype.repeat
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	  all   	all     all	                all   all     all
 * -------------------------------------------------------------------------------
 */
if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
        'use strict';
        if (this === null)
            throw new TypeError('can\'t convert ' + this + ' to object');
        var str = '' + this;
        // To convert string to integer.
        count = +count;
        // Check NaN
        if (count !== count)
            count = 0;
        if (count < 0)
            throw new RangeError('repeat count must be non-negative');
        if (count === Infinity)
            throw new RangeError('repeat count must be less than infinity');
        count = Math.floor(count);
        if (str.length === 0 || count === 0)
            return '';
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (str.length * count >= 1 << 28)
            throw new RangeError('repeat count must not overflow maximum string size');
        var maxCount = str.length * count;
        count = Math.floor(Math.log(count) / Math.log(2));
        while (count) {
            str += str;
            count--;
        }
        str += str.substring(0, maxCount - str.length);
        return str;
    };
}
/**********************************************************************************************************************/
/***********************************************************************************************************************
 * https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
 * String.prototype.padStart
 * version 1.0.1
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	  57   	  51      (No)	              44   	10      15
 * With polyfill    all   	all     all	                all   all     all
 * -------------------------------------------------------------------------------
 */
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
/**********************************************************************************************************************/
