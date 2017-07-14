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
