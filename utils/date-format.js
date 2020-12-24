export function dateFormat (fmt, date) {
  const self = date ? new Date(date) : new Date();
  var o = {
    'M+': self.getMonth() + 1, // 月份
    'd+': self.getDate(), // 日
    'h+': self.getHours(), // 小时
    'm+': self.getMinutes(), // 分
    's+': self.getSeconds(), // 秒
    'q+': Math.floor((self.getMonth() + 3) / 3), // 季度
    'S': self.getMilliseconds() // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (self.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}
