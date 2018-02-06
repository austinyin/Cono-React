import {get} from 'src/shared/js/axiosUtil.js'


// 获取用户信息
export function getUserInfo(username) {
    let url = `http://127.0.0.1:8000/api/user/username/${username}`;

    return get(url).then(ret => {
        return ret.data
    })
}


// 获取用户发送的推
export function getUserTweets(username,page, page_size=10) {
    let url = `http://127.0.0.1:8000/api/user/username/${username}/tweets`
    let data = {
        page: page,
        page_size: page_size
    };
    return get(url, data).then(ret => {
        return ret.data
    })
}