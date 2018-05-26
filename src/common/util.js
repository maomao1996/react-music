// 播放数量
export const formatPlayCount = function (item) {
  return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : `${Math.ceil(item / 10000)}万`) : Math.floor(item)
};

// 防抖函数
export const debounce = function (func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
};

// 节流函数
export const throttle = function (func, delay) {
  let now = Date.now();
  return function (...args) {
    const current = Date.now();
    if (current - now >= delay) {
      func.apply(this, args);
      now = current
    }
  }
};
