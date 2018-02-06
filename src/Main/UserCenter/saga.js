import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as UserActionTypes from './constants'
import {getUserInfo, getUserTweets} from "src/Main/UserCenter/api";

const getNowPageNum = state => state.Explore.nowPage;


function* userTweetsNextPage(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const nowPage = yield select(getNowPageNum)
        const ret = yield call(getUserTweets, 'monkyin', 1);
        // 如果没有下一页， 则发送empty action。
        if(!ret.next){
            yield put({type: UserActionTypes.USER_TWEETS_IS_EMPTY});
        }
        console.log('ahah')
        console.log('ret', ret)
        const list = []
        for (let i = 0; i < 2; i++) {
            list.push(...ret.results) // 需要.results 是因为rest 的分页处理。
        }
        yield put({type: UserActionTypes.USER_TWEETS_NEXT_PAGE_SUCCEEDED, data: list});
    }
    catch (error) {
        yield put({type: UserActionTypes.USER_TWEETS_NEXT_PAGE_FAILED, error});
    }
}

function* userGet(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const ret = yield call(getUserInfo, 'monkyin');
        yield put({type: UserActionTypes.USER_GET_SUCCEEDED, data: ret});
    } catch (error) {
        yield put({type: UserActionTypes.USER_GET_FAILED, error});
    }
}

// 监听 用户获取
export function* watchUserGet() {
    yield* takeEvery(UserActionTypes.USER_INFO_GET, userGet)
}

export function* watchUserTweetsNextPage() {
    yield* takeEvery(UserActionTypes.USER_TWEETS_NEXT_PAGE, userTweetsNextPage)
}