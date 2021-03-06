/**
 * 常用工具封装
 */

export function regexParseId(idStr){
    return idStr.replace(/[^0-9]/ig,"");
}

// 将用户对象列表反序列化为用户名列表
export function getMultiSelectValue(list) {
    const retList = []
    list.map((v, k) => {
        retList.push(v.value)
    })
    return retList
}

// 获取cookie
export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * @param dateObj date对象
 * @returns timeSpanStr 距离现在时间的序列格式
 */
export function pubTimeCalc (dateObj) {
    var timespan = dateObj.getTime() / 1000
    var dateTime = new Date(timespan * 1000);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    //当前时间
    var now = Date.parse(new Date());  //typescript转换写法
    var milliseconds = 0;
    var timeSpanStr;
    //计算时间差
    milliseconds = (now / 1000) - timespan;

    //一分钟以内
    if (milliseconds <= 60) {
        timeSpanStr = '刚刚';
    }
    //大于一分钟小于一小时
    else if (60 < milliseconds && milliseconds <= 60 * 60) {
        timeSpanStr = Math.ceil((milliseconds / (60))) + '分钟前';
    }
    //大于一小时小于等于一天
    else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + '小时前';
    }
    //大于一天小于等于15天
    else if (60 * 60 * 24 < milliseconds && milliseconds <= 60 * 60 * 24 * 30) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + '天前';
    }
    //大于一个月小于一年
    else if (60 * 60 * 24 * 30 < milliseconds && milliseconds <= 60 * 60 * 24 * 30 * 12){
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + '个月前';
    }
    //超过一年显示
    else {
        timeSpanStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
    }
    console.log('timeSpanStr',timeSpanStr);
    return timeSpanStr;
}