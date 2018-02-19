import * as actionTypes from "./constants";
import {stateChildOperByKey} from "src/shared/js/reducerUtils";
import {RefreshState} from "src/extra/Relation/model";

const initialState = {
    user: {},
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
            return Object.assign({}, state, {user: action.data});
        case actionTypes.USER_GET_FAILED:
            return Object.assign({}, state, {prompt: action.error});

        /**
         * 用户relations
         */
        case actionTypes.USER_RELATIONS_GET_SUCCEEDED:
            return stateChildOperByKey(state, "user", {"relations_obj": action.data})


        /**
         * 用户推文
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