import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as ExploreRecommendActionTypes from './constants'
import {getRecommendUserApi, snapshotUserGetApi} from "src/Main/Explore/api";
import {getHomeTweets} from "../Home/api";

const getNowPageNum = state => state.Explore.nowPage;


function* recommendTweetNextPageSaga(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const nowPage = yield select(getNowPageNum);
        const ret = yield call(getHomeTweets, nowPage + 1);
        if (!ret.next) {
            yield put({type: ExploreRecommendActionTypes.RECOMMEND_TWEETS_IS_EMPTY});
        }

        yield put({type: ExploreRecommendActionTypes.RECOMMEND_TWEETS_NEXT_PAGE_SUCCEEDED, data: ret.results});
    } catch (error) {
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_TWEETS_NEXT_PAGE_FAILED, error});
    }
}

function* recommendUserGetSaga(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(getRecommendUserApi);
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_USER_GET_SUCCEEDED, data: ret.data});
    } catch (error) {
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_USER_GET_FAILED, error});
    }
}

function* snapshotUserGetSaga(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(snapshotUserGetApi);

        yield put({type: ExploreRecommendActionTypes.SNAPSHOT_USER_GET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: ExploreRecommendActionTypes.SNAPSHOT_USER_GET_FAILED, error});
    }
}


// 监听Explore页拉取推文的action
export function* watchRecommendTweetNextPage() {
    yield* takeEvery(ExploreRecommendActionTypes.RECOMMEND_TWEETS_NEXT_PAGE, recommendTweetNextPageSaga)
}

// 监听Explore页拉取用户的action
export function* watchRecommendUserGet() {
    yield* takeEvery(ExploreRecommendActionTypes.RECOMMEND_USER_GET, recommendUserGetSaga)
}

// 监听首页snapshot快照拉取
export function* watchSnapshotUserGet() {
    yield* takeEvery(ExploreRecommendActionTypes.SNAPSHOT_USER_GET, snapshotUserGetSaga)
}


