import {call, put, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import {getHomeTweets} from "src/Main/Home/api";
import * as TweetListActionTypes from './constants'

const getNowPageNum = state => state.TweetList.nowPage;


function* tweetNextPage(action) {
    /**
     * 获得当前页，发送请求，再发出SUCCEEDED action
     */
    try {
        const nowPage = yield select(getNowPageNum)
        const ret = yield call(getHomeTweets, 1);
        if(!ret.next){
            yield put({type: TweetListActionTypes.TWEETS_IS_EMPTY});
        }
        const list = []
        for(let i=0;i<2;i++) {
            list.push(...ret.data.results)
        }
        yield put({type: TweetListActionTypes.TWEETS_NEXT_PAGE_SUCCEEDED, data: list});
    } catch (error) {
        yield put({type: TweetListActionTypes.TWEETS_NEXT_PAGE_FAILED, error});
    }
}

// 监听NextPageAction
export function* watchTweetNextPage() {
    yield* takeEvery(TweetListActionTypes.TWEETS_NEXT_PAGE, tweetNextPage)
}