import * as actionTypes from './constants'

import {getHomeTweets} from "src/Main/Home/api";

const initialState = {
    nowPage: 0,
    TweetList: [],
    prompt: ''
};

export default function TweetList(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TWEET_NEXT_PAGE_SUCCEEDED:
            console.log('haha')
            return Object.assign({}, state, {nowPage: state.nowPage + 1, TweetList: action.data})
        case actionTypes.TWEET_NEXT_PAGE_FAILED:
            return Object.assign({}, state, {prompt: action.error})
        case actionTypes.ARTICLE_PAGE_RESET:
            return Object.assign({}, state, {nowPage: 0, TweetList: []});
        case 'testAction':
            return Object.assign({}, state, {nowPage: state.nowPage + 1})
        default:
            return state
    }
}