import * as actionTypes from "./constants";

/**
 * 注册actions
 */

export function regist(data) {
    return{
        type: actionTypes.REGIST,
        data
    }
}


export function registSucceeded(data) {
    return{
        type: actionTypes.REGIST_SUCCEEDED,
        data
    }
}

export function registFailed(error) {
    return{
        type: actionTypes.REGIST_FAILED,
        error
    }
}


/**
 * 登陆actions
 */
export function login(data) {
    return{
        type: actionTypes.LOGIN,
        data
    }
}

export function loginSucceeded(data) {
    return{
        type: actionTypes.LOGIN_SUCCEEDED,
        data
    }
}

export function loginFailed(error) {
    return{
        type: actionTypes.LOGIN_FAILED,
        error
    }
}

/**
 * 登出actions
 */

export function logout(data) {
    return{
        type: actionTypes.LOGOUT,
        data
    }
}


export function logoutSucceeded(data) {
    return{
        type: actionTypes.LOGOUT_SUCCEEDED,
        data
    }
}

export function logoutFailed(error) {
    return{
        type: actionTypes.LOGOUT_FAILED,
        error
    }
}



/**
 * 清除
 */



