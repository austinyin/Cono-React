import {post} from "src/shared/js/axiosUtil";


/**
 * registApi,loginApi, loginCheckApi
 * return data is like {type:message,user:userInfo}
 */
export function registApi(data) {
    let url = "http://127.0.0.1:8000/api/account/regist";
    return post(url, JSON.stringify(data)).then(ret => {
        return ret.data
    })
}

export function loginApi(data) {
    let url = "http://127.0.0.1:8000/api/account/login";

    return post(url, JSON.stringify(data)).then(ret => {
        return ret.data
    })
}

export function loginCheckApi() {
    let url = "http://127.0.0.1:8000/api/account/loginCheck";
    return post(url).then(ret => {
        return ret.data
    })
}




export function logoutApi() {
    let url = "http://127.0.0.1:8000/api/account/logout";
    return post(url).then(ret => {
        return ret.data
    })
}




