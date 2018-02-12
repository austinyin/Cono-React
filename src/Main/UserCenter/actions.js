import * as actionTypes from "./constants";



/**
 * 用户信息获取actions data{username}
 */

export function userInfoGet(data) {
    return{
        type: actionTypes.USER_INFO_GET,
        data
    }
}

export function userGetSucceeded(data) {
    return{
        type: actionTypes.USER_GET_SUCCEEDED,
        data
    }
}

export function userGetFailed(error) {
    return{
        type: actionTypes.USER_GET_FAILED,
        error
    }
}



/**
 * 用户推文actions
 */


export function userTweetsNextPage(data) {
    return{
        type: actionTypes.USER_TWEETS_NEXT_PAGE,
        data
    }
}

export function userTweetsGetSucceeded(data) {
    return{
        type: actionTypes.USER_TWEETS_NEXT_PAGE_SUCCEEDED,
        data
    }
}

export function userTweetsGetFailed(error) {
    return{
        type: actionTypes.USER_TWEETS_NEXT_PAGE_FAILED,
        error
    }
}

export function userTweetsIsEmpty() {
    return{
        type: actionTypes.USER_TWEETS_IS_EMPTY,
    }
}


/**
 * 清除
 */

export function userResetAll() {
    return{
        type: actionTypes.USER_RESET_ALL,
    }
}

