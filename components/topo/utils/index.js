import merge from 'lodash/merge';
import pick from 'lodash/pick';
import uniqueId from 'lodash/uniqueId';
import upperFirst from 'lodash/upperFirst';

const toQueryString = obj => Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');

const addListener = (target, eventName, handler) => {
  if (typeof handler === 'function') target.on(eventName, handler);
};

const getBox = (x, y, width, height) => {
  const x1 = (x + width) < x ? (x + width) : x
  const x2 = (x + width) > x ? (x + width) : x
  const y1 = (y + height) < y ? (y + height) : y
  const y2 = (y + height) > y ? (y + height) : y
  return {
    x1, x2, y1, y2
  }
}

function toUnicode (str) {
  if (!str) {
    return '---'
  }
  var r = str.match(/\\u[0-9a-fA-F]{4}/g);
  if (r == null) {
    return str;
  }
  for (var i = 0; i < r.length; i++) {
    str = str.replace(r[i], unescape(r[i].replace('\\u', '%u')));
  }
  return str;
}

export {
  merge,
  pick,
  toQueryString,
  uniqueId,
  upperFirst,
  addListener,
  getBox,
  toUnicode
};
