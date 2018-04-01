import * as actionTypes from "./constants";

/**
 * Tweet comment
 */
export function tweetCommentLeave(data) {
    return {
        type: actionTypes.TWEET_COMMENT_LEAVE,
        data
    }
}

export function tweetCommentLeaveSucceeded(data) {
    return {
        type: actionTypes.TWEET_COMMENT_LEAVE_SUCCEEDED,
        data
    }
}

export function tweetCommentLeaveFailed(error) {
    return {
        type: actionTypes.TWEET_COMMENT_LEAVE_FAILED,
        error
    }
}


export function tweetCommentRemove(data) {
    return {
        type: actionTypes.TWEET_COMMENT_REMOVE,
        data
    }
}

export function tweetCommentRemoveSucceeded(data) {
    return {
        type: actionTypes.TWEET_COMMENT_REMOVE_SUCCEEDED,
        data
    }
}

export function tweetCommentRemoveFailed(error) {
    return {
        type: actionTypes.TWEET_COMMENT_REMOVE_FAILED,
        error
    }
}


/**
 * Tweet relations data{type,tweetId}
 */
export function tweetRelationsSet(data) {
    return {
        type: actionTypes.TWEET_RELATIONS_SET,
        data
    }
}

export function tweetRelationsSetSucceeded(data) {
    return {
        type: actionTypes.TWEET_RELATIONS_SET_SUCCEEDED,
        data
    }
}

export function tweetRelationsSetFailed(error) {
    return {
        type: actionTypes.TWEET_RELATIONS_SET_FAILED,
        error
    }
}


/**
 * User relations
 */
export function personRelationsSet(data) {
    return {
        type: actionTypes.PERSON_RELATIONS_SET,
        data
    }
}

export function personRelationsSetSucceeded(data) {
    return {
        type: actionTypes.PERSON_RELATIONS_SET_SUCCEEDED,
        data
    }
}

export function personRelationsSetFailed(error) {
    return {
        type: actionTypes.PERSON_RELATIONS_SET_FAILED,
        error
    }
}

/**
 * tweet 评论
 */
export function tweetCommentNextPage(data) {
    return{
        type: actionTypes.TWEET_COMMENT_NEXT_PAGE,
        tweetId: data.tweetId,
        page: data.page,

    }
}

export function tweetCommentNextPageSucceeded(data) {
    return{
        type: actionTypes.TWEET_COMMENT_NEXT_PAGE_SUCCEEDED,
        data
    }
}

export function tweetCommentNextPageFailed(error) {
    return{
        type: actionTypes.TWEET_COMMENT_NEXT_PAGE_FAILED,
        error
    }
}





/**
 * reset!
 * @returns {{type, data: {id,Type}}}
 */
export function relationsRefreshDone(data) {
    return {
        type: actionTypes.RELATIONS_REFRESH_DONE,
        data
    }
}


