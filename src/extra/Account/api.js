import {post} from "src/shared/js/axiosUtil";
import { Cookies } from 'react-cookie';


/**
 * registApi,loginApi, loginCheckApi
 * return data is like {type:message,user:user}
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


export function changePasswordApi(data) {
    let url = "http://127.0.0.1:8000/api/account/change/password";
    return post(url,data).then(ret => {
        return ret.data
    })
}

export function changeSelfInfoApi(data) {
    let url = "http://127.0.0.1:8000/api/account/change";
    return post(url,data).then(ret => {
        return ret.data
    })
}

export function changeAvatarApi(data) {
    let url = "http://127.0.0.1:8000/api/account/change/avatar";
    return post(url,data).then(ret => {
        return ret.data
    })
}





