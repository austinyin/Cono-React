import axios from 'axios'

// 保证session前后一致
axios.defaults.withCredentials=true;

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

export function post(url,data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then((res) => {
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
