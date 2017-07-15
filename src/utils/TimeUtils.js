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
  var t = moment(to, ["hh:mma"])
  return f.isAfter(t);
}

export function checkTimeFormat(time) {
  return time.match(/^(0?[1-9]|1[012])(:[0-5]\d)[APap][mM]$/);
}
