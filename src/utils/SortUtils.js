export function sortByUser(a, b) {
  if(a.name < b.name) {
    return -1;
  } else if(a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
}

export function sortByTime(a, b) {
  if(a.fromtime < b.fromtime) {
    return -1;
  } else if(a.fromtime > b.fromtime) {
    return 1;
  } else {
    return 0;
  }
}
