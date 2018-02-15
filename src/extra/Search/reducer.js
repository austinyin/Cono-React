import * as actionTypes from "./constants";

const initialState = {
    userList: [],
};

export default function Search(state = initialState, action) {
    switch (action.type) {
        /**
         * 用户搜索
         */
        case actionTypes.USER_SEARCH_GET_SUCCEEDED:
            console.log('action.userList',action.userList)
            return Object.assign({}, state, {userList: action.userList});
        default:
            return state
    }
}