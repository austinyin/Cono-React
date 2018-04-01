import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as RelationActionTypes from './constants'
import {
    personRelationsSetApi, tweetCommentLeaveApi, tweetCommentNextPageApi, tweetCommentRemoveApi,
    tweetRelationsSetApi
} from "src/extra/Relation/api";


/**
 * ret返回了操作后的tweet数据
 */

function* tweetCommentLeaveSaga(action) {
    /**
     * action.data:{text,tweetId,signTargetList}
     */
    try {
        const ret = yield call(tweetCommentLeaveApi, action.data);
        yield put({type: RelationActionTypes.TWEET_COMMENT_LEAVE_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: RelationActionTypes.TWEET_COMMENT_LEAVE_FAILED, error});
    }
}


function* tweetCommentRemoveSaga(action) {
    /**
     * action.data{tweetId:number}
     */
    try {
        const ret = yield call(tweetCommentRemoveApi, action.data);
        yield put({type: RelationActionTypes.TWEET_COMMENT_REMOVE_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: RelationActionTypes.TWEET_COMMENT_REMOVE_FAILED, error});
    }
}

function* tweetCommentNextPageSaga(action) {
    /**
     * action.data{tweetId:number,page:number}
     */
    try {
        const ret = yield call(tweetCommentNextPageApi, action.data);
        yield put({type: RelationActionTypes.TWEET_COMMENT_NEXT_PAGE_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: RelationActionTypes.TWEET_COMMENT_NEXT_PAGE_FAILED, error});
    }
}



function* tweetRelationsSetSaga(action) {
    /**
     * action.data{tweetId:number,type:TweetRelationType}
     */
    try {
        const ret = yield call(tweetRelationsSetApi, action.data);
        yield put({type: RelationActionTypes.TWEET_RELATIONS_SET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: RelationActionTypes.TWEET_RELATIONS_SET_FAILED, error});
    }
}

function* personRelationsSetSaga(action) {
    /**
     * action.data{targetId:number,type:PersonRelationType}
     */
    try {
        const ret = yield call(personRelationsSetApi, action.data);
        yield put({type: RelationActionTypes.PERSON_RELATIONS_SET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: RelationActionTypes.PERSON_RELATIONS_SET_FAILED, error});
    }
}





/**
 * 评论
 */
export function* watchTweetCommentLeave() {
    yield* takeEvery(RelationActionTypes.TWEET_COMMENT_LEAVE, tweetCommentLeaveSaga)
}

export function* watchTweetCommentRemove() {
    yield* takeEvery(RelationActionTypes.TWEET_COMMENT_REMOVE, tweetCommentRemoveSaga)
}

export function* watchTweetCommentNextPage() {
    yield* takeEvery(RelationActionTypes.TWEET_COMMENT_NEXT_PAGE, tweetCommentNextPageSaga)
}




/**
 * tweetRelation
 */
export function* watchTweetRelationsSet() {
    yield* takeEvery(RelationActionTypes.TWEET_RELATIONS_SET, tweetRelationsSetSaga)
}


/**
 * personRelation
 */
export function* watchPersonRelationsSet() {
    yield* takeEvery(RelationActionTypes.PERSON_RELATIONS_SET, personRelationsSetSaga)
}


