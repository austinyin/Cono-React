import * as actionTypes from "./constants";


/**
 * tweet 列表
 */
export function tweetsNextPage() {
    return{
        type: actionTypes.TWEETS_NEXT_PAGE,
    }
}

export function tweetsNextPageSucceeded(data) {
    return{
        type: actionTypes.TWEETS_NEXT_PAGE_SUCCEEDED,
        data
    }
}

export function tweetsNextPageFailed(error) {
    return{
        type: actionTypes.TWEETS_NEXT_PAGE_FAILED,
        error
    }
}


export function TweetsIsEmpty() {
    return{
        type: actionTypes.TWEETS_IS_EMPTY,
    }
}


export function tweetsReset() {
    return{
        type: actionTypes.TWEETS_RESET,
    }
}


