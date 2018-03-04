import * as actionTypes from "./constants";

const initialState = {
    nowPage: 0,
    tweetData: [],
    isEmpty: false,
    prompt: ''
};

export default function Tweet(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TWEETS_NEXT_PAGE_SUCCEEDED:
            return Object.assign({}, state, {nowPage: state.nowPage + 1, tweetList: [...state.tweetData,...action.data]});
        case actionTypes.TWEETS_NEXT_PAGE_FAILED:
            return Object.assign({}, state, {prompt: action.error});
        case actionTypes.TWEETS_RESET:
            return Object.assign({}, state, {nowPage: 0, tweetList: [],isEmpty: false});
        case actionTypes.TWEETS_IS_EMPTY:
            return Object.assign({}, state, {isEmpty: true});
        default:
            return state
    }
}