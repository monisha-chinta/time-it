import * as moment from 'moment/moment';

export function formatTime(time) {
  var t = time.split(':');
  var now = moment().hour(t[0]).minute(t[1]);
  return now.format('hh:mma')
}

export function formatFromTo(from, to) {
  var f = formatTime(from);
  var t = formatTime(to);
  return f + ' - ' + t;
}

export function compareTime(from, to) {
  var f = moment(from, ["hh:mma"])
  console.log(f);

  var t = moment(to, ["hh:mma"])
  console.log(t);
  console.log(f.isAfter(t));
  return f.isAfter(t);
}
