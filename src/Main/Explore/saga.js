import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as ExploreRecommendActionTypes from './constants'
import {getRecommendTweet, getRecommendUser} from "src/Main/Explore/api";

const getNowPageNum = state => state.Explore.nowPage;


function* recommendTweetNextPage(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const nowPage = yield select(getNowPageNum);
        const ret = yield call(getRecommendTweet, 1);
        if (!ret.next) {
            yield put({type: ExploreRecommendActionTypes.RECOMMEND_TWEETS_IS_EMPTY});
        }
        const list = [];
        for (let i = 0; i < 2; i++) {
            list.push(...ret.data.results)
        }
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_TWEETS_NEXT_PAGE_SUCCEEDED, data: list});
    } catch (error) {
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_TWEETS_NEXT_PAGE_FAILED, error});
    }
}

function* recommendUserGet(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(getRecommendUser);
        const list = [];
        for (let i = 0; i < 2; i++) {
            list.push(...ret.data)
        }
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_USER_GET_SUCCEEDED, data: list});
    } catch (error) {
        yield put({type: ExploreRecommendActionTypes.RECOMMEND_USER_GET_FAILED, error});
    }
}

// 监听Explore页拉取推文的action
export function* watchRecommendTweetNextPage() {
    yield* takeEvery(ExploreRecommendActionTypes.RECOMMEND_TWEETS_NEXT_PAGE, recommendTweetNextPage)
}

// 监听Explore页拉取用户的action
export function* watchRecommendUserGet() {
    yield* takeEvery(ExploreRecommendActionTypes.RECOMMEND_USER_GET, recommendUserGet)
}