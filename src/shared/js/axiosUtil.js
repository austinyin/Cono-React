import axios from 'axios'

export function get(url, data) {
    if(data) {
        url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    }
    return new Promise((resolve, reject) => {
        axios.get(url).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export function param(data) {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}
