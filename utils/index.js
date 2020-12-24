/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime (time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1];
  const params = Object.create(null);
  if (!search) {
    return params;
  }
  const parts = search.split('&');
  for (let i = 0, len = parts.length; i < len; i++) {
    const param = parts[i].split('=');
    let key = param[0];
    const value = param.length > 1 ? param[1] : null;
    // 判断参数是否是数组
    if (key.indexOf('[]') !== -1) {
      key = decodeURIComponent(key.substring(0, key.length - 2));
      if (params[key] instanceof Array) {
        params[key].push(decodeURIComponent(value));
        continue;
      }
      params[key] = [decodeURIComponent(value)];
      continue;
    }
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return params;
}

/**
 *
 * @param {*} param
 * @param {*} url
 */
export function addParamToUrl (param, url) {
  url = url == null ? window.location.href : url;
  const originParam = param2Obj(url);
  let originUrl = url.split('?')[0] + '?';
  param = { ...originParam, ...param };
  for (const o in param) {
    originUrl += encodeURIComponent(o) + '=' + encodeURIComponent(param[o]) + '&';
  }
  originUrl = originUrl.slice(0, originUrl.length - 1);
  return originUrl;
}

export function downloadFile (url, data, method = 'GET') {
  const body = document.getElementsByTagName('body')[0];
  const form = document.createElement('form');
  form.method = method;
  form.action = url;
  for (const key in data) {
    const param = document.createElement('input');
    param.type = 'hidden';
    param.name = key;
    param.value = data[key];
    form.appendChild(param);
  }
  body.appendChild(form);
  form.submit();
  body.removeChild(form);
}
// eslint-disable-next-line no-extend-native
String.prototype.firstUpperCase = function () {
  return this.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2;
  });
}

export function getBaseUrl (url) {
  url = url || window.location.href;
  url = new URL(url);
  return url.origin + '/' + url.pathname.split('/')[1] || '';
}
