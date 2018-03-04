import axios from 'axios'

// 保证session前后一致
axios.defaults.withCredentials=true;
axios.defaults.xsrfHeaderName = "X_CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
// 请求拦截,每次请求检测vuex中是否存在token
axios.interceptors.request.use(config => {
        config.headers.X_CSRFToken = "9t78aKsWB3XJ5ntiU4wvgr0u6sjLAMFIMf8RMohfAcss88kVHeBtCyZiAGuTnVJK"
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


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
