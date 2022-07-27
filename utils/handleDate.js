/***
 * Date in format: MM-DD-YYYY
 */

const addZero = (i = string | number) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
};
const today = new Date();
const fullYear = today.getFullYear();
const month = addZero(today.getMonth()+1);
const day = addZero(today.getDate());
const Hours = addZero(today.getHours());
const Mins = addZero(today.getMinutes());
const Secs = addZero(today.getSeconds());

let date = [fullYear, month, day].join("-");
let time =  [Hours, Mins, Secs].join("-");

module.exports = {date, time};