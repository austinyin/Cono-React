import * as actionTypes from "./constants";

/**
 * 用户搜索
 */
export function userSearchGet(key) {
    return{
        type: actionTypes.USER_SEARCH_GET,
        key
    }
}

export function userSearchGetSucceeded(userList) {
    return{
        type: actionTypes.USER_SEARCH_GET_SUCCEEDED,
        userList
    }
}

export function userSearchGetFailed(error) {
    return{
        type: actionTypes.USER_SEARCH_GET_FAILED,
        error
    }
}