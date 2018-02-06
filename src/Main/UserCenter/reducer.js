import * as actionTypes from "./constants";

const initialState = {
    userInfo: {},
    nowPage: 0,
    tweetList: [],
    isEmpty: false,
    prompt: ''
};

export default function User(state = initialState, action) {

    switch (action.type) {
        /**
         * 用户信息
         */
        case actionTypes.USER_GET_SUCCEEDED:
            return Object.assign({}, state, {userInfo: action.data});
        case actionTypes.USER_GET_FAILED:
            return Object.assign({}, state, {prompt: action.error});

        /**
         * 推文
         */
        case actionTypes.USER_TWEETS_NEXT_PAGE_SUCCEEDED:
            return Object.assign({}, state, {
                nowPage: state.nowPage + 1,
                tweetList: [...state.tweetList, ...action.data]
            });
        case actionTypes.USER_TWEETS_NEXT_PAGE_FAILED:
            return Object.assign({}, state, {prompt: action.error});
        case actionTypes.USER_TWEETS_IS_EMPTY:
            return Object.assign({}, state, {isEmpty: true});

        /**
         * 默认或回位
         */
        case actionTypes.USER_RESET_ALL:
            return initialState;
        default:
            return state
    }
}