import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as UserActionTypes from './constants'
import {getUserInfo, getUserTweets} from "src/Main/UserCenter/api";



function* userInfoGetSaga(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(getUserInfo, action.data.username);
        yield put({type: UserActionTypes.USER_GET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: UserActionTypes.USER_GET_FAILED, error});
    }
}

const getNowPageNum = state => state.User.nowPage;

function* userTweetsNextPageSaga(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const nowPage = yield select(getNowPageNum)
        const ret = yield call(getUserTweets, action.data.username, nowPage+1);
        // 如果没有下一页， 则发送empty action。
        if(!ret.next){
            yield put({type: UserActionTypes.USER_TWEETS_IS_EMPTY});
        }
        yield put({type: UserActionTypes.USER_TWEETS_NEXT_PAGE_SUCCEEDED, data: ret.results});
    }
    catch (error) {
        yield put({type: UserActionTypes.USER_TWEETS_NEXT_PAGE_FAILED, error});
    }
}


// 监听 用户获取
export function* watchUserInfoGet() {
    yield* takeEvery(UserActionTypes.USER_INFO_GET, userInfoGetSaga)
}

export function* watchUserTweetsNextPage() {
    yield* takeEvery(UserActionTypes.USER_TWEETS_NEXT_PAGE, userTweetsNextPageSaga)
}