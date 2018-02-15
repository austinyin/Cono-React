import * as actionTypes from "./constants";

export function recommendTweetsNextPage() {
    return{
        type: actionTypes.RECOMMEND_TWEETS_NEXT_PAGE,
    }
}

export function recommendTweetsReset() {
    return{
        type: actionTypes.RECOMMEND_TWEETS_RESET,
    }
}

export function recommendTweetsNextPageSucceeded(data) {
    return{
        type: actionTypes.RECOMMEND_TWEETS_NEXT_PAGE_SUCCEEDED,
        data
    }
}

export function recommendTweetsNextPageFailed(error) {
    return{
        type: actionTypes.RECOMMEND_TWEETS_NEXT_PAGE_FAILED,
        error
    }
}

export function recommendTweetsEmpty() {
    return{
        type: actionTypes.RECOMMEND_TWEETS_IS_EMPTY,
    }
}


/**
 * 推荐用户actions
 *
 */

export function recommendUserGet() {
    return{
        type: actionTypes.RECOMMEND_USER_GET,
    }
}

export function recommendUserGetSucceeded(data) {
    return{
        type: actionTypes.RECOMMEND_USER_GET_SUCCEEDED,
        data
    }
}

export function recommendUserGetFailed(error) {
    return{
        type: actionTypes.RECOMMEND_USER_GET_FAILED,
        error
    }
}

/**
 * snapshot
 */

export function snapshotUserGet() {
    return{
        type: actionTypes.SNAPSHOT_USER_GET,
    }
}

export function snapshotUserGetSucceeded(data) {
    return{
        type: actionTypes.SNAPSHOT_USER_GET_SUCCEEDED,
        data
    }
}

export function snapshotUserGetFailed(error) {
    return{
        type: actionTypes.SNAPSHOT_USER_GET_FAILED,
        error
    }
}





/**
 * 通用
 */

export function resetAll() {
    return{
        type: actionTypes.RESET_ALL,
    }
}

