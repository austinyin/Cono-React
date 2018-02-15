import * as actionTypes from "./constants";

const initialState = {
    nowPage: 0,
    tweetList: [],
    userList: [],
    snapshotUserList: [],
    prompt: '' // 提示内容
};

export default function Explore(state = initialState, action) {
    switch (action.type) {
        /**
         * 推文内容
         */
        case actionTypes.RECOMMEND_TWEETS_NEXT_PAGE_SUCCEEDED:
            return Object.assign({}, state, {
                nowPage: state.nowPage + 1,
                tweetList: [...state.tweetList, ...action.data]
            });
        case actionTypes.RECOMMEND_TWEETS_NEXT_PAGE_FAILED:
            return Object.assign({}, state, {prompt: action.error});
        case actionTypes.RECOMMEND_TWEETS_IS_EMPTY:
            return Object.assign({}, state, {isEmpty: true});
        // case actionTypes.RECOMMEND_TWEETS_RESET:
        //     return Object.assign({}, state, {nowPage: 0, tweetList: []});

        /**
         * 用户内容
         */
        case actionTypes.RECOMMEND_USER_GET_SUCCEEDED:
            return Object.assign({}, state, {userList: action.data});
        case actionTypes.RECOMMEND_USER_GET_FAILED:
            return Object.assign({}, state, {prompt: action.error});

        /**
         * 首页snapshot快照
         */
        case actionTypes.SNAPSHOT_USER_GET_SUCCEEDED:
            return Object.assign({}, state, {snapshotUserList: action.data});

        /**
         * 默认或回位
         */
        case actionTypes.RESET_ALL:
            return initialState;
        default:
            return state
    }
}
