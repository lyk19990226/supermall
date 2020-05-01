// 公共的方法（功能）
export function  debounce(func,delay=100) {//防抖函数：如以前加载30张图片需要调用30次refresh函数来加载更新scroll的scrollerHeight值从而防止出现短暂卡顿的bug，
    //    而用了防抖函数，就可以减少调用refresh的次数，大大提高性能
    let timer = null 
    return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this,args)
        },delay)
    }
}



// 将时间戳转成年月日的格式
export function formatDate(date, fmt) {
    // 1. 获取年份
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        // fmt = fmt.replace('yyyy', (2019).substr(0))
    };
    // 2. 获取

    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (let k in o) {
        if(new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ===1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}