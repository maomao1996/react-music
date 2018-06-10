// 播放数量
export const formatPlayCount = item => {
  return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : `${Math.ceil(item / 10000)}万`) : Math.floor(item)
};

// 补0函数
export const addZero = s => {
  return s < 10 ? '0' + s : s
};

// 播放时间
export const formatTime = s => {
  let minute = Math.floor(s / 60);
  let second = Math.floor(s % 60);
  return `${addZero(minute)}:${addZero(second)}`
};

/**
 * 找到并返回应项的索引
 * @param list list
 * @param music 查找对象
 */
export const findIndex = (list, music) => {
  return list.findIndex((item) => {
    return item.id === music.id
  })
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
