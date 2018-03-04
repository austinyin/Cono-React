import * as actionTypes from "./constants";
import {stateChildOperByKey} from "src/shared/js/reducerUtils";

const initialState = {
    userList: [],
    // friendData: {isInit:false,list:[],filterList:[]},
};

export default function Search(state = initialState, action) {
    switch (action.type) {
        /**
         * 用户搜索
         */
        case actionTypes.USER_SEARCH_GET_SUCCEEDED:
            return Object.assign({}, state, {userList: action.userList});

        // case actionTypes.FRIEND_SEARCH_GET_SUCCEEDED:
        //     return  stateChildOperByKey(state, 'friendData', {filterList: action.filterList})
        default:
            return state
    }
}