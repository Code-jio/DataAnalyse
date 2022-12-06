/**
 * 获取当前日期时间 毫秒级
 */
export function getTime(timestamp, type) {
    let date = new Date(timestamp)

    let Y = date.getFullYear();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()

    if (type === "YYYY-MM-DD  hh:mm:ss") {
        return Y + "-" + M + "-" + D + "   " + h + ":" + m + ":" + s;
    } else if (type === "hh:mm:ss") {
        return h + ":" + m + ":" + s;
    }
}

/**
 * 防抖函数(可用于防止重复提交)
 * 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
 * 如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户一直触发这个函数，
 * 且每次触发函数的间隔小于既定时间，那么防抖的情况下只会执行一次。
 *
 * @param func 执行函数
 * @param wait 间隔时间
 * @param immediate 立即执行
 */
export function debounce(fn, wait) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    };
}

/**
 * 产生随机数
 */

export function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 通过对象值来寻找键(key)
 * @param {Object} object 查找的值
 * @param {*} value 需要寻找的键
 * @returns 对象中查找到的key
 */
export function getObjectKey(object, value) {
    return Object.keys(object).find(key => object[key] == value);
}