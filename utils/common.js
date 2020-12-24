// 数字精确小数
function getNumber (num) {
  let newNum = 0;
  // 判断是否为数字类型('1'默认让其为数字类型)
  if (num === '' || num === null || num === 0 || typeof num === 'object' || isNaN(num)) {
    newNum = num;
    return newNum
  }
  if (num > 0 && num <= 0.01) {
    newNum = 0.01;
    return newNum
  }
  newNum = num + '';
  if (newNum.indexOf('.') === -1) {
    return newNum;
  } else {
    const count = newNum.length - newNum.indexOf('.') + 1;
    if (count <= 2) {
      newNum = (newNum - 0).toFixed(count)
    } else {
      newNum = (newNum - 0).toFixed(2)
    }
  }
  return newNum;
}

export default function (Vue) {
  Vue.prototype.$common = {
    getNumber
  }
}
