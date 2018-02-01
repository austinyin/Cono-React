import { call, put, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import {getHomeTweets} from "src/Main/Home/api";
import * as TweetListActionTypes from './constants'

const getNowPageNum = state => state.TweetList.nowPage;


function* tweetNextPage(action) {
    console.log('gaga')
    try {
        const nowPage = select(getNowPageNum)
        const data = yield call(getHomeTweets);
        yield put({type: TweetListActionTypes.TWEET_NEXT_PAGE_SUCCEEDED, data});
    } catch (error) {
        yield put({type: TweetListActionTypes.TWEET_NEXT_PAGE_FAILED, error});
    }
}

export function* watchTweetNextPage() {
    yield* takeEvery(TweetListActionTypes.TWEET_NEXT_PAGE, tweetNextPage)
}